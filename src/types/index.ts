export interface Campaign {
  id: string;
  title: string;
  description: string;
  story: string;
  category: string;
  goal: number;
  raised: number;
  createdAt: number;
  endDate: number;
  imageUrl: string;
  creator: string;
  location: string;
  donations: Donation[];
}

export interface Donation {
  id: string;
  campaign_id: string;
  amount: number;
  donor: string;
  message?: string;
  timestamp: string;
}

export interface DonationFormData {
  amount: number;
  name: string;
  message: string;
}

export interface CampaignFormData {
  title: string;
  description: string;
  story: string;
  category: string;
  goal: number;
  endDate: string;
  imageUrl: string;
  creator: string;
  location: string;
}

export type SortOption = 'newest' | 'mostFunded' | 'endingSoon';

export interface FilterOptions {
  category?: string;
  search?: string;
  sort?: SortOption;
}