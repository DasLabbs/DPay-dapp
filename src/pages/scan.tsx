import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import scanFrame from '@assets/scan-frame.png';
import GalleryButton from '@src/components/scan/gallery-button';
import ScanHeader from '@src/components/scan/scan-header';
import { useQRScanner } from '@src/hooks/use-qr-scanner';
import { Html5Qrcode } from 'html5-qrcode';

const ScanPage = () => {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flashlightOn] = useState(false);

  const handleScanSuccess = (decodedText: string) => {
    console.log('✅ QR Code Data:', decodedText);
    toast.success(`QR Code: ${decodedText}`);
  };

  const handleScanError = (error: string) => {
    toast.error(error);
  };

  const { startScanning, stopScanning, scanFile } = useQRScanner({
    onScanSuccess: handleScanSuccess,
    onScanError: handleScanError,
    enableBlurBackground: true,
  });

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setHasPermission(devices.length > 0);
        if (devices.length > 0) {
          startScanning('qr-reader');
        }
      })
      .catch(() => {
        setHasPermission(false);
      });

    return () => {
      stopScanning();
    };
  }, []);

  const handleBack = () => {
    stopScanning();
    navigate(-1);
  };

  const toggleFlashlight = async () => {
    toast.error('Flashlight not available');
  };

  const handleFileSelect = async (file: File) => {
    await scanFile(file);
  };

  if (hasPermission === false) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center">
        <div>
          <h2 className="mb-2 text-xl font-bold">Camera Permission Required</h2>
          <p className="text-gray-600">Please allow camera access to scan QR codes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Header */}
      <div className="relative z-30">
        <ScanHeader onBack={handleBack} onToggleFlashlight={toggleFlashlight} flashlightOn={flashlightOn} />
      </div>

      <div id="container-qr" className="absolute inset-0 h-full w-full"></div>

      {/* Center QR Scanner View */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-[36px]">
          <div id="qr-reader" className="absolute inset-0 z-10 h-full w-full" />

          <img
            src={scanFrame}
            alt="scan-frame"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
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
