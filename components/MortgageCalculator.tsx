'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, RefreshCw } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export default function MortgageCalculator({ initialPrice = 850000 }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [depositPercent, setDepositPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(5.95);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [frequency, setFrequency] = useState<'monthly' | 'fortnightly' | 'weekly'>('monthly');

  const loanAmount = useMemo(() => {
    return Math.max(0, propertyPrice * (1 - depositPercent / 100));
  }, [propertyPrice, depositPercent]);

  const repayments = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTermYears * 12;

    if (monthlyRate === 0) {
      const monthly = loanAmount / totalMonths;
      return {
        monthly: Math.round(monthly),
        fortnightly: Math.round((monthly * 12) / 26),
        weekly: Math.round((monthly * 12) / 52),
        totalInterest: 0,
      };
    }

    const monthly =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalRepayments = monthly * totalMonths;
    const totalInterest = Math.max(0, totalRepayments - loanAmount);

    return {
      monthly: Math.round(monthly),
      fortnightly: Math.round((monthly * 12) / 26),
      weekly: Math.round((monthly * 12) / 52),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, interestRate, loanTermYears]);

  const activeRepayment =
    frequency === 'monthly'
      ? repayments.monthly
      : frequency === 'fortnightly'
        ? repayments.fortnightly
        : repayments.weekly;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-knight-900">
            Mortgage Repayment Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Estimate your loan repayments for this property
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Property Price */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Property Price</span>
              <span className="text-knight-900 font-bold">${propertyPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={200000}
              max={3000000}
              step={25000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
          </div>

          {/* Deposit Percent */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Deposit ({depositPercent}%)</span>
              <span className="text-slate-600">
                ${Math.round((propertyPrice * depositPercent) / 100).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDepositPercent(pct)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${depositPercent === pct
                      ? 'bg-knight-900 text-white border-knight-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Loan Term in 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  max="15"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:outline-none"
                />
                <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Loan Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:outline-none bg-white"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>

          {/* Frequency Toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Payment Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['monthly', 'fortnightly', 'weekly'] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`py-1.5 text-xs capitalize font-semibold rounded-lg border transition-colors ${frequency === freq
                      ? 'bg-gold-600 text-white border-gold-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-knight-900 to-knight-800 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-knight-700 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              Estimated Repayment
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                ${activeRepayment.toLocaleString()}
              </span>
              <span className="text-sm text-slate-400 capitalize">/{frequency}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-knight-700/80 space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Loan Amount:</span>
              <span className="font-semibold text-white">${loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Deposit ({depositPercent}%):</span>
              <span className="font-semibold text-white">
                ${Math.round((propertyPrice * depositPercent) / 100).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest (Est.):</span>
              <span className="font-semibold text-gold-300">
                ${repayments.totalInterest.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="mt-5 text-[10px] text-slate-400 leading-normal">
            *Disclaimer: This calculator provides estimates for demonstration purposes only. Actual rates, fees, and conditions are subject to lender approval.
          </p>
        </div>
      </div>
    </div>
  );
}

