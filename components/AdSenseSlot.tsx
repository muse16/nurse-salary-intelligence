interface AdSenseSlotProps {
  position: 'header' | 'sidebar' | 'mid-content';
  format?: 'horizontal' | 'vertical' | 'square';
}

export default function AdSenseSlot({ position, format = 'horizontal' }: AdSenseSlotProps) {
  // Different dimensions based on position and format
  const dimensions = {
    header: { width: '728px', height: '90px' },
    sidebar: { width: '300px', height: '250px' },
    'mid-content': { width: '728px', height: '90px' },
  };

  const dim = dimensions[position];

  return (
    <div className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden" style={{ minHeight: dim.height, width: '100%' }}>
      <div className="text-center p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Google AdSense
        </div>
        <div className="text-xs text-gray-400">
          {position === 'header' && '728x90 Leaderboard'}
          {position === 'sidebar' && '300x250 Medium Rectangle'}
          {position === 'mid-content' && '728x90 Banner'}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {/* Placeholder for AdSense script */}
          {/* data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" */}
        </div>
      </div>
    </div>
  );
}
