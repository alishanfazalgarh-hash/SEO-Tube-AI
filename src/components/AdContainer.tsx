import React, { useEffect } from 'react';
import {
  initSocialBarAd,
  triggerPopunderAd,
  loadNativeBannerAd,
  SMART_LINK_URL,
} from '../utils/adsManager';

interface AdContainerProps {
  id: string;
  type: '320x50-top' | '320x50-mobile' | '300x250' | 'native' | 'social-bar' | 'popunder' | 'smart-link';
  className?: string;
  label?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({ id, type, className = '' }) => {
  useEffect(() => {
    if (type === 'social-bar') {
      initSocialBarAd();
    } else if (type === 'popunder') {
      triggerPopunderAd();
    } else if (type === 'native') {
      loadNativeBannerAd(id);
    }
  }, [id, type]);

  // 1. Social Bar Ad (Handled by script automatically)
  if (type === 'social-bar') {
    return <div id={id} className="hidden" />;
  }

  // 2. Popunder Slot (Handled by script automatically)
  if (type === 'popunder') {
    return <div id={id} className="hidden" />;
  }

  // 3. Smart Link Slot
  if (type === 'smart-link') {
    return (
      <a
        id={id}
        href={SMART_LINK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden ${className}`}
      />
    );
  }

  // 4. 320x50 Banner (Top or Mobile)
  if (type === '320x50-top' || type === '320x50-mobile') {
    const isTop = type === '320x50-top';
    const iframeCode = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }
        </style>
        <script>
          window.onerror = function() { return true; };
        </script>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'c19760aab33eb8918b595746d1323c64',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/c19760aab33eb8918b595746d1323c64/invoke.js"></script>
      </body>
      </html>
    `;

    return (
      <div
        id={id}
        className={`mx-auto my-3 flex items-center justify-center ${
          isTop ? 'w-full max-w-4xl' : 'w-full max-w-[320px]'
        } ${className}`}
      >
        <div className="w-[320px] h-[50px] overflow-hidden flex items-center justify-center">
          <iframe
            srcDoc={iframeCode}
            width="320"
            height="50"
            style={{ border: 0, overflow: 'hidden' }}
            title="Adsterra 320x50 Banner"
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  // 5. 300x250 Medium Rectangle Banner
  if (type === '300x250') {
    const iframeCode300 = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }
        </style>
        <script>
          window.onerror = function() { return true; };
        </script>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '5f88e8ed5666338bccaa62555b2766a9',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/5f88e8ed5666338bccaa62555b2766a9/invoke.js"></script>
      </body>
      </html>
    `;

    return (
      <div
        id={id}
        className={`mx-auto my-6 w-full max-w-[300px] flex items-center justify-center ${className}`}
      >
        <div className="w-[300px] h-[250px] overflow-hidden flex items-center justify-center">
          <iframe
            srcDoc={iframeCode300}
            width="300"
            height="250"
            style={{ border: 0, overflow: 'hidden' }}
            title="Adsterra 300x250 Banner"
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  // 6. Native Banner Ad Card
  if (type === 'native') {
    return (
      <div
        id={id}
        className={`mx-auto my-6 w-full max-w-4xl flex justify-center items-center ${className}`}
      >
        {/* Adsterra Native Container */}
        <div id="container-fc3671a3f1e76915032f2f484bfb88f9" className="w-full min-h-[100px]" />
      </div>
    );
  }

  return null;
};
