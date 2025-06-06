import React from 'react';
import { Link } from 'react-router-dom';
import { Campaign } from '../../types';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const { id, title, description, imageUrl, goal, raised, location, endDate } = campaign;
  
  const percentFunded = Math.min(Math.round((raised / goal) * 100), 100);
  const daysLeft = Math.max(Math.ceil((endDate - Date.now()) / (1000 * 60 * 60 * 24)), 0);
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="card h-full flex flex-col"
      variants={item}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link to={`/campaign/${id}`} className="block relative">
        <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium px-3 py-1 shadow-sm">
          {daysLeft > 0 ? `${daysLeft} days left` : 'Campaign ended'}
        </div>
      </Link>
      
      <div className="p-6 flex-grow flex flex-col">
        <h4 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link to={`/campaign/${id}`}>{title}</Link>
        </h4>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="mt-auto">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
              style={{ width: `${percentFunded}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="font-medium">${raised.toLocaleString()}</span>
            <span className="text-gray-500">raised of ${goal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;