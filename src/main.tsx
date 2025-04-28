import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CalculatorProvider } from './context/CalculatorContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalculatorProvider>
      <App />
    </CalculatorProvider>
  </StrictMode>
);