import React from 'react';
import { useCampaigns } from '../../contexts/CampaignContext';
import { HeartHandshake, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const CampaignStats: React.FC = () => {
  const { totalRaised, campaignCount, donorCount } = useCampaigns();

  const stats = [
    {
      icon: <HeartHandshake className="w-8 h-8 text-blue-600" />,
      value: `$${totalRaised.toLocaleString()}`,
      label: 'Total Raised',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      value: campaignCount,
      label: 'Active Campaigns',
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      value: donorCount,
      label: 'Generous Donors',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="w-full md:w-1/3 px-4 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass h-full p-8 rounded-xl text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {stat.icon}
                </div>
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    delay: 0.3 + index * 0.1 
                  }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignStats;