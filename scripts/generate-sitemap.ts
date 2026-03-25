import fs from 'fs';
import path from 'path';
import { getAllNurseData, getAllStates, getCitiesByState, getAllHospitals, slugify } from '../lib/data';

const BASE_URL = 'https://nursesalaryintel.com'; // Update with your actual domain

interface SitemapEntry {
  url: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  lastmod?: string;
}

// Common nursing specialties for programmatic SEO
const SPECIALTIES = [
  'icu', 'critical-care', 'emergency-room', 'er', 'pediatrics', 'labor-delivery',
  'oncology', 'surgical', 'med-surg', 'telemetry', 'step-down', 'nicu',
  'cardiovascular', 'psychiatric', 'operating-room', 'post-anesthesia', 'dialysis',
  'home-health', 'hospice', 'school-nurse', 'case-management', 'nursing-informatics',
  'travel-nurse', 'per-diem', 'part-time', 'full-time', 'contract'
];

function generateSitemapXML(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return xml;
}

function generateSitemap() {
  const entries: SitemapEntry[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Homepage
  entries.push({
    url: BASE_URL,
    changefreq: 'daily',
    priority: 1.0,
    lastmod: today
  });

  // Audit page
  entries.push({
    url: `${BASE_URL}/audit`,
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: today
  });

  // All hospital pages (currently existing in CSV)
  const hospitals = getAllHospitals();
  hospitals.forEach(hospital => {
    entries.push({
      url: `${BASE_URL}/hospital/${slugify(hospital)}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: today
    });
  });

  // All city pages (currently existing in CSV)
  const states = getAllStates();
  states.forEach(state => {
    const cities = getCitiesByState(state);
    cities.forEach(city => {
      entries.push({
        url: `${BASE_URL}/salary/${slugify(state)}/${slugify(city)}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: today
      });
    });
  });

  // Programmatic SEO: State x City x Specialty permutations
  // Generate potential pages for specialty-specific searches
  states.forEach(state => {
    const cities = getCitiesByState(state);
    cities.forEach(city => {
      SPECIALTIES.forEach(specialty => {
        entries.push({
          url: `${BASE_URL}/salary/${slugify(state)}/${slugify(city)}/${specialty}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: today
        });
      });
    });
  });

  // State-level pages (for broader searches)
  states.forEach(state => {
    entries.push({
      url: `${BASE_URL}/salary/${slugify(state)}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: today
    });

    // State + Specialty pages
    SPECIALTIES.forEach(specialty => {
      entries.push({
        url: `${BASE_URL}/salary/${slugify(state)}/${specialty}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: today
      });
    });
  });

  // Specialty-only pages (national level)
  SPECIALTIES.forEach(specialty => {
    entries.push({
      url: `${BASE_URL}/specialty/${specialty}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: today
    });
  });

  console.log(`\n📊 Sitemap Statistics:`);
  console.log(`   Total URLs: ${entries.length}`);
  console.log(`   - Homepage & Static: 2`);
  console.log(`   - Hospital Pages: ${hospitals.length}`);
  console.log(`   - City Pages: ${entries.filter(e => e.priority === 0.8 && e.url.includes('/salary/')).length - hospitals.length}`);
  console.log(`   - State Pages: ${states.length}`);
  console.log(`   - State + Specialty: ${states.length * SPECIALTIES.length}`);
  console.log(`   - City + Specialty: ${entries.filter(e => e.priority === 0.6 && e.url.split('/').length === 7).length}`);
  console.log(`   - Specialty Pages: ${SPECIALTIES.length}`);

  return entries;
}

function main() {
  console.log('🚀 Generating comprehensive sitemap...\n');

  const entries = generateSitemap();
  const xml = generateSitemapXML(entries);

  // Write to public directory
  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, xml, 'utf-8');

  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`   Location: ${sitemapPath}`);
  console.log(`   Total URLs: ${entries.length}`);

  // Generate a human-readable summary
  const summaryPath = path.join(publicDir, 'sitemap-summary.txt');
  const summary = `Sitemap Summary
Generated: ${new Date().toISOString()}
Total URLs: ${entries.length}

Breakdown:
- Homepage & Static Pages: 2
- Hospital Pages: ${getAllHospitals().length}
- Current City Pages: ${entries.filter(e => e.priority === 0.8 && e.url.includes('/salary/')).length - getAllHospitals().length}
- Programmatic SEO Pages: ${entries.length - 2 - getAllHospitals().length - (entries.filter(e => e.priority === 0.8 && e.url.includes('/salary/')).length - getAllHospitals().length)}

Programmatic SEO Strategy:
✓ State-level pages (15 states)
✓ State + Specialty pages (15 states × ${SPECIALTIES.length} specialties = ${15 * SPECIALTIES.length})
✓ City + Specialty pages (48 cities × ${SPECIALTIES.length} specialties = ${48 * SPECIALTIES.length})
✓ National specialty pages (${SPECIALTIES.length} specialties)

Total Potential Traffic Pages: ${entries.length}

Note: Programmatic pages will need route handlers implemented to handle
dynamic specialty filtering. Current implementation generates XML sitemap
for search engine discovery and future route implementation.
`;

  fs.writeFileSync(summaryPath, summary, 'utf-8');
  console.log(`   Summary: ${summaryPath}`);

  // Generate robots.txt
  const robotsPath = path.join(publicDir, 'robots.txt');
  const robotsTxt = `# robots.txt for Nurse Salary Intelligence
User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl delay (optional, be respectful to search engines)
Crawl-delay: 1
`;

  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
  console.log(`   Robots.txt: ${robotsPath}`);

  console.log(`\n🎯 Next Steps:`);
  console.log(`   1. Update BASE_URL in this script to your production domain`);
  console.log(`   2. Implement dynamic routes for specialty pages`);
  console.log(`   3. Submit sitemap.xml to Google Search Console`);
  console.log(`   4. Monitor search performance and adjust strategy\n`);
}

main();
