import { useEffect, useState } from 'react';
import CloseIcon from '@assets/shared/close.svg?react';

import Button from '../shared/button';
import { Drawer, DrawerContent } from '../shared/drawer';
import Logo from '../shared/logo';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWAPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    setIsIOS(isIOSDevice);

    // Check if already installed
    const isInstalled =
      window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    // Check if user already dismissed
    const isDismissed = localStorage.getItem('pwa-install-dismissed') === 'true';

    if (isInstalled || isDismissed) {
      return;
    }

    if (isIOSDevice) {
      // For iOS, show popup after delay if not installed
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    } else {
      // For Android/Desktop, listen for beforeinstallprompt event
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setTimeout(() => {
          setShowPopup(true);
        }, 3000);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPopup(false);
  };

  const handleDismiss = () => {
    setShowPopup(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  // Don't render if not iOS and no prompt available
  if (!isIOS && !deferredPrompt) {
    return null;
  }

  return (
    <Drawer open={showPopup} onOpenChange={handleClose} container={document.getElementById('container')}>
      <DrawerContent className="absolute w-full bg-white">
        <div className="flex flex-col gap-6 px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1B1B1D]">Install DPay App</h2>
            <div onClick={handleClose} className="cursor-pointer rounded-full p-1 hover:bg-gray-100">
              <CloseIcon />
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-primary flex h-24 w-24 items-center justify-center rounded-xl text-white">
              <Logo height={20} />
            </div>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-sm text-[#7A7B83]">
              Add DPay to your home screen for quick and easy access when you're on the go.
            </p>
          </div>

          {isIOS ? (
            // iOS Instructions
            <div className="flex flex-col gap-4 rounded-2xl bg-[#F5F5F7] p-4">
              <div className="text-center text-sm font-semibold text-[#1B1B1D]">How to Install on iOS</div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7084FF] text-xs font-bold text-white">
                  1
                </div>
                <div className="flex-1 text-sm text-[#1B1B1D]">
                  Tap the <span className="font-semibold">Share</span> button{' '}
                  <svg className="inline h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z" />
                  </svg>{' '}
                  at the bottom of your browser
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7084FF] text-xs font-bold text-white">
                  2
                </div>
                <div className="flex-1 text-sm text-[#1B1B1D]">
                  Scroll down and tap <span className="font-semibold">"Add to Home Screen"</span>
                  <svg className="ml-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7084FF] text-xs font-bold text-white">
                  3
                </div>
                <div className="flex-1 text-sm text-[#1B1B1D]">
                  Tap <span className="font-semibold">"Add"</span> to confirm
                </div>
              </div>
            </div>
          ) : (
            // Android/Desktop - Auto install
            <div className="flex flex-col gap-3">
              <Button onClick={handleInstall} className="w-full">
                Install Now
              </Button>
            </div>
          )}

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="text-sm font-medium text-[#7A7B83] transition-colors hover:text-[#1B1B1D]"
          >
            Not now
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InstallPWAPopup;
