'use client';

import React from 'react';
import Link from 'next/link';
import { Gavel, Key, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const solutions = [
  {
    icon: Gavel,
    title: 'Sales & Auction Strategies',
    description:
      'Led by Director Lushan Dons, our sales team crafts customized marketing campaigns with in-house auctioneering, bespoke photography, multi-channel buyer targeting, and fierce private treaty negotiation.',
    bullets: [
      'In-House Licensed Auctioneers',
      'Extensive Pre-Approved Buyer Database',
      'Tailored Private Treaty & Expressions of Interest',
    ],
    ctaText: 'Explore Sales Campaigns',
    ctaLink: '/properties?status=for_sale',
  },
  {
    icon: Key,
    title: 'Property Management & Leasing',
    description:
      'Directed by Co-Founder Jessica Gale, we manage every rental investment with owner-first diligence: rigorous tenant vetting, rapid emergency repairs, and full Victorian legislation compliance.',
    bullets: [
      '1-Business-Day Contact Guarantee',
      'Routine Video & Photographic Inspections',
      'Strict Arrears Management & Compliance',
    ],
    ctaText: 'Discover Rental Management',
    ctaLink: '/rentals',
  },
  {
    icon: TrendingUp,
    title: 'Free Market Appraisals',
    description:
      "Obtain an in-depth, data-backed assessment of your property's current market value in South-East Melbourne, including recent comparable sales, buyer demand trends, and optimization tips.",
    bullets: [
      '100% Free with Zero Obligation',
      'Comprehensive Suburb Sales Analysis',
      'Tactical Advice on Staging & Timing',
    ],
    ctaText: 'Book Free Valuation',
    ctaLink: '/appraisal',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function SolutionsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-neutral-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold-600 text-xs font-bold uppercase tracking-widest bg-gold-50 border border-gold-200/80 px-3.5 py-1 rounded-full inline-block mb-3">
            Comprehensive Real Estate Solutions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-knight-900 tracking-tight mt-1 leading-tight">
            Built on Transparency, Driven by Results
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Whether you are listing a family residence, looking for an elite licensed auctioneer, or seeking a proactive asset manager, we provide an uncompromising standard of service.
          </p>
        </motion.div>

        {/* 3 Solutions Cards with Staggered Scroll Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {solutions.map((sol, index) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 sm:p-9 border border-neutral-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-gold-400/40 relative overflow-hidden"
              >
                {/* Subtle luxury top gold accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-knight-900 text-gold-400 flex items-center justify-center mb-6 shadow-md group-hover:scale-105 group-hover:bg-knight-950 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-knight-900 mb-3 group-hover:text-gold-700 transition-colors">
                    {sol.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {sol.description}
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {sol.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-neutral-100">
                  <Link
                    href={sol.ctaLink}
                    className="text-xs sm:text-sm font-bold text-knight-900 hover:text-gold-700 inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    <span>{sol.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-gold-600" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
