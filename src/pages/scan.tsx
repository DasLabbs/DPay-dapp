import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import scanFrame from '@assets/scan-frame.png';
import GalleryButton from '@src/components/scan/gallery-button';
import ScanHeader from '@src/components/scan/scan-header';
import { useQRScanner } from '@src/hooks/use-qr-scanner';

const ScanPage = () => {
  const navigate = useNavigate();
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const videoBackgroundRef = useRef<HTMLVideoElement>(null);

  const handleScanSuccess = (decodedText: string) => {
    console.log('✅ QR Code Data:', decodedText);
    toast.success(`QR Code: ${decodedText}`);
  };

  const handleScanError = (error: string) => {
    toast.error(`${error}`);
  };

  const { startScanning, stopScanning, scanFile } = useQRScanner({
    onScanSuccess: handleScanSuccess,
    onScanError: handleScanError,
  });

  useEffect(() => {
    // Start background blurred camera
    const startBackgroundCamera = async (): Promise<void> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (videoBackgroundRef.current) {
          videoBackgroundRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startBackgroundCamera();

    // Start QR scanner after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      startScanning('qr-reader');
    }, 300);

    return () => {
      clearTimeout(timer);
      stopScanning();
      // Cleanup camera stream
      if (videoBackgroundRef.current?.srcObject) {
        const tracks = (videoBackgroundRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleBack = (): void => {
    stopScanning();
    navigate(-1);
  };

  const toggleFlashlight = async (): Promise<void> => {
    setFlashlightOn(!flashlightOn);

    if (videoBackgroundRef.current?.srcObject) {
      const track = (videoBackgroundRef.current.srcObject as MediaStream).getVideoTracks()[0];
      const capabilities = track.getCapabilities() as any;

      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !flashlightOn }] as any,
          });
        } catch (err) {
          console.error('Error toggling flashlight:', err);
        }
      }
    }
  };

  const handleFileSelect = (file: File) => {
    console.log('📁 Selected file:', file.name);
    scanFile(file);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Camera Video Stream - Blurred Background */}
      <video
        ref={videoBackgroundRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover blur-[40px]"
      />

      {/* Dark Overlay with blur */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.50)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
        }}
      />

      {/* Header */}
      <ScanHeader onBack={handleBack} onToggleFlashlight={toggleFlashlight} flashlightOn={flashlightOn} />

      {/* Center QR Scanner View - Clear Camera Feed */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-[36px]">
          {/* QR Scanner (html5-qrcode will inject video here) */}
          <div id="qr-reader" className="absolute inset-0 z-10 h-full w-full" />

          {/* Scan Frame Overlay */}
          <img
            src={scanFrame}
            alt="scan-frame"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Gallery Button */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-12">
        <GalleryButton onFileSelect={handleFileSelect} />
      </div>
    </div>
  );
};

export default ScanPage;
