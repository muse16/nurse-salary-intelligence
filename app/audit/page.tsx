'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AuditPage() {
  const [checklist, setChecklist] = useState({
    paymentTerms: false,
    cancellationClause: false,
    overtimePolicy: false,
    nonCompete: false,
    housingStipend: false,
    healthInsurance: false,
    licensureReimbursement: false,
    completionBonus: false,
    shiftDifferential: false,
    callRequirements: false,
    orientationPay: false,
    travelReimbursement: false,
    malpracticeInsurance: false,
    floatingPolicy: false,
    holidayPay: false,
  });

  const checklistItems = [
    {
      key: 'paymentTerms',
      title: 'Payment Terms & Schedule',
      description: 'Verify exact pay rate, frequency (weekly/bi-weekly), and any deductions',
      redFlags: 'Vague payment schedules, history of late payments, unclear deductions',
    },
    {
      key: 'cancellationClause',
      title: 'Contract Cancellation Terms',
      description: 'Understand termination conditions for both parties',
      redFlags: 'Hospital can cancel anytime, but you face penalties. Unclear notice periods',
    },
    {
      key: 'overtimePolicy',
      title: 'Overtime & Mandatory Hours',
      description: 'Know if overtime is mandatory, how it&apos;s compensated, and call requirements',
      redFlags: 'Forced overtime without premium pay, unclear maximum hours',
    },
    {
      key: 'nonCompete',
      title: 'Non-Compete Clause',
      description: 'Check for restrictions on future employment in the area',
      redFlags: 'Broad geographic restrictions, extended time periods (>6 months)',
    },
    {
      key: 'housingStipend',
      title: 'Housing & Lodging Benefits',
      description: 'Confirm stipend amount, tax treatment, and if company housing is provided',
      redFlags: 'Taxable stipend, inadequate amount for area, no alternative if housing unavailable',
    },
    {
      key: 'healthInsurance',
      title: 'Health Insurance Coverage',
      description: 'Review plan details, coverage start date, and premium costs',
      redFlags: 'No coverage, delayed start date, excessive employee contribution',
    },
    {
      key: 'licensureReimbursement',
      title: 'Licensure & Certification Costs',
      description: 'Verify reimbursement for state licenses, certifications, and renewals',
      redFlags: 'No reimbursement, must prepay and wait months for repayment',
    },
    {
      key: 'completionBonus',
      title: 'Completion Bonus',
      description: 'Confirm bonus amount and conditions for payment',
      redFlags: 'Excessive conditions, prorated unfairly, withheld for minor infractions',
    },
    {
      key: 'shiftDifferential',
      title: 'Shift Differential Pay',
      description: 'Check night, weekend, and holiday pay premiums',
      redFlags: 'No differential for nights/weekends, lower than industry standard',
    },
    {
      key: 'callRequirements',
      title: 'On-Call Requirements',
      description: 'Understand frequency, compensation, and response time expectations',
      redFlags: 'Unpaid on-call, excessive requirements, unclear compensation',
    },
    {
      key: 'orientationPay',
      title: 'Orientation & Training Pay',
      description: 'Confirm you&apos;re paid for orientation and training time',
      redFlags: 'Unpaid orientation, reduced pay rate for training period',
    },
    {
      key: 'travelReimbursement',
      title: 'Travel & Relocation Costs',
      description: 'Verify reimbursement for travel to assignment and return home',
      redFlags: 'No travel pay, must complete full contract or repay costs',
    },
    {
      key: 'malpracticeInsurance',
      title: 'Malpractice Insurance',
      description: 'Ensure facility provides coverage and understand policy limits',
      redFlags: 'No coverage provided, must purchase own policy, inadequate limits',
    },
    {
      key: 'floatingPolicy',
      title: 'Floating Policy',
      description: 'Understand when and where you can be floated to other units',
      redFlags: 'Can float to any unit regardless of competency, excessive floating',
    },
    {
      key: 'holidayPay',
      title: 'Holiday Pay & Time Off',
      description: 'Review holiday pay rates, PTO policy, and sick leave',
      redFlags: 'No holiday premium, no PTO for travel contracts, unpaid sick leave',
    },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;
  const percentComplete = Math.round((checkedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="text-blue-100 hover:text-white font-semibold mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Contract Red Flag Audit Tool
          </h1>
          <p className="text-xl text-blue-100">
            Use this checklist before signing any nursing contract. Don&apos;t leave money or rights on the table.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold text-gray-900">Audit Progress</span>
            <span className="text-2xl font-bold text-blue-600">{percentComplete}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {checkedCount} of {totalCount} items reviewed
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-6 mb-12">
          {checklistItems.map((item) => (
            <div
              key={item.key}
              className={`bg-white rounded-lg shadow-lg p-6 border-2 transition-all ${
                checklist[item.key as keyof typeof checklist]
                  ? 'border-green-500'
                  : 'border-gray-200'
              }`}
            >
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist[item.key as keyof typeof checklist]}
                  onChange={(e) =>
                    setChecklist({ ...checklist, [item.key]: e.target.checked })
                  }
                  className="mt-1 h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 mb-3">{item.description}</p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-3">
                    <p className="text-sm font-semibold text-red-900 mb-1">Red Flags to Watch:</p>
                    <p className="text-sm text-red-800">{item.redFlags}</p>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Premium Upgrade CTA */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-lg shadow-xl p-8 mb-8 border-4 border-yellow-400">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="inline-block bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                PREMIUM UPGRADE
              </div>
              <h2 className="text-3xl font-bold mb-2">Upgrade to Full Negotiation Kit</h2>
              <p className="text-xl text-purple-100">
                Get personalized contract review + negotiation scripts + legal templates
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-200">Only</div>
              <div className="text-5xl font-bold text-yellow-400">$27</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">📋</span> Contract Review Template
              </h3>
              <ul className="space-y-2 text-sm text-purple-100">
                <li>• Line-by-line analysis worksheet</li>
                <li>• Red flag identification guide</li>
                <li>• Clause-by-clause breakdown</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">💬</span> Negotiation Scripts
              </h3>
              <ul className="space-y-2 text-sm text-purple-100">
                <li>• Salary negotiation templates</li>
                <li>• Counter-offer language</li>
                <li>• Email response examples</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">⚖️</span> Legal Templates
              </h3>
              <ul className="space-y-2 text-sm text-purple-100">
                <li>• Contract addendum templates</li>
                <li>• Termination clause revisions</li>
                <li>• Non-compete modifications</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">📊</span> Market Data Access
              </h3>
              <ul className="space-y-2 text-sm text-purple-100">
                <li>• Salary benchmarking by specialty</li>
                <li>• Regional compensation data</li>
                <li>• Benefits comparison charts</li>
              </ul>
            </div>
          </div>

          <a
            href="https://gumroad.com/l/nurse-negotiation-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold py-5 px-8 rounded-lg transition-colors text-center text-xl shadow-2xl"
          >
            Upgrade to Full Negotiation Kit - $27
          </a>
          <p className="text-sm text-purple-200 text-center mt-4 flex items-center justify-center gap-2">
            <span>✓</span> Instant digital delivery
            <span>✓</span> One-time payment
            <span>✓</span> No subscription
          </p>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Get the Complete Contract Audit Kit</h2>
          <p className="text-xl text-blue-100 mb-6">
            Download our comprehensive PDF guide with:
          </p>
          <ul className="space-y-3 mb-8 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Printable contract review checklist</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Sample questions to ask recruiters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Red flag examples with real contract language</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Salary negotiation tactics for nurses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>State-by-state employment law overview</span>
            </li>
          </ul>
          <button className="w-full bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors text-lg">
            Download Free PDF Kit (Placeholder)
          </button>
          <p className="text-sm text-blue-200 text-center mt-3">
            No email required. Instant download.
          </p>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/"
              className="border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                Browse Salary Data →
              </h3>
              <p className="text-gray-700">
                Compare salaries across cities and hospitals nationwide
              </p>
            </Link>
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Legal Review Service
              </h3>
              <p className="text-gray-700 mb-3">
                Have an attorney review your contract (Coming Soon)
              </p>
              <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                Placeholder
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
