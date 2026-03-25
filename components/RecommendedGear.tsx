interface GearItem {
  name: string;
  price: string;
  category: string;
  affiliateLink: string; // Amazon affiliate placeholder
  imageAlt: string;
}

export default function RecommendedGear() {
  const gearItems: GearItem[] = [
    {
      name: '3M Littmann Classic III Stethoscope',
      price: '$119.99',
      category: 'Diagnostic Tools',
      affiliateLink: 'https://amazon.com/?tag=youraffid-20', // Placeholder
      imageAlt: 'Professional stethoscope'
    },
    {
      name: 'FIGS Technical Collection Scrubs',
      price: '$38.00',
      category: 'Medical Apparel',
      affiliateLink: 'https://amazon.com/?tag=youraffid-20', // Placeholder
      imageAlt: 'Premium scrubs'
    },
    {
      name: 'Compression Socks (3-Pack)',
      price: '$24.99',
      category: 'Comfort & Wellness',
      affiliateLink: 'https://amazon.com/?tag=youraffid-20', // Placeholder
      imageAlt: 'Compression socks for nurses'
    },
    {
      name: 'Nurse Badge Holder with Retractable Reel',
      price: '$12.99',
      category: 'Accessories',
      affiliateLink: 'https://amazon.com/?tag=youraffid-20', // Placeholder
      imageAlt: 'Badge holder'
    },
    {
      name: 'Penlight Medical Diagnostic Set',
      price: '$9.99',
      category: 'Diagnostic Tools',
      affiliateLink: 'https://amazon.com/?tag=youraffid-20', // Placeholder
      imageAlt: 'Medical penlight'
    },
    {
      name: 'Nursing Clipboard with Storage',
      price: '$16.99',
      category: 'Organization',
      affiliateLink: 'https://amazon.com/?tag=youraffid-20', // Placeholder
      imageAlt: 'Nursing clipboard'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Recommended Gear for Nurses
        </h3>
        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
          Affiliate
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-6">
        Essential tools and equipment trusted by nursing professionals nationwide.
      </p>

      <div className="space-y-4">
        {gearItems.map((item, idx) => (
          <a
            key={idx}
            href={item.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-600 mb-2">{item.category}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{item.price}</div>
                <div className="text-xs text-gray-500">on Amazon</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-blue-600 font-semibold">
              View on Amazon →
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          As an Amazon Associate, we earn from qualifying purchases at no additional cost to you.
        </p>
      </div>
    </div>
  );
}
