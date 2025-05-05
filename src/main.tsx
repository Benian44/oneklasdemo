import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


// Set page title
document.title = 'OneKlas - Plateforme Éducative';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);