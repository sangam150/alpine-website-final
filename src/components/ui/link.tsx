import React from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ 
  href, 
  children, 
  className, 
  target, 
  rel, 
  onClick,
  ...props 
}) => {
  return (
    <NextLink 
      href={href} 
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
      {...props}
    >
      {children}
    </NextLink>
  );
}; 