import React from 'react';
import { cn } from '@src/libs/utils/cn';

type SecondaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
};

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { children, className, icon, ...restProps } = props;
  return (
    <button
      className={cn(
        `text-text disabled:hover:text-text flex cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[16px] bg-[#E7E4E9] px-4 py-3 text-base font-semibold disabled:cursor-default disabled:bg-[#E7E4E9] disabled:opacity-75`,
        className
      )}
      {...restProps}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default SecondaryButton;
