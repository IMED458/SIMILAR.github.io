import React from 'react';
import { cn } from '../lib/utils';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className, imageClassName }) => {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src="./logo-similr.png"
        alt="similR"
        className={cn('h-8 w-auto', imageClassName)}
      />
    </span>
  );
};
