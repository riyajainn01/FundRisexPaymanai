import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PaymanClient } from '@paymanai/payman-ts';

interface PaymanContextType {
  isInitialized: boolean;
  isProcessing: boolean;
  processPayment: (amount: number, recipient: string, note?: string) => Promise<boolean>;
  createPayee: (name: string) => Promise<boolean>;
  error: string | null;
}

const PaymanContext = createContext<PaymanContextType | undefined>(undefined);

// Initialize PaymanAI client with credentials
const client = PaymanClient.withCredentials({
  clientId: 'pm-test-odN08e2JtliVVk0YiguX7Bvd',
  clientSecret: 'pLmXldmzPfF63cwdqX8aYL30hQh0z-PEMIM90Ht_gnXXkJ2PX0IHH_cOxhLsQ66x'
});

export const PaymanProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayee = async (name: string): Promise<boolean> => {
    try {
      const response = await client.ask(`Add Test Rails payee  ${name}`);
      console.log('Payee creation response:', response);
      return true;
    } catch (err) {
      console.error('Payee creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create payee');
      return false;
    }
  };

  const processPayment = async (amount: number, recipient: string, note?: string): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Validate input parameters
      if (!amount || amount <= 0) {
        throw new Error('Please provide a valid amount greater than 0');
      }
      
      if (!recipient || recipient.trim() === '') {
        throw new Error('Please provide a valid recipient name');
      }

      // Construct a more detailed prompt for the AI
      const prompt = `Please process a payment with the following details:
        Amount: ${amount} TDS
        Recipient: ${recipient}
        ${note ? `Note: ${note}` : ''}
        
        Please verify:
        1. The recipient exists in our system
        2. The amount is valid
        3. The payment can be processed from the default wallet
        
        If any of these checks fail, please provide specific guidance on what needs to be corrected.`;

      const response = await client.ask(prompt);
      console.log('Payment verification response:', response);
      
      // Convert response to string and check for issues
      const responseText = response.toString();
      if (responseText.toLowerCase().includes('need more information') || 
          responseText.toLowerCase().includes('cannot process') ||
          responseText.toLowerCase().includes('please provide')) {
        throw new Error(responseText);
      }
      
      setIsProcessing(false);
      return true;
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment');
      setIsProcessing(false);
      return false;
    }
  };

  return (
    <PaymanContext.Provider
      value={{
        isInitialized,
        isProcessing,
        processPayment,
        createPayee,
        error
      }}
    >
      {children}
    </PaymanContext.Provider>
  );
};

export const usePayman = () => {
  const context = useContext(PaymanContext);
  if (context === undefined) {
    throw new Error('usePayman must be used within a PaymanProvider');
  }
  return context;
};