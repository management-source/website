import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  lightMode?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const heightClass =
    size === 'sm'
      ? 'h-12 sm:h-14 max-w-[260px]'
      : size === 'lg'
      ? 'h-20 sm:h-24 lg:h-28 max-w-[540px]'
      : 'h-16 sm:h-20 lg:h-24 max-w-[340px] sm:max-w-[460px] lg:max-w-[520px]';

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
          width={520}
          height={130}
          priority
          className="h-full w-auto object-contain rounded-lg shadow-sm"
        />
      </div>
    </Link>
  );
}
