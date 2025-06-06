import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '../contexts/CampaignContext';
import { CampaignFormData } from '../types';
import { Calendar, Image, Upload, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateCampaignPage: React.FC = () => {
  const { addCampaign } = useCampaigns();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    story: '',
    category: '',
    goal: 0,
    endDate: '',
    imageUrl: '',
    creator: '',
    location: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CampaignFormData, string>>>({});

  // Categories from the Categories component
  const categories = [
    { id: 'medical', name: 'Medical' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' },
    { id: 'community', name: 'Community' },
    { id: 'animals', name: 'Animals' },
    { id: 'food', name: 'Food & Hunger' },
    { id: 'emergency', name: 'Emergency Relief' },
    { id: 'nonprofit', name: 'Nonprofit' },
  ];

  // Sample images for convenience
  const sampleImages = [
    'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Special handling for goal input
    if (name === 'goal') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFormData({ ...formData, [name]: numValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field if it exists
    if (errors[name as keyof CampaignFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const selectSampleImage = (url: string) => {
    setFormData({ ...formData, imageUrl: url });
    if (errors.imageUrl) {
      setErrors({ ...errors, imageUrl: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CampaignFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.story.trim()) {
      newErrors.story = 'Story is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.goal <= 0) {
      newErrors.goal = 'Goal must be greater than zero';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else {
      const endDate = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (endDate < today) {
        newErrors.endDate = 'End date cannot be in the past';
      }
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    if (!formData.creator.trim()) {
      newErrors.creator = 'Creator name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert end date to timestamp
      const endDateTimestamp = new Date(formData.endDate).getTime();
      
      addCampaign({
        ...formData,
        endDate: endDateTimestamp,
      });
      
      navigate('/explore');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-4">Create a Campaign</h1>
          <p className="text-gray-600">
            Share your story and start raising funds for your cause.
            Be clear, compelling, and honest to inspire potential donors.
          </p>
        </div>
        
        <motion.form 
          onSubmit={handleSubmit}
          className="glass p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 mb-2 font-medium">
                    Campaign Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`input ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="E.g., Help Fund Clean Water Project"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-gray-700 mb-2 font-medium">
                    Short Description*
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`input ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="A brief summary of your campaign (max 100 characters)"
                    maxLength={100}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="story" className="block text-gray-700 mb-2 font-medium">
                    Campaign Story*
                  </label>
                  <textarea
                    id="story"
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    className={`input min-h-[200px] ${errors.story ? 'border-red-500' : ''}`}
                    placeholder="Share your story in detail. What is your campaign for? Why is it important? How will the funds be used?"
                  />
                  {errors.story && (
                    <p className="text-red-500 text-sm mt-1">{errors.story}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Campaign Details */}
            <div>
              <h2 className="text-xl font-bold mb-4">Campaign Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`input ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="goal" className="block text-gray-700 mb-2 font-medium">
                    Funding Goal ($)*
                  </label>
                  <input
                    type="number"
                    id="goal"
                    name="goal"
                    value={formData.goal || ''}
                    onChange={handleInputChange}
                    className={`input ${errors.goal ? 'border-red-500' : ''}`}
                    placeholder="E.g., 5000"
                    min="1"
                    step="1"
                  />
                  {errors.goal && (
                    <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-gray-700 mb-2 font-medium">
                    End Date*
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className={`input pl-10 ${errors.endDate ? 'border-red-500' : ''}`}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-gray-700 mb-2 font-medium">
                    Location*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`input ${errors.location ? 'border-red-500' : ''}`}
                    placeholder="E.g., New York, Global, etc."
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Image Upload */}
            <div>
              <h2 className="text-xl font-bold mb-4">Campaign Image</h2>
              
              <div>
                <label htmlFor="imageUrl" className="block text-gray-700 mb-2 font-medium">
                  Image URL*
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className={`input pl-10 ${errors.imageUrl ? 'border-red-500' : ''}`}
                    placeholder="Enter image URL"
                  />
                </div>
                {errors.imageUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
                )}
                
                <div className="mt-4">
                  <p className="text-gray-700 font-medium mb-2">Or select a sample image:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sampleImages.map((url, index) => (
                      <div
                        key={index}
                        className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${
                          formData.imageUrl === url ? 'border-blue-600' : 'border-transparent'
                        }`}
                        onClick={() => selectSampleImage(url)}
                      >
                        <img
                          src={url}
                          alt={`Sample ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Creator Information */}
            <div>
              <h2 className="text-xl font-bold mb-4">Creator Information</h2>
              
              <div>
                <label htmlFor="creator" className="block text-gray-700 mb-2 font-medium">
                 Payee Name / Organization*
                </label>
                <input
                  type="text"
                  id="creator"
                  name="creator"
                  value={formData.creator}
                  onChange={handleInputChange}
                  className={`input ${errors.creator ? 'border-red-500' : ''}`}
                  placeholder="Your name or organization name"
                />
                {errors.creator && (
                  <p className="text-red-500 text-sm mt-1">{errors.creator}</p>
                )}
              </div>
            </div>
            
            {/* Submit */}
            <div className="pt-4">
              <div className="flex items-start p-4 rounded-lg bg-blue-50 border border-blue-100 mb-6">
                <Info className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-medium">Important Note</p>
                  <p className="text-blue-700 text-sm">
                    By creating this campaign, you confirm that all information provided is accurate and that you have the
                    authority to raise funds for this cause. Campaigns are subject to review.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateCampaignPage;