import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Gavel,
  Key,
  Users,
  Award,
} from 'lucide-react';
import { AGENCY_INFO, TEAM_MEMBERS, OFFICES } from '@/data/content';

export const metadata = {
  title: 'About Us | Dons Premier Estate Agents',
  description:
    'Discover the story behind Dons Premier Estate Agents, "The Knights of Real Estate", founded in 2019 by Lushan Dons and Jessica Gale in Melbourne, Victoria.',
};

export default function AboutPage() {
  const leadership = TEAM_MEMBERS.slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-knight-950 text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Dons Premier About Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">
            Founded 2019 • Victoria, Australia
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2">
            The Knights of Real Estate
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto mt-4 leading-relaxed font-normal">
            Built on the unshakeable foundation that property investors and vendors deserve responsive, transparent, and results-driven representation across Victoria.
          </p>
        </div>
      </section>

      {/* 1. Core Brand Story & Chess Knight Emblem */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Brand Heritage
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 tracking-tight">
                {AGENCY_INFO.story.title}
              </h2>

              <div className="prose prose-slate text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Founded in 2019 by <strong className="text-knight-900">Lushan Dons</strong>, Dons Premier Estate Agents was built on the belief that property investors deserve more than just basic service — they deserve <strong>responsive, transparent, and results-driven management</strong>.
                </p>
                <p>
                  With <strong className="text-knight-900">Jessica Gale</strong> as Co-Founder and <strong>Officer in Effective Control</strong>, our agency focuses on delivering exceptional outcomes in both property sales and rentals across Victoria.
                </p>
                <div className="p-6 rounded-2xl bg-knight-50 border border-knight-100 space-y-3 my-6">
                  <h4 className="font-serif font-bold text-knight-900 text-base">
                    The Knight Chess Piece & The Letter &apos;D&apos;
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Founder Lushan Dons, a former competitive chess player, found inspiration in the <strong>knight chess piece</strong> — a symbol of strategy, strength, and precise movement. Its distinctive L-shaped path also reflects the &apos;L&apos; in Lushan, and our philosophy of thoughtful progression.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The <strong>letter &apos;D&apos;</strong>, representing Dons, embraces the knight, symbolizing a powerful alignment of identity and intention. This story forms the basis of our brand identity and is captured in our tagline:
                  </p>
                  <div className="font-serif italic font-bold text-gold-800 text-base pt-1">
                    &quot;The Knights of Real Estate&quot;
                  </div>
                </div>
                <p>
                  At Dons Premier, we understand that your property is more than just a number — it&apos;s a valuable investment. That&apos;s why we offer a <strong>Service Guarantee</strong> to every client.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-knight-950 to-knight-900 p-8 sm:p-10 text-white shadow-2xl border border-knight-800 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gold-400 text-knight-950 flex items-center justify-center text-3xl font-bold shadow-lg">
                  ♞
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Our Uncompromising Service Guarantee
                </h3>
                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Prompt Communication</strong>
                      We guarantee to return all phone calls and emails within one business day — every time.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Proactive Property Management</strong>
                      Whether it&apos;s a routine inspection or an emergency repair, we act swiftly to minimise risk and maximise returns.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Owner-First Focus</strong>
                      We manage every property with the same care and diligence as if it were our own — with strategic tenant selection, risk mitigation, and compliance.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars: Sales vs Property Management */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">
              Our Promise to You
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 mt-1">
              Dual Strengths: Sales Mastery & Management Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pillar 1: Sales */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-knight-900">
                Sales Expertise that Delivers Results
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Sales have always been our core strength. Whether you&apos;re selling a family home, investment property, or development site, our sales team knows how to position your asset for maximum exposure and the best result — all while providing clear communication and sharp market insights.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Private Sales and Dynamic Auction Campaigns</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>In-House Licensed Auctioneers with Proven Clearance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Skilled negotiators with proven success in private treaty deals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Highly strategic auction campaigns tailored to each property & market condition</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Rentals */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-knight-900">
                Property Management that Protects Your Investment
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Led by Officer in Effective Control Jessica Gale, our property management division treats your portfolio with meticulous care, proactive maintenance, and strict adherence to Victorian tenancy reforms.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Rigorous 100-point tenant vetting & background verification</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Zero-tolerance rent arrears protocol</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Detailed photographic condition reporting & routine checks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Prompt contractor dispatch to protect asset longevity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership Roster Detail */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">
              Executive Leadership
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 mt-1">
              Meet the Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {leadership.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden relative shadow-lg ring-4 ring-gold-400/30 shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2.5 flex-grow text-center sm:text-left">
                  <h3 className="font-serif text-2xl font-bold text-knight-900">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-bold text-gold-700 leading-tight">
                    {leader.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line pt-1">
                    {leader.bio}
                  </p>
                  {leader.motto && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs italic text-slate-700">
                      &quot;{leader.motto}&quot;
                    </div>
                  )}
                  <div className="pt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <a
                      href={`tel:${leader.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-knight-900 text-white text-xs font-medium hover:bg-knight-800 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-gold-400" />
                      <span>{leader.phone}</span>
                    </a>
                    <a
                      href={`mailto:${leader.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors"
                    >
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{leader.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-knight-900 text-white text-xs sm:text-sm font-semibold hover:bg-knight-800 transition-colors shadow-md"
            >
              <Users className="w-4 h-4 text-gold-400" />
              <span>Meet the Complete Sales & Property Management Team</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Strategic Offices */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">
              Victoria Locations
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 mt-1">
              Our 3 Strategic Office Hubs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFICES.map((office) => (
              <div
                key={office.id}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-50 text-gold-800 border border-gold-200 mb-2">
                    {office.type}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-knight-900">
                    {office.name}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-slate-600 mt-2">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{office.address}, {office.suburb} {office.state} {office.postcode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    className="font-semibold text-knight-900 hover:text-gold-700 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>{office.phone}</span>
                  </a>
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-gold-700 hover:underline"
                  >
                    View Map & Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

