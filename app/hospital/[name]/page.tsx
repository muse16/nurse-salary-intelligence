import { getHospitalData, slugify, unslugify, getAllHospitals } from '@/lib/data';
import DataTable from '@/components/DataTable';
import MonetizationSlot from '@/components/MonetizationSlot';
import PremiumAuditCTA from '@/components/PremiumAuditCTA';
import RecommendedGear from '@/components/RecommendedGear';
import AdSenseSlot from '@/components/AdSenseSlot';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateStaticParams() {
  const hospitals = getAllHospitals();
  return hospitals.map(hospital => ({
    name: slugify(hospital),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const hospitalFormatted = unslugify(name);
  const hospitalData = getHospitalData(hospitalFormatted);

  if (!hospitalData) {
    return {
      title: 'Hospital Not Found',
    };
  }

  return {
    title: `${hospitalData.hospital} - Nurse Salaries & Contract Intelligence`,
    description: `Review nurse salaries and contract red flags at ${hospitalData.hospital} in ${hospitalData.city}, ${hospitalData.state}. Average salary: $${hospitalData.avgSalary.toLocaleString()}.`,
  };
}

export default async function HospitalPage({ params }: PageProps) {
  const { name } = await params;
  const hospitalFormatted = unslugify(name);
  const hospitalData = getHospitalData(hospitalFormatted);

  if (!hospitalData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            {hospitalData.hospital}
          </h1>
          <p className="text-gray-600 mt-2">
            {hospitalData.city}, {hospitalData.state}
          </p>
        </div>
      </header>

      {/* AdSense Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdSenseSlot position="header" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Average Salary</div>
            <div className="text-3xl font-bold text-blue-600">
              ${hospitalData.avgSalary.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Open Positions</div>
            <div className="text-3xl font-bold text-green-600">
              {hospitalData.totalPositions}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Contract Status</div>
            <div className="text-2xl font-bold">
              {hospitalData.redFlags.length === 0 ? (
                <span className="text-green-600">Clean ✓</span>
              ) : (
                <span className="text-red-600">{hospitalData.redFlags.length} Red Flag(s)</span>
              )}
            </div>
          </div>
        </div>

        {/* Red Flags Alert */}
        {hospitalData.redFlags.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              ⚠ Contract Red Flags at {hospitalData.hospital}
            </h2>
            <p className="text-red-800 mb-6">
              Our analysis has identified the following red flags in contracts at this facility.
              Review these carefully and use our audit tool before signing any agreement.
            </p>
            <div className="space-y-3">
              {hospitalData.redFlags.map((flag, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">⚠</span>
                    <div>
                      <div className="font-semibold text-red-900">{flag}</div>
                      <div className="text-sm text-gray-700 mt-1">
                        {flag.includes('Late payments') &&
                          'Reports of delayed payroll processing. Verify payment terms and history before accepting.'}
                        {flag.includes('Mandatory overtime') &&
                          'Contract may include forced overtime clauses. Ensure you understand work hour requirements.'}
                        {flag.includes('Unclear cancellation') &&
                          'Contract cancellation terms are ambiguous. Request clarification on termination conditions.'}
                        {flag.includes('Non-compete') &&
                          'Non-compete clause may restrict future employment. Consult legal counsel before signing.'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/audit"
              className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Download Full Contract Audit Kit
            </Link>
          </div>
        )}

        {/* SEO Content Block */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Working at {hospitalData.hospital}
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              {hospitalData.hospital} in {hospitalData.city}, {hospitalData.state} currently has{' '}
              {hospitalData.totalPositions} nursing position{hospitalData.totalPositions > 1 ? 's' : ''}{' '}
              available with an average salary of <strong>${hospitalData.avgSalary.toLocaleString()}</strong>.
              This facility offers opportunities for both travel nurses and permanent staff positions.
            </p>
            {hospitalData.redFlags.length === 0 ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                <div className="flex items-start">
                  <span className="text-green-600 text-2xl mr-3">✓</span>
                  <div>
                    <p className="font-semibold text-green-900">Clean Contract Status</p>
                    <p className="text-green-800 text-sm mt-1">
                      Our analysis shows no red flags in contracts from {hospitalData.hospital}.
                      This facility demonstrates transparent contracting practices and fair terms.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                <div className="flex items-start">
                  <span className="text-red-600 text-2xl mr-3">⚠</span>
                  <div>
                    <p className="font-semibold text-red-900">Contract Concerns Identified</p>
                    <p className="text-red-800 text-sm mt-1">
                      We&apos;ve identified {hospitalData.redFlags.length} red flag
                      {hospitalData.redFlags.length > 1 ? 's' : ''} in contracts from {hospitalData.hospital}.
                      Exercise caution and thoroughly review all contract terms before accepting any position.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <p>
              <strong>What to Know Before Applying:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Average compensation: ${hospitalData.avgSalary.toLocaleString()} annually</li>
              <li>{hospitalData.totalPositions} position{hospitalData.totalPositions > 1 ? 's' : ''} currently available</li>
              <li>Location: {hospitalData.city}, {hospitalData.state}</li>
              <li>
                {hospitalData.redFlags.length === 0
                  ? 'No contract red flags identified'
                  : `${hospitalData.redFlags.length} contract concern${hospitalData.redFlags.length > 1 ? 's' : ''} to review`}
              </li>
            </ul>
            <p>
              Use our comprehensive{' '}
              <Link href="/audit" className="text-blue-600 hover:text-blue-700 underline">
                Contract Red Flag Audit Tool
              </Link>{' '}
              to review any contract offer from {hospitalData.hospital}. Our checklist covers common
              issues including payment terms, cancellation clauses, overtime requirements, and non-compete
              restrictions.
            </p>
          </div>
        </div>

        {/* Mid-content AdSense */}
        <div className="mb-8">
          <AdSenseSlot position="mid-content" />
        </div>

        {/* Data Table and Monetization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <DataTable
              data={hospitalData.positions}
              title="Available Positions"
            />
          </div>
          <div className="space-y-6">
            {/* AdSense Sidebar */}
            <AdSenseSlot position="sidebar" />

            <MonetizationSlot type="jobs" city={hospitalData.city} state={hospitalData.state} />
            <MonetizationSlot type="education" city={hospitalData.city} state={hospitalData.state} />

            {/* Premium Audit CTA */}
            <PremiumAuditCTA placement="sidebar" />

            {/* Recommended Gear */}
            <RecommendedGear />
          </div>
        </div>

        {/* Footer Premium Audit CTA */}
        <div className="mt-12">
          <PremiumAuditCTA placement="footer" />
        </div>
      </main>
    </div>
  );
}
