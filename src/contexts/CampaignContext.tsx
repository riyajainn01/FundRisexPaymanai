import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePayman } from './PaymanContext';
import { Campaign, FilterOptions, SortOption } from '../types';
import { supabase } from '../lib/supabase';

interface CampaignContextType {
  campaigns: Campaign[];
  featuredCampaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'raised' | 'donations'>) => Promise<boolean>;
  getCampaign: (id: string) => Campaign | undefined;
  addDonation: (campaignId: string, amount: number, donor: string, message?: string) => Promise<void>;
  filterCampaigns: (options: FilterOptions) => Campaign[];
  totalRaised: number;
  campaignCount: number;
  donorCount: number;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { createPayee } = usePayman();

  // Load campaigns from Supabase on initial mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching campaigns:', error);
        return;
      }

      if (data) {
        setCampaigns(data.map(campaign => ({
          ...campaign,
          id: campaign.id,
          imageUrl: campaign.image_url,
          createdAt: new Date(campaign.created_at).getTime(),
          endDate: new Date(campaign.end_date).getTime(),
          donations: campaign.donations || []
        })));
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const addCampaign = async (campaign: Omit<Campaign, 'id' | 'createdAt' | 'raised' | 'donations'>) => {
    try {
      // Create payee in PaymanAI
      const payeeCreated = await createPayee(campaign.creator);
      
      if (!payeeCreated) {
        return false;
      }

      const newCampaign = {
        title: campaign.title,
        description: campaign.description,
        story: campaign.story,
        category: campaign.category,
        goal: campaign.goal,
        raised: 0,
        created_at: new Date().toISOString(),
        end_date: new Date(campaign.endDate).toISOString(),
        image_url: campaign.imageUrl,
        creator: campaign.creator,
        location: campaign.location,
        donations: []
      };

      const { data, error } = await supabase
        .from('campaigns')
        .insert([newCampaign])
        .select()
        .single();

      if (error) {
        console.error('Error creating campaign:', error);
        return false;
      }

      if (data) {
        setCampaigns(prevCampaigns => [...prevCampaigns, {
          ...data,
          createdAt: new Date(data.created_at).getTime(),
          endDate: new Date(data.end_date).getTime(),
          donations: data.donations || []
        }]);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error creating campaign:', error);
      return false;
    }
  };

  const getCampaign = (id: string) => {
    return campaigns.find((campaign) => campaign.id === id);
  };

  const addDonation = async (campaignId: string, amount: number, donor: string, message?: string) => {
    try {
      const campaign = campaigns.find(c => c.id === campaignId);
      if (!campaign) return;

      const newDonation = {
        campaign_id: campaignId,
        amount,
        donor,
        message,
        timestamp: new Date().toISOString()
      };

      const { data: donationData, error: donationError } = await supabase
        .from('donations')
        .insert([newDonation])
        .select()
        .single();

      if (donationError) {
        console.error('Error adding donation:', donationError);
        return;
      }

      if (!donationData) {
        console.error('No donation data returned');
        return;
      }

      const { error: updateError } = await supabase
        .from('campaigns')
        .update({ 
          raised: campaign.raised + amount,
          donations: [...campaign.donations, donationData]
        })
        .eq('id', campaignId);

      if (updateError) {
        console.error('Error updating campaign:', updateError);
        return;
      }

      setCampaigns(prevCampaigns =>
        prevCampaigns.map(campaign => {
          if (campaign.id === campaignId) {
            return {
              ...campaign,
              raised: campaign.raised + amount,
              donations: [...campaign.donations, donationData]
            };
          }
          return campaign;
        })
      );
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  const filterCampaigns = (options: FilterOptions) => {
    let filtered = [...campaigns];

    if (options.category && options.category !== 'all') {
      filtered = filtered.filter((campaign) => campaign.category === options.category);
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchLower) ||
          campaign.description.toLowerCase().includes(searchLower) ||
          campaign.creator.toLowerCase().includes(searchLower)
      );
    }

    if (options.sort) {
      switch (options.sort) {
        case 'newest':
          filtered.sort((a, b) => b.createdAt - a.createdAt);
          break;
        case 'mostFunded':
          filtered.sort((a, b) => b.raised - a.raised);
          break;
        case 'endingSoon':
          filtered.sort((a, b) => a.endDate - b.endDate);
          break;
      }
    }

    return filtered;
  };

  const featuredCampaigns = [...campaigns]
    .sort((a, b) => (b.raised / b.goal) - (a.raised / a.goal))
    .slice(0, 4);

  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const campaignCount = campaigns.length;
  
  const donorSet = new Set<string>();
  campaigns.forEach(campaign => {
    campaign.donations.forEach(donation => {
      donorSet.add(donation.donor);
    });
  });
  const donorCount = donorSet.size;

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        featuredCampaigns,
        addCampaign,
        getCampaign,
        addDonation,
        filterCampaigns,
        totalRaised,
        campaignCount,
        donorCount,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};