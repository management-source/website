import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  lightMode?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const heightClass = size === 'sm' ? 'h-9 sm:h-10' : size === 'lg' ? 'h-14 sm:h-16' : 'h-11 sm:h-12';

  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-opacity hover:opacity-95 ${className}`}
      title="Dons Premier Estate Agents - The Knights of Real Estate"
    >
      <div className={`relative ${heightClass} w-auto flex items-center`}>
        <Image
          src="/images/dons-premier-banner.jpg"
          alt="Dons Premier Estate Agents - The Knights of Real Estate"
          width={320}
          height={80}
          priority
          className="h-full w-auto object-contain rounded-md"
        />
      </div>
    </Link>
  );
}
