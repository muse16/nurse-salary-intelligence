import { getCityData, slugify, unslugify, getAllStates, getCitiesByState } from '@/lib/data';
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
    state: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const states = getAllStates();
  const paths: { state: string; city: string }[] = [];

  states.forEach(state => {
    const cities = getCitiesByState(state);
    cities.forEach(city => {
      paths.push({
        state: slugify(state),
        city: slugify(city),
      });
    });
  });

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const stateFormatted = unslugify(state);
  const cityFormatted = unslugify(city);

  const cityData = getCityData(stateFormatted, cityFormatted);

  if (!cityData) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Nurse Salaries in ${cityData.city}, ${cityData.state} | Salary Intelligence`,
    description: `Explore nurse salaries in ${cityData.city}, ${cityData.state}. Average salary: $${cityData.avgSalary.toLocaleString()}. Compare ${cityData.totalPositions} positions from top hospitals.`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const stateFormatted = unslugify(state);
  const cityFormatted = unslugify(city);

  const cityData = getCityData(stateFormatted, cityFormatted);

  if (!cityData) {
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
            Nurse Salaries in {cityData.city}, {cityData.state}
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive salary data and contract intelligence for nursing positions
          </p>
        </div>
      </header>

      {/* AdSense Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdSenseSlot position="header" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Average Salary</div>
            <div className="text-3xl font-bold text-blue-600">
              ${cityData.avgSalary.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Salary Range</div>
            <div className="text-2xl font-bold text-gray-900">
              ${cityData.minSalary.toLocaleString()} - ${cityData.maxSalary.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Positions</div>
            <div className="text-3xl font-bold text-green-600">
              {cityData.totalPositions}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Clean Contracts</div>
            <div className="text-3xl font-bold text-green-600">
              {cityData.positions.filter(p => p.red_flags === 'None').length}
            </div>
          </div>
        </div>

        {/* SEO Content Block */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Work as a Nurse in {cityData.city}?
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              {cityData.city}, {cityData.state} offers exceptional opportunities for nursing professionals
              seeking competitive compensation and career growth. With an average salary of{' '}
              <strong>${cityData.avgSalary.toLocaleString()}</strong>, nurses in {cityData.city}{' '}
              earn competitive wages while enjoying the benefits of working in a dynamic healthcare market.
            </p>
            <p>
              Our database tracks {cityData.totalPositions} nursing positions across top-rated healthcare
              facilities in {cityData.city}. Whether you&apos;re a travel nurse seeking 13-week contracts or
              a staff nurse looking for permanent placement, {cityData.city} provides diverse opportunities
              in specialties ranging from emergency medicine to critical care.
            </p>
            <p>
              <strong>Key Benefits of Working in {cityData.city}:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Competitive salary range from ${cityData.minSalary.toLocaleString()} to ${cityData.maxSalary.toLocaleString()}</li>
              <li>Multiple healthcare facilities with open positions</li>
              <li>Both travel and staff nursing opportunities available</li>
              <li>Transparent contract terms with red flag auditing</li>
            </ul>
            <p>
              Before accepting any position in {cityData.city}, we recommend reviewing our{' '}
              <Link href="/audit" className="text-blue-600 hover:text-blue-700 underline">
                Contract Red Flag Audit Tool
              </Link>{' '}
              to ensure you&apos;re getting fair terms. Our analysis shows that{' '}
              {cityData.positions.filter(p => p.red_flags === 'None').length} out of{' '}
              {cityData.totalPositions} positions in {cityData.city} have clean contracts with no
              identified red flags.
            </p>
          </div>
        </div>

        {/* Mid-content AdSense */}
        <div className="mb-8">
          <AdSenseSlot position="mid-content" />
        </div>

        {/* Data Table and Monetization in Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <DataTable
              data={cityData.positions}
              title="All Nursing Positions"
            />
          </div>
          <div className="space-y-6">
            {/* AdSense Sidebar */}
            <AdSenseSlot position="sidebar" />

            <MonetizationSlot type="jobs" city={cityData.city} state={cityData.state} />
            <MonetizationSlot type="education" city={cityData.city} state={cityData.state} />

            {/* Premium Audit CTA */}
            <PremiumAuditCTA placement="sidebar" />

            {/* Recommended Gear */}
            <RecommendedGear />
          </div>
        </div>

        {/* Contract Red Flags Section */}
        {cityData.positions.some(p => p.red_flags !== 'None') && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              ⚠ Contract Red Flags Detected in {cityData.city}
            </h2>
            <p className="text-red-800 mb-6">
              Some positions in this area have been flagged for potentially problematic contract terms.
              Review these carefully before accepting any offer.
            </p>
            <div className="space-y-3">
              {cityData.positions
                .filter(p => p.red_flags !== 'None')
                .map((position, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="font-semibold text-gray-900">{position.hospital}</div>
                    <div className="text-sm text-red-600 mt-1">
                      Red Flag: {position.red_flags}
                    </div>
                  </div>
                ))}
            </div>
            <Link
              href="/audit"
              className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Use Our Contract Audit Tool
            </Link>
          </div>
        )}

        {/* Footer Premium Audit CTA */}
        <div className="mt-12">
          <PremiumAuditCTA placement="footer" />
        </div>
      </main>
    </div>
  );
}
