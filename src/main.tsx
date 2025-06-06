import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CampaignProvider } from './contexts/CampaignContext';
import { PaymanProvider } from './contexts/PaymanContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PaymanProvider>
        <CampaignProvider>
          <App />
        </CampaignProvider>
      </PaymanProvider>
    </BrowserRouter>
  </StrictMode>
);