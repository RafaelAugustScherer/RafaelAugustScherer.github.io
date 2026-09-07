import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ColdBoot from './ColdBoot';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<ColdBoot />}>
      <App />
    </Suspense>
  </StrictMode>
);
