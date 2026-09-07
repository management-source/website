'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Home,
  Key,
  TrendingUp,
  FileCheck,
  Users,
  Building,
  Wrench,
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [salesDropdown, setSalesDropdown] = useState(false);
  const [rentalsDropdown, setRentalsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setSalesDropdown(false);
    setRentalsDropdown(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'bg-knight-900/95 backdrop-blur-md shadow-xl border-b border-knight-800'
          : 'bg-knight-900 border-b border-knight-800'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5.5rem] sm:min-h-[6.5rem] py-2">
          {/* Logo */}
          <Logo lightMode={true} size="md" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/' ? 'text-gold-400 bg-knight-800/80' : 'text-slate-200 hover:text-white hover:bg-knight-800/50'
              }`}
            >
              Home
            </Link>

            {/* Sales Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSalesDropdown(true)}
              onMouseLeave={() => setSalesDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith('/properties') && !pathname.includes('status=for_rent')
                    ? 'text-gold-400 bg-knight-800/80'
                    : 'text-slate-200 hover:text-white hover:bg-knight-800/50'
                }`}
              >
                <span>Sales</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {salesDropdown && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-2xl z-50">
                  <div className="bg-knight-850 rounded-xl ring-1 ring-gold-500/20 shadow-2xl p-2 border border-knight-700">
                    <Link
                      href="/properties?status=for_sale&type=Residential"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <Home className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Residential for sale</span>
                    </Link>
                    <Link
                      href="/properties?status=for_sale&type=Land"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <Building className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Land for Sale</span>
                    </Link>
                    <Link
                      href="/properties?status=for_sale&type=Commercial"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <Building className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Commercial For Sale</span>
                    </Link>
                    <Link
                      href="/properties?status=sold"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <TrendingUp className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Recently sold</span>
                    </Link>
                    <Link
                      href="/properties?inspections=true"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <FileCheck className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Upcoming Inspections</span>
                    </Link>
                    <Link
                      href="/appraisal"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors border-t border-knight-700/60 mt-1 pt-2"
                    >
                      <FileCheck className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Appraisal</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Rentals Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setRentalsDropdown(true)}
              onMouseLeave={() => setRentalsDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith('/rentals') || pathname.includes('status=for_rent')
                    ? 'text-gold-400 bg-knight-800/80'
                    : 'text-slate-200 hover:text-white hover:bg-knight-800/50'
                }`}
              >
                <span>Rentals</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {rentalsDropdown && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-2xl z-50">
                  <div className="bg-knight-850 rounded-xl ring-1 ring-gold-500/20 shadow-2xl p-2 border border-knight-700">
                    <Link
                      href="/properties?status=for_rent"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <Key className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>For Rent</span>
                    </Link>
                    <Link
                      href="/rentals?inspections=true"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <FileCheck className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Upcoming Rental Inspections</span>
                    </Link>
                    <Link
                      href="/rentals?status=leased"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <TrendingUp className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Recently Leased</span>
                    </Link>
                    <Link
                      href="/rentals#application"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <FileCheck className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Tenancy Application</span>
                    </Link>
                    <Link
                      href="/maintenance"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors"
                    >
                      <Wrench className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Maintenance Request</span>
                    </Link>
                    <Link
                      href="/properties?status=for_rent&type=Commercial"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-knight-800 hover:text-gold-300 transition-colors border-t border-knight-700/60 mt-1 pt-2"
                    >
                      <Building className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Commercial for Lease</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/about' ? 'text-gold-400 bg-knight-800/80' : 'text-slate-200 hover:text-white hover:bg-knight-800/50'
                }`}
            >
              About Us
            </Link>

            <Link
              href="/team"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${pathname.startsWith('/team') ? 'text-gold-400 bg-knight-800/80' : 'text-slate-200 hover:text-white hover:bg-knight-800/50'
                }`}
            >
              Our Team
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/contact' ? 'text-gold-400 bg-knight-800/80' : 'text-slate-200 hover:text-white hover:bg-knight-800/50'
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:0390710280"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 bg-knight-800/80 hover:bg-knight-800 rounded-lg border border-knight-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>(03) 9071 0280</span>
            </a>

            <Link
              href="/appraisal"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-400 rounded-lg shadow-md hover:shadow-gold-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Free Appraisal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/appraisal"
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-knight-950 bg-gold-400 rounded-md"
            >
              Appraisal
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-knight-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-knight-950 border-b border-knight-800 px-4 pt-3 pb-8 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-knight-850 hover:text-gold-300"
          >
            Home
          </Link>

          {/* Sales Section */}
          <div className="pt-2 border-t border-knight-800/80">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-gold-400">
              Sales
            </span>
            <div className="mt-1 space-y-1 pl-2">
              <Link
                href="/properties?status=for_sale&type=Residential"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Residential for sale
              </Link>
              <Link
                href="/properties?status=for_sale&type=Land"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Land for Sale
              </Link>
              <Link
                href="/properties?status=for_sale&type=Commercial"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Commercial For Sale
              </Link>
              <Link
                href="/properties?status=sold"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Recently sold
              </Link>
              <Link
                href="/properties?inspections=true"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Upcoming Inspections
              </Link>
              <Link
                href="/appraisal"
                className="block px-3 py-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300"
              >
                Appraisal
              </Link>
            </div>
          </div>

          {/* Rentals Section */}
          <div className="pt-2 border-t border-knight-800/80">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-gold-400">
              Rentals
            </span>
            <div className="mt-1 space-y-1 pl-2">
              <Link
                href="/properties?status=for_rent"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                For Rent
              </Link>
              <Link
                href="/rentals?inspections=true"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Upcoming Rental Inspections
              </Link>
              <Link
                href="/rentals?status=leased"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Recently Leased
              </Link>
              <Link
                href="/rentals#application"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Tenancy Application
              </Link>
              <Link
                href="/maintenance"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Maintenance Request
              </Link>
              <Link
                href="/properties?status=for_rent&type=Commercial"
                className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
              >
                Commercial for Lease
              </Link>
            </div>
          </div>

          {/* Agency links */}
          <div className="pt-2 border-t border-knight-800/80 space-y-1">
            <Link
              href="/about"
              className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
            >
              About Us
            </Link>
            <Link
              href="/team"
              className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
            >
              Our Team
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-1.5 text-xs text-slate-300 hover:text-gold-300"
            >
              Contact & Offices
            </Link>
          </div>

          <div className="pt-3 border-t border-knight-800 flex flex-col gap-2">
            <a
              href="tel:0390710280"
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-knight-850 rounded-lg border border-knight-700"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call Head Office: (03) 9071 0280</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

