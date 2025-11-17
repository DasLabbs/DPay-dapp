interface ScanHeaderProps {
  onBack: () => void;
  onToggleFlashlight: () => void;
  flashlightOn: boolean;
}

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

const ScanHeader = ({ onBack, onToggleFlashlight, flashlightOn }: ScanHeaderProps) => {
  return (
    <div className="absolute left-0 right-0 top-0 z-20 flex h-14 items-center justify-between px-4">
      <button
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
      >
        <BackIcon />
      </button>
      <h1 className="text-lg font-semibold text-white">Scan QR</h1>
      <button
        onClick={onToggleFlashlight}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
          flashlightOn ? 'bg-white/20 text-yellow-300' : 'text-white hover:bg-white/10'
        }`}
      >
        <FlashlightIcon />
      </button>
    </div>
  );
};

export default ScanHeader;
