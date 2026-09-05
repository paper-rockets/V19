import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { registerPWA } from './registerServiceWorker';
import { getQualityProfile } from './utils/deviceProfile';
import './index.css';

// Standalone Nav Tool Sandbox route check
const isSandbox =
  typeof window !== 'undefined' &&
  (window.location.pathname.includes('sandbox') ||
    new URLSearchParams(window.location.search).has('sandbox') ||
    window.location.port === '8000');

const StandaloneNavSandbox = lazy(() =>
  import('./components/Sandbox/StandaloneNavSandbox').then((m) => ({ default: m.StandaloneNavSandbox }))
);

// Resolve the adaptive quality profile before the first render so the low-power
// UI rules are already in place when the initial paint happens.
const profile = getQualityProfile();
if (profile.isLowPower) {
  document.documentElement.classList.add('low-power-ui');
}
console.info(
  `[perf] tier=${profile.tier} dpr<=${profile.maxPixelRatio} shadows=${profile.shadows} post=${profile.postProcessing} - ${profile.reason}`
);

// Initialize Progressive Web App registration only for the main app
if (!isSandbox) {
  registerPWA();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isSandbox ? (
      <Suspense fallback={null}>
        <StandaloneNavSandbox />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
