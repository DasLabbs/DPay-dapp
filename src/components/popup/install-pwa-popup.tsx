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

  useEffect(() => {
    const isInstalled =
      window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    // Check if user already dismissed
    const isDismissed = localStorage.getItem('pwa-install-dismissed') === 'true';

    if (isInstalled || isDismissed) {
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show popup after a delay
      setTimeout(() => {
        setShowPopup(true);
      }, 3000); // Show after 3 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
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

  //   Don't render if no prompt available
  if (!deferredPrompt) {
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

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button onClick={handleInstall} className="w-full">
              Install Now
            </Button>
            <button
              onClick={handleDismiss}
              className="text-sm font-medium text-[#7A7B83] transition-colors hover:text-[#1B1B1D]"
            >
              Not now
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InstallPWAPopup;
