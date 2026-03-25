interface MonetizationSlotProps {
  type: 'education' | 'jobs';
  city?: string;
  state?: string;
}

export default function MonetizationSlot({ type, city, state }: MonetizationSlotProps) {
  if (type === 'education') {
    // Realistic education affiliate banner with lead-gen focus
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
          <span className="font-bold text-sm">Sponsored Education</span>
          <span className="text-xs bg-blue-500 px-2 py-1 rounded">Partner Offer</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Advance Your Nursing Career
          </h3>
          <p className="text-gray-700 text-sm mb-4">
            Explore accredited nursing programs and earn your MSN, DNP, or specialty certification{city && state && ` near ${city}, ${state}`}.
          </p>

          {/* Realistic program cards with affiliate conversion elements */}
          <div className="space-y-3 mb-4">
            <a
              href="https://nursing-education-network.com?ref=affiliate123"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">BSN to MSN Online</h4>
                  <p className="text-xs text-gray-600 mt-1">Western Governors University</p>
                </div>
                <span className="text-blue-600 font-bold text-xs bg-blue-50 px-2 py-1 rounded">Top Pick</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <span>⏱ 18-24 months</span>
                <span>💰 $8,500/term</span>
              </div>
            </a>

            <a
              href="https://nursing-education-network.com?ref=affiliate123"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">ICU/Critical Care Certification</h4>
                  <p className="text-xs text-gray-600 mt-1">AACN Certification Corp</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <span>⏱ Self-paced</span>
                <span>💰 $395 exam fee</span>
              </div>
            </a>

            <a
              href="https://nursing-education-network.com?ref=affiliate123"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">Travel Nursing Certification</h4>
                  <p className="text-xs text-gray-600 mt-1">Travel Nursing Academy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <span>⏱ 6 weeks</span>
                <span>💰 Free trial</span>
              </div>
            </a>
          </div>

          {/* Lead-gen form CTA */}
          <div className="bg-white rounded-lg border-2 border-blue-300 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Get Program Info & Pricing
            </p>
            <a
              href="https://nursing-education-network.com/request-info?ref=affiliate123"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center text-sm"
            >
              Request Free Information
            </a>
            <p className="text-xs text-gray-500 text-center mt-2">
              Compare accredited programs instantly
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Realistic job board affiliate banner
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg shadow-md overflow-hidden">
      <div className="bg-green-600 text-white px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm">Featured Job Listings</span>
        <span className="text-xs bg-green-500 px-2 py-1 rounded">Partner Board</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Find Nursing Jobs{city && state && ` in ${city}, ${state}`}
        </h3>
        <p className="text-gray-700 text-sm mb-4">
          Explore thousands of nursing positions with competitive pay and benefits from trusted healthcare facilities.
        </p>

        {/* Realistic job listings with affiliate links */}
        <div className="space-y-3 mb-4">
          <a
            href="https://nurse-job-network.com/apply?ref=affiliate123&job=travel-rn"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">Travel RN - ICU</h4>
                <p className="text-xs text-gray-600 mt-1">Aya Healthcare • Multiple Locations</p>
              </div>
              <span className="text-green-700 font-bold text-sm whitespace-nowrap ml-2">$2,800/wk</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">13 weeks</span>
              <span>Housing stipend</span>
            </div>
          </a>

          <a
            href="https://nurse-job-network.com/apply?ref=affiliate123&job=staff-rn"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">Staff RN - Medical Surgical</h4>
                <p className="text-xs text-gray-600 mt-1">HCA Healthcare{city && state && ` • ${city}, ${state}`}</p>
              </div>
              <span className="text-green-700 font-bold text-sm whitespace-nowrap ml-2">$95K/yr</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">Full-time</span>
              <span>Benefits + 401k</span>
            </div>
          </a>

          <a
            href="https://nurse-job-network.com/apply?ref=affiliate123&job=per-diem"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">Per Diem RN - Emergency</h4>
                <p className="text-xs text-gray-600 mt-1">IntelyCare • Flexible</p>
              </div>
              <span className="text-green-700 font-bold text-sm whitespace-nowrap ml-2">$72/hr</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded">PRN</span>
              <span>Pick your shifts</span>
            </div>
          </a>
        </div>

        {/* Job board CTA */}
        <div className="bg-white rounded-lg border-2 border-green-300 p-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            See All Nursing Jobs
          </p>
          <a
            href="https://nurse-job-network.com/browse?ref=affiliate123"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center text-sm"
          >
            Browse 10,000+ Positions
          </a>
          <p className="text-xs text-gray-500 text-center mt-2">
            Apply directly with one click
          </p>
        </div>
      </div>
    </div>
  );
}
