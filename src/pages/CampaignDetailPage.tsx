import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCampaigns } from '../contexts/CampaignContext';
import { Calendar, MapPin, Heart, Share2, ArrowLeft, Clock } from 'lucide-react';
import Modal from '../components/ui/Modal';
import DonationForm from '../components/campaigns/DonationForm';
import { motion } from 'framer-motion';

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCampaign } = useCampaigns();
  const [campaign, setCampaign] = useState(id ? getCampaign(id) : undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundCampaign = getCampaign(id);
      setCampaign(foundCampaign);
      
      // If campaign not found, redirect to explore page
      if (!foundCampaign) {
        navigate('/explore', { replace: true });
      }
    }
  }, [id, getCampaign, navigate]);

  if (!campaign) {
    return null; // Redirect happens in useEffect
  }

  const percentFunded = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  const daysLeft = Math.max(Math.ceil((campaign.endDate - Date.now()) / (1000 * 60 * 60 * 24)), 0);
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard:', error));
    }
  };

  const openDonationModal = () => {
    setIsModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/explore" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all campaigns
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={campaign.imageUrl}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl mb-4"
              >
                {campaign.title}
              </motion.h1>
              
              <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-y-2">
                <div className="flex items-center mr-6">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center mr-6">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Created on {formatDate(campaign.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{daysLeft} days left</span>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg mb-8">{campaign.description}</p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">The Story</h2>
                <div className="prose max-w-none">
                  {campaign.story.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Campaign Organizer</h2>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">
                      {campaign.creator.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{campaign.creator}</h3>
                    <p className="text-gray-600 text-sm">Campaign Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="glass rounded-xl p-6 mb-6">
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-3xl font-bold">${campaign.raised.toLocaleString()}</span>
                    <span className="text-gray-600 ml-2">raised of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{percentFunded}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentFunded}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                  />
                </div>
                
                <div className="flex justify-between text-gray-600 mb-4">
                  <div>
                    <span className="font-bold">{campaign.donations.length}</span> donations
                  </div>
                  <div>
                    <span className="font-bold">{daysLeft}</span> days left
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={openDonationModal}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </button>
                
                <button
                  onClick={handleShareClick}
                  className="btn-secondary w-full flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
            
            {campaign.donations.length > 0 && (
              <div className="glass rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Recent Donations</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {[...campaign.donations]
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, 10)
                    .map((donation) => (
                      <div key={donation.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{donation.donor}</span>
                          <span className="font-bold text-blue-600">${donation.amount}</span>
                        </div>
                        {donation.message && (
                          <p className="text-gray-600 text-sm mt-1 italic">"{donation.message}"</p>
                        )}
                        <p className="text-gray-400 text-xs mt-1">
                          {formatDate(donation.timestamp)}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeDonationModal}>
        <DonationForm
          campaignId={campaign.id}
          campaignTitle={campaign.title}
          onClose={closeDonationModal}
        />
      </Modal>
    </div>
  );
};

export default CampaignDetailPage;