import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface titleProps {
  className?: string;
  size?: TitleSize;
  text: string;
}
export const Title: React.FC<titleProps> = ({
  className,
  size = 'sm',
  text,
}) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  };

  const mapClassNameBySize = {
    xs: 'text-[16px]',
    sm: 'text-[22px] ',
    md: 'text-[26px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    {
      className: clsx(mapClassNameBySize[size], className),
    },
    text
  );
};
