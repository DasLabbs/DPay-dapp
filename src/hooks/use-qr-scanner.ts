import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface UseQRScannerOptions {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

export const useQRScanner = ({ onScanSuccess, onScanError }: UseQRScannerOptions) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanning = async (elementId: string) => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId);
      }

      const config = {
        fps: 10,
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1.0,
      };

      await scannerRef.current.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          console.log('QR Code detected:', decodedText);
          onScanSuccess(decodedText);
        },
        (errorMessage) => {
          if (
            !errorMessage.includes('NotFoundException') &&
            !errorMessage.includes('No barcode or QR code detected') &&
            onScanError
          ) {
            onScanError(errorMessage);
          }
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Error starting scanner:', err);
      onScanError?.('Failed to start camera');
    }
  };

  const stopScanning = async () => {
    try {
      if (scannerRef.current && isScanning) {
        await scannerRef.current.stop();
        setIsScanning(false);
      }
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  const scanFile = async (file: File) => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('qr-reader');
      }

      const decodedText = await scannerRef.current.scanFile(file, false);
      console.log('QR Code from file:', decodedText);
      onScanSuccess(decodedText);
    } catch (err) {
      console.error('Error scanning file:', err);
      onScanError?.('Failed to scan QR code from image');
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return {
    startScanning,
    stopScanning,
    scanFile,
    isScanning,
  };
};
