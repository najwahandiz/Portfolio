export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')).replace(/\/$/, '');
export const siteDescription = 'Najwa Handiz, junior web developer in Casablanca. Responsive brand websites, conversion dashboards, and thoughtful AI-assisted experiences.';
