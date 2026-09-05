import React from 'react';
import Link from 'next/link';

interface LogoProps {
  lightMode?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ lightMode = false, className = '', size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 54 : 44;
  const primaryText = lightMode ? 'text-white' : 'text-knight-900';
  const subText = lightMode ? 'text-gold-300' : 'text-gold-700';

  return (
    <Link href="/" className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}>
      {/* Stylized 'D' embracing the Knight chess piece SVG icon */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-knight-900 via-knight-850 to-knight-700 p-2 shadow-md ring-1 ring-gold-500/30 group-hover:ring-gold-400 transition-all duration-300"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stylized 'D' arch */}
          <path
            d="M 22 15 L 48 15 C 72 15 88 28 88 50 C 88 72 72 85 48 85 L 22 85 Z"
            stroke="url(#goldGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Knight Chess Piece */}
          <path
            d="M 38 75 L 56 75 C 56 75 54 62 48 56 C 45 53 43 47 48 41 C 51 37 50 33 46 31 C 42 29 40 33 37 32 C 34 31 34 26 31 28 C 28 30 29 37 28 42 C 26 48 31 56 34 60 C 37 64 38 75 38 75 Z"
            fill="url(#goldGradient)"
          />
          {/* Knight eye dot */}
          <circle cx="34" cy="35" r="2.5" fill="#0A192F" />
          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E6D1A8" />
              <stop offset="50%" stopColor="#C5A880" />
              <stop offset="100%" stopColor="#9C7942" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif tracking-wider font-bold uppercase leading-none ${primaryText} ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
            }`}>
            Dons Premier
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] tracking-[0.22em] uppercase font-medium text-slate-400">
            Estate Agents
          </span>
          <span className="text-[9px] text-gold-500">•</span>
          <span className={`text-[10px] italic font-serif font-medium tracking-wide ${subText}`}>
            The Knights of Real Estate
          </span>
        </div>
      </div>
    </Link>
  );
}

