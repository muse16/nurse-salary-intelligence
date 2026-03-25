import { getAllNurseData, getAllStates, slugify } from '@/lib/data';
import Link from 'next/link';
import DataTable from '@/components/DataTable';

export default function Home() {
  const allData = getAllNurseData();
  const states = getAllStates();

  // Calculate key stats
  const avgSalary = Math.round(
    allData.reduce((sum, pos) => sum + pos.salary, 0) / allData.length
  );
  const totalPositions = allData.length;
  const cleanContracts = allData.filter(pos => pos.red_flags === 'None').length;
  const uniqueHospitals = new Set(allData.map(pos => pos.hospital)).size;

  // Group by state and city for quick links
  const stateData = states.map(state => {
    const stateCities = [...new Set(
      allData.filter(pos => pos.state === state).map(pos => pos.city)
    )].sort();
    return { state, cities: stateCities };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold mb-4">
            Nurse Salary & Contract Intelligence
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Transparent salary data and contract red flag analysis for nursing professionals.
            Make informed decisions about your next position.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/audit"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contract Audit Tool
            </Link>
            <a
              href="#browse"
              className="bg-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-900 transition-colors border-2 border-white"
            >
              Browse Salaries
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
            <div className="text-sm font-medium text-gray-600 mb-2">Average Salary</div>
            <div className="text-3xl font-bold text-blue-600">
              ${avgSalary.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">Nationally</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Positions</div>
            <div className="text-3xl font-bold text-green-600">
              {totalPositions}
            </div>
            <div className="text-xs text-gray-500 mt-1">Across {uniqueHospitals} hospitals</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-emerald-600">
            <div className="text-sm font-medium text-gray-600 mb-2">Clean Contracts</div>
            <div className="text-3xl font-bold text-emerald-600">
              {cleanContracts}
            </div>
            <div className="text-xs text-gray-500 mt-1">No red flags identified</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-600">
            <div className="text-sm font-medium text-gray-600 mb-2">Red Flags</div>
            <div className="text-3xl font-bold text-red-600">
              {totalPositions - cleanContracts}
            </div>
            <div className="text-xs text-gray-500 mt-1">Contracts with concerns</div>
          </div>
        </div>

        {/* Why Use This Tool */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Nurse Contract Intelligence Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-3">Know Your Worth</h3>
              <p className="text-gray-700">
                Compare salaries across cities and hospitals to negotiate confidently.
                Our database tracks real compensation data from travel and staff positions nationwide.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-3">Avoid Contract Traps</h3>
              <p className="text-gray-700">
                Identify red flags like late payments, mandatory overtime clauses, and unclear
                cancellation terms before signing. Our audit tool helps you spot problems early.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-3">Transparent Data</h3>
              <p className="text-gray-700">
                No hidden fees, no recruiter pressure. Just clear, actionable salary data and
                contract analysis to help you make the best decision for your career.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-600 mb-3">Save Time & Money</h3>
              <p className="text-gray-700">
                Research multiple facilities at once. Compare benefits, identify the best paying
                regions, and focus on opportunities that match your needs.
              </p>
            </div>
          </div>
        </div>

        {/* All Positions Table */}
        <div id="browse" className="mb-16">
          <DataTable data={allData} title="All Nursing Positions" />
        </div>

        {/* Browse by Location */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Browse Salaries by Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateData.map(({ state, cities }) => (
              <div key={state} className="border-2 border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{state}</h3>
                <ul className="space-y-2">
                  {cities.map(city => (
                    <li key={city}>
                      <Link
                        href={`/salary/${slugify(state)}/${slugify(city)}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don&apos;t Sign Without Auditing Your Contract
          </h2>
          <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
            Use our free Contract Red Flag Audit Tool to review payment terms, cancellation clauses,
            overtime policies, and more. Protect your rights and maximize your earnings.
          </p>
          <Link
            href="/audit"
            className="inline-block bg-white text-red-600 font-bold py-4 px-10 rounded-lg hover:bg-red-50 transition-colors text-lg"
          >
            Start Your Contract Audit
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Nurse Contract Intelligence</h3>
              <p className="text-gray-400 text-sm">
                Transparent salary data and contract analysis for nursing professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/audit" className="text-gray-400 hover:text-white">Contract Audit Tool</Link></li>
                <li><Link href="/#browse" className="text-gray-400 hover:text-white">Salary Database</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">Blog (Coming Soon)</li>
                <li className="text-gray-400">Negotiation Guide (Coming Soon)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            &copy; 2025 Nurse Contract Intelligence. For informational purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}
