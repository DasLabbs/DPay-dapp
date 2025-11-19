import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState, Html5QrcodeSupportedFormats } from 'html5-qrcode';

interface UseQRScannerOptions {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
  enableBlurBackground?: boolean;
}

export const useQRScanner = ({ onScanSuccess, onScanError, enableBlurBackground = false }: UseQRScannerOptions) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isTransitioningRef = useRef(false);
  const blurCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startScanning = async (elementId: string, facingMode: 'environment' | 'user' = 'environment') => {
    if (isTransitioningRef.current) {
      console.log('Already transitioning, skipping start');
      return;
    }

    try {
      isTransitioningRef.current = true;

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId, {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        });
      }

      const state = scannerRef.current.getState();
      if (state === Html5QrcodeScannerState.SCANNING) {
        console.log('Already scanning');
        return;
      }

      const config = {
        fps: 10,
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1.0,
      };

      await scannerRef.current.start(
        { facingMode },
        config,
        (decodedText) => {
          console.log('QR Code detected:', decodedText);
          onScanSuccess(decodedText);
          stopScanning();
        },
        () => {
          // Ignore common scanning errors
        }
      );

      setIsScanning(true);

      // Start blur background if enabled
      if (enableBlurBackground) {
        setTimeout(() => startBlurBackground(elementId), 500);
      }
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      onScanError?.(err?.message || 'Failed to start camera');
    } finally {
      isTransitioningRef.current = false;
    }
  };

  const startBlurBackground = (elementId: string) => {
    const qrContainer = document.getElementById(elementId);
    if (!qrContainer) return;

    // Find the video element injected by html5-qrcode
    const video = qrContainer.querySelector('video') as HTMLVideoElement;
    if (!video) return;

    const container = document.getElementById('container-qr');

    // Create blur canvas if not exists
    if (!blurCanvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.id = 'blur-background-canvas';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.objectFit = 'cover';
      canvas.style.filter = 'blur(40px)';
      canvas.style.zIndex = '0';
      container?.appendChild(canvas);
      blurCanvasRef.current = canvas;
    }

    const canvas = blurCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Animation loop to draw video to canvas
    const drawFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      animationFrameRef.current = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  };

  const stopScanning = async () => {
    if (isTransitioningRef.current) {
      console.log('Already transitioning, skipping stop');
      return;
    }

    try {
      isTransitioningRef.current = true;

      // Stop animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Remove blur canvas
      if (blurCanvasRef.current) {
        blurCanvasRef.current.remove();
        blurCanvasRef.current = null;
      }

      if (scannerRef.current) {
        const state = scannerRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING) {
          await scannerRef.current.stop();
          setIsScanning(false);
        }
      }
    } catch (err) {
      console.error('Error stopping scanner:', err);
    } finally {
      isTransitioningRef.current = false;
    }
  };

  const scanFile = async (file: File) => {
    try {
      // Stop camera scan first if running
      if (scannerRef.current) {
        const state = scannerRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING) {
          await stopScanning();
          // Wait a bit for cleanup
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('qr-reader', {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        });
      }

      const decodedText = await scannerRef.current.scanFile(file, true);
      console.log('QR Code from file:', decodedText);
      onScanSuccess(decodedText);

      // Resume camera scan after file scan
      setTimeout(() => {
        startScanning('qr-reader');
      }, 500);
    } catch (err: any) {
      console.error('Error scanning file:', err);
      onScanError?.('No QR code found in image');

      // Resume camera scan even on error
      setTimeout(() => {
        startScanning('qr-reader');
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (blurCanvasRef.current) {
        blurCanvasRef.current.remove();
      }
      if (scannerRef.current) {
        const state = scannerRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING && !isTransitioningRef.current) {
          scannerRef.current.stop().catch(() => {});
        }
      }
    };
  }, []);

  return {
    startScanning,
    stopScanning,
    scanFile,
    isScanning,
  };
};
