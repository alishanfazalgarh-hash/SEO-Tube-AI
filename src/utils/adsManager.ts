/**
 * SEO Tube AI - Ad Management System
 * 
 * Manages user-provided Adsterra scripts cleanly and safely.
 */

export const SMART_LINK_URL = 'https://www.effectivecpmnetwork.com/qvsmbr3cr?key=1ec0d30a097fd4cca5734e9dec15c96b';

/* SocialBar Script */
export function initSocialBarAd() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('social-bar-script')) return;

  try {
    const script = document.createElement('script');
    script.id = 'social-bar-script';
    script.src = 'https://pl30256183.effectivecpmnetwork.com/10/85/2b/10852ba916fc59ab26049fe0bb8b8507.js';
    script.async = true;
    script.onerror = () => {
      console.warn('SocialBar script load prevented or failed.');
    };
    document.body.appendChild(script);
  } catch (err) {
    console.warn('Failed to load SocialBar script:', err);
  }
}

/* Popunder Script */
export function triggerPopunderAd() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('popunder-script')) return;

  try {
    const script = document.createElement('script');
    script.id = 'popunder-script';
    script.src = 'https://pl30256185.effectivecpmnetwork.com/25/7d/24/257d24bb4845d609cea12eeceeade789.js';
    script.async = true;
    script.onerror = () => {
      console.warn('Popunder script load prevented or failed.');
    };
    document.body.appendChild(script);
  } catch (err) {
    console.warn('Failed to load Popunder script:', err);
  }
}

/* Smartlink Trigger */
export function triggerSmartLinkAd(callback?: () => void) {
  if (typeof window !== 'undefined') {
    try {
      window.open(SMART_LINK_URL, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Smartlink redirect error:', e);
    }
  }

  if (callback) {
    callback();
  }
}

/* Native Banner Script */
export function loadNativeBannerAd(containerId: string) {
  if (typeof window === 'undefined') return;
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!container.getAttribute('data-ad-loaded')) {
    container.setAttribute('data-ad-loaded', 'true');

    // Make sure container div exists
    let adDiv = document.getElementById('container-fc3671a3f1e76915032f2f484bfb88f9');
    if (!adDiv) {
      adDiv = document.createElement('div');
      adDiv.id = 'container-fc3671a3f1e76915032f2f484bfb88f9';
      container.appendChild(adDiv);
    }

    if (!document.getElementById('native-banner-script')) {
      const script = document.createElement('script');
      script.id = 'native-banner-script';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl30256182.effectivecpmnetwork.com/fc3671a3f1e76915032f2f484bfb88f9/invoke.js';
      script.onerror = () => {
        console.warn('Native banner script load prevented or failed.');
      };
      container.appendChild(script);
    }
  }
}
