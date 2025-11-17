import CheckIcon from '@assets/check.svg?react';
import CopyIcon from '@assets/copy.svg?react';
import { useClipboard } from '@src/hooks/use-clipboard';

type CopyProps = {
  text: string;
};

const CopyButton = (props: CopyProps) => {
  const { copy, copied } = useClipboard({ timeout: 2000 });

  const handleCopy = () => {
    copy(props.text);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex cursor-pointer items-center justify-center transition-all"
      aria-label="Copy to clipboard"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
};

export default CopyButton;
