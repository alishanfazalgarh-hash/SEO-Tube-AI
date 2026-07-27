import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Global listener to catch and suppress third-party script errors (e.g. ad networks)
if (typeof window !== 'undefined') {
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    if (
      msg === 'Script error.' ||
      (typeof msg === 'string' && msg.includes('Script error')) ||
      url?.includes('effectivecpmnetwork') ||
      url?.includes('highperformanceformat')
    ) {
      // Suppress cross-origin script errors gracefully
      return true;
    }
    return false;
  };

  window.addEventListener(
    'error',
    (event) => {
      if (
        event.message === 'Script error.' ||
        event.filename?.includes('effectivecpmnetwork') ||
        event.filename?.includes('highperformanceformat')
      ) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    },
    true
  );

  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason?.message === 'Script error.' ||
      String(event.reason).includes('Script error')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>
);
