import React from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '../../contexts/CampaignContext';
import CampaignCard from './CampaignCard';
import { motion } from 'framer-motion';

const FeaturedCampaigns: React.FC = () => {
  const { featuredCampaigns } = useCampaigns();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      {featuredCampaigns.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {featuredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </motion.div>
      ) : (
        <div className="glass p-8 rounded-xl text-center">
          <h3 className="mb-4">No campaigns yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to create a campaign and make an impact!
          </p>
          <Link to="/create" className="btn-primary">
            Start a Campaign
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedCampaigns;