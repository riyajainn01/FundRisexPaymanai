import React, { useState } from 'react';
import { usePayman } from '../../contexts/PaymanContext';
import { useCampaigns } from '../../contexts/CampaignContext';
import { DonationFormData } from '../../types';
import { Heart, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DonationFormProps {
  campaignId: string;
  campaignTitle: string;
  onClose?: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ campaignId, campaignTitle, onClose }) => {
  const { processPayment, isProcessing, error } = usePayman();
  const { addDonation } = useCampaigns();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<DonationFormData>({
    amount: 50,
    name: '',
    message: '',
  });
  const [donationSuccess, setDonationSuccess] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100, 250];

  const handleAmountSelect = (amount: number) => {
    setFormData({ ...formData, amount });
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setFormData({ ...formData, amount: value });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (step === 1 && formData.amount > 0) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim() === '') {
      return;
    }

    setStep(3);
    
    // Process payment via PaymanAI
    const success = await processPayment(
      formData.amount,
      campaignTitle,
      formData.message || undefined
    );

    if (success) {
      // Add donation to campaign
      addDonation(
        campaignId,
        formData.amount,
        formData.name,
        formData.message || undefined
      );
      setDonationSuccess(true);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="glass p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center">Support this campaign</h3>
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select amount</label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-2 rounded-lg border transition-colors ${
                      formData.amount === amount
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
                <div className="col-span-3 mt-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={handleCustomAmount}
                      className="input pl-8"
                      placeholder="Other amount"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                disabled={formData.amount <= 0}
                className="btn-primary flex items-center"
              >
                Next step
              </button>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.form
            key="step2"
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="input resize-none"
                rows={3}
                placeholder="Add a message of support..."
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary"
              >
                Back
              </button>
              
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={formData.name.trim() === ''}
              >
                Donate ${formData.amount}
              </button>
            </div>
          </motion.form>
        )}
        
        {step === 3 && (
          <motion.div
            key="step3"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center py-4"
          >
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <Loader className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
                <p className="text-gray-600">Processing your donation...</p>
              </div>
            ) : donationSuccess ? (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">Thank you!</h4>
                <p className="text-gray-600 mb-6">
                  Your donation of ${formData.amount} to {campaignTitle} has been processed successfully.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-red-600 text-3xl">×</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Something went wrong</h4>
                <p className="text-red-600 mb-6">
                  {error || 'Unable to process your donation. Please try again.'}
                </p>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationForm;