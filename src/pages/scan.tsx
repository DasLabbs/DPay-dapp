import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FlashlightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
    <path
      d="M14.9999 15L10.6669 20.654C10.1279 21.356 9.11887 20.919 9.11887 19.983V13.03C9.11887 12.47 8.72287 12.015 8.23487 12.015H4.88487C4.12487 12.015 3.71987 10.985 4.22187 10.329L6.77387 7M8.99987 4.72701L11.4969 1.35C12.0219 0.640005 13.0069 1.082 13.0069 2.028V9.059C13.0069 9.626 13.3929 10.085 13.8689 10.085H17.1359C17.8779 10.085 18.2739 11.127 17.7829 11.79L16.8879 13"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M1 1L21 21" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

const GalleryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.353 2.00043C19.7299 2.00043 21.9994 4.36229 21.9995 7.88812V16.102C21.9995 16.253 21.9724 16.3886 21.9644 16.5346C21.9594 16.6195 21.9606 16.7046 21.9536 16.7895C21.9496 16.8275 21.9381 16.8628 21.9341 16.9008C21.9011 17.2145 21.8507 17.5144 21.7798 17.8051C21.7618 17.8831 21.7402 17.9586 21.7192 18.0346C21.6393 18.3165 21.5451 18.5853 21.4321 18.8422C21.3992 18.9141 21.3636 18.9832 21.3296 19.0541C21.2076 19.2991 21.0754 19.5344 20.9224 19.7524C20.8754 19.8194 20.8239 19.8798 20.7749 19.9448C20.6159 20.1508 20.4492 20.3478 20.2612 20.5268C20.2003 20.5847 20.1318 20.635 20.0679 20.6899C19.8749 20.8559 19.6774 21.0148 19.4604 21.1508C19.3825 21.1997 19.2962 21.2358 19.2163 21.2797C18.9954 21.4016 18.7726 21.5208 18.5298 21.6127C18.4298 21.6507 18.3184 21.6706 18.2144 21.7036C17.9755 21.7775 17.7397 21.8549 17.4829 21.8989C17.2889 21.9329 17.0775 21.9366 16.8735 21.9536C16.6995 21.9666 16.534 22.0004 16.353 22.0004H7.63721C7.26132 22.0004 6.90208 21.9627 6.55518 21.9057C6.54229 21.9037 6.52998 21.9018 6.51807 21.8998C5.16529 21.6668 4.0423 21.0136 3.25537 20.0287C3.24652 20.0286 3.24671 20.0182 3.23779 20.0092C2.44679 19.0132 1.99951 17.674 1.99951 16.102V7.88812C1.99964 4.3624 4.27047 2.00057 7.63721 2.00043H16.353ZM7.63721 3.39496C5.06048 3.3951 3.39612 5.1624 3.396 7.88812V16.102C3.396 16.8669 3.53782 17.5501 3.78076 18.1411C3.82155 18.0921 5.72942 15.7659 5.75732 15.7348C6.44931 14.9448 7.74866 13.766 9.45361 14.4789C9.86346 14.6489 10.2233 14.8881 10.5532 15.0981C11.1262 15.4811 11.464 15.6613 11.814 15.6313C11.9586 15.6113 12.0944 15.5685 12.2231 15.4887C12.7811 15.1447 14.3586 12.8442 14.4536 12.7192C15.5436 11.2994 17.2236 10.9193 18.6235 11.7592C18.8115 11.8712 20.159 12.8129 20.605 13.1909V7.88812C20.6049 5.1623 18.9389 3.39496 16.353 3.39496H7.63721ZM8.479 6.00043C9.1766 6.00049 9.80876 6.29316 10.2612 6.76117C10.7156 7.21281 11.0005 7.83571 11.0005 8.51508C11.0004 9.86985 9.86659 11.0002 8.50537 11.0004C7.30867 11.0004 6.28776 10.1256 6.05908 8.99359C6.0213 8.82377 6.00049 8.64863 6.00049 8.4682C6.00074 7.10381 7.109 6.00043 8.479 6.00043Z"
      fill="white"
    />
  </svg>
);

const ScanPage = () => {
  const navigate = useNavigate();
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const videoBackgroundRef = useRef<HTMLVideoElement>(null);
  const videoCenterRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Request camera access
    const startCamera = async (): Promise<void> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        // Gán stream cho cả 2 video elements
        if (videoBackgroundRef.current) {
          videoBackgroundRef.current.srcObject = stream;
        }
        if (videoCenterRef.current) {
          videoCenterRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      // Cleanup camera stream
      if (videoBackgroundRef.current && videoBackgroundRef.current.srcObject) {
        const tracks = (videoBackgroundRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleBack = (): void => {
    navigate(-1);
  };

  const toggleFlashlight = async (): Promise<void> => {
    setFlashlightOn(!flashlightOn);

    if (videoBackgroundRef.current && videoBackgroundRef.current.srcObject) {
      const track = (videoBackgroundRef.current.srcObject as MediaStream).getVideoTracks()[0];
      // eslint-disable-next-line no-undef
      const capabilities = track.getCapabilities() as MediaTrackCapabilities & { torch?: boolean };

      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            // @ts-ignore - torch is not in the standard TypeScript types yet
            advanced: [{ torch: !flashlightOn }],
          });
        } catch (err) {
          console.error('Error toggling flashlight:', err);
        }
      }
    }
  };

  const handleGallerySelect = (): void => {
    console.log('Open gallery');
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
      <div className="absolute left-0 right-0 top-11 z-20 flex h-14 items-center justify-between px-4">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        >
          <BackIcon />
        </button>
        <h1 className="text-lg font-semibold text-white">Scan QR</h1>
        <button
          onClick={toggleFlashlight}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            flashlightOn ? 'bg-white/20 text-yellow-300' : 'text-white hover:bg-white/10'
          }`}
        >
          <FlashlightIcon />
        </button>
      </div>

      {/* Center Camera View - Clear/Unblurred */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-3xl">
          {/* Clear Camera Feed in Center */}
          <video
            ref={videoCenterRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Corner brackets */}
          <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-4 border-t-4 border-white"></div>
          <div className="absolute right-0 top-0 h-16 w-16 rounded-tr-2xl border-r-4 border-t-4 border-white"></div>
          <div className="absolute bottom-0 left-0 h-16 w-16 rounded-bl-2xl border-b-4 border-l-4 border-white"></div>
          <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-4 border-r-4 border-white"></div>

          {/* Animated scanning line */}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-12">
        <button
          onClick={handleGallerySelect}
          className="flex w-full items-center justify-center gap-3 px-6 py-4 font-medium text-white"
        >
          <GalleryIcon />
          <span>Choose from Gallery</span>
        </button>
      </div>
    </div>
  );
};

export default ScanPage;
