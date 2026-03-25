interface PremiumAuditCTAProps {
  placement?: 'sidebar' | 'footer';
}

export default function PremiumAuditCTA({ placement = 'sidebar' }: PremiumAuditCTAProps) {
  const gumroadLink = 'https://gumroad.com/l/nurse-offer-letter-audit'; // Placeholder - replace with actual link

  if (placement === 'footer') {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg shadow-xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
            DIGITAL PRODUCT
          </div>
          <h3 className="text-3xl font-bold mb-3">
            Nurse Offer Letter Premium Audit
          </h3>
          <p className="text-lg text-purple-100 mb-6">
            Get expert analysis of your offer letter. We&apos;ll identify hidden red flags, unfair clauses, and negotiation opportunities you might miss.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-sm text-purple-200">One-time payment</div>
              <div className="text-3xl font-bold">$27</div>
            </div>
            <a
              href={gumroadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold py-4 px-8 rounded-lg transition-colors text-lg shadow-lg"
            >
              Get Premium Audit Now
            </a>
          </div>
          <div className="text-sm text-purple-200">
            ✓ Detailed contract review ✓ Red flag identification ✓ Negotiation talking points
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-6 border-2 border-purple-400">
      <div className="inline-block bg-yellow-400 text-purple-900 text-xs font-bold px-2 py-1 rounded-full mb-3">
        PREMIUM
      </div>
      <h3 className="text-xl font-bold mb-3">
        Offer Letter Premium Audit
      </h3>
      <p className="text-purple-100 text-sm mb-4">
        Upload your offer letter and get expert analysis identifying red flags and negotiation opportunities.
      </p>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 font-bold">✓</span>
            <span>Line-by-line contract review</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 font-bold">✓</span>
            <span>Red flag identification</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 font-bold">✓</span>
            <span>Negotiation talking points</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 font-bold">✓</span>
            <span>Market comparison data</span>
          </li>
        </ul>
      </div>

      <div className="text-center mb-4">
        <div className="text-sm text-purple-200 mb-1">One-time payment</div>
        <div className="text-4xl font-bold text-yellow-400">$27</div>
      </div>

      <a
        href={gumroadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold py-3 px-6 rounded-lg transition-colors text-center"
      >
        Get Premium Audit
      </a>

      <p className="text-xs text-purple-200 text-center mt-3">
        Instant digital delivery
      </p>
    </div>
  );
}
