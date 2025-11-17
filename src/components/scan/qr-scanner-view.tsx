import { useEffect, useRef } from 'react';

interface QRScannerViewProps {
  onMount: (elementId: string) => void;
}

const QRScannerView = ({ onMount }: QRScannerViewProps) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      onMount('qr-reader');
    }
  }, [onMount]);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div id="qr-reader" className="relative h-[280px] w-[280px] overflow-hidden rounded-[36px]" />
    </div>
  );
};

export default QRScannerView;
