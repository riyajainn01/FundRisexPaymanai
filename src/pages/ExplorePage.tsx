import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useCampaigns } from '../contexts/CampaignContext';
import CampaignCard from '../components/campaigns/CampaignCard';
import { Campaign, FilterOptions, SortOption } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const ExplorePage: React.FC = () => {
  const location = useLocation();
  const { campaigns, filterCampaigns } = useCampaigns();
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: '',
    search: '',
    sort: 'newest',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Categories from the Categories component
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'medical', name: 'Medical' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' },
    { id: 'community', name: 'Community' },
    { id: 'animals', name: 'Animals' },
    { id: 'food', name: 'Food & Hunger' },
    { id: 'emergency', name: 'Emergency Relief' },
    { id: 'nonprofit', name: 'Nonprofit' },
  ];

  // Sort options
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'mostFunded', label: 'Most Funded' },
    { value: 'endingSoon', label: 'Ending Soon' },
  ];

  // Parse URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';
    const sortParam = (searchParams.get('sort') as SortOption) || 'newest';

    setFilterOptions({
      category: categoryParam,
      search: searchParam,
      sort: sortParam,
    });
  }, [location]);

  // Apply filters
  useEffect(() => {
    const filtered = filterCampaigns(filterOptions);
    setFilteredCampaigns(filtered);
  }, [filterOptions, campaigns, filterCampaigns]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filterOptions, search: e.target.value });
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilterOptions({
      ...filterOptions,
      category: categoryId === 'all' ? '' : categoryId,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions({
      ...filterOptions,
      sort: e.target.value as SortOption,
    });
  };

  const clearFilters = () => {
    setFilterOptions({
      category: '',
      search: '',
      sort: 'newest',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4">Discover Campaigns</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our diverse range of campaigns and find causes that resonate with your values.
          Every contribution makes a difference.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filterOptions.search}
              onChange={handleSearchChange}
              placeholder="Search campaigns..."
              className="input pl-10"
            />
          </div>
          
          <div className="flex space-x-4">
            <select
              value={filterOptions.sort}
              onChange={handleSortChange}
              className="input px-4 py-3"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-white text-gray-700 border border-gray-200 rounded-lg px-4 py-3 flex items-center hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Category Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 glass p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Categories</h3>
                  {(filterOptions.category || filterOptions.search) && (
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 flex items-center text-sm hover:text-blue-800"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear filters
                    </button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        (category.id === 'all' && !filterOptions.category) ||
                        filterOptions.category === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Results */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2>
            {filteredCampaigns.length} {filteredCampaigns.length === 1 ? 'Campaign' : 'Campaigns'}
          </h2>
        </div>
        
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="glass p-12 rounded-xl text-center">
            <h3 className="mb-4">No campaigns found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms to find campaigns.
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;