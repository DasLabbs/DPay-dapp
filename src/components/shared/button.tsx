import React from 'react';
import { cn } from '@src/libs/utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  const { children, className, icon, ...restProps } = props;
  return (
    <button
      className={cn(
        `flex cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[16px] bg-[#1712FF] px-4 py-3 text-base font-semibold text-white disabled:cursor-default disabled:bg-[#1712FF] disabled:opacity-75 disabled:hover:text-white`,
        className
      )}
      {...restProps}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
