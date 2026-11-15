import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';
import { Header,Footer } from '@/components/chrome';
import { siteUrl,siteDescription } from '@/lib/site';
import './globals.css';
const sans=DM_Sans({subsets:['latin'],variable:'--font-sans',display:'swap'});
const serif=Cormorant_Garamond({subsets:['latin'],weight:['400','500'],style:['normal','italic'],variable:'--font-serif',display:'swap'});
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Najwa Handiz — Junior Web Developer',template:'%s | Najwa Handiz'},description:siteDescription,openGraph:{type:'website',locale:'en_US',siteName:'Najwa Handiz',title:'Najwa Handiz — Junior Web Developer',description:siteDescription,images:[{url:'/social-preview.png',width:1200,height:630,alt:'NH — Najwa Handiz, Junior Web Developer'}]},twitter:{card:'summary_large_image',images:['/social-preview.png']},icons:{icon:'/assets/nh-mark.png',apple:'/assets/nh-mark.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${serif.variable}`} id="top"><a href="#main" className="skip-link">Skip to content</a><Header/>{children}<Footer/></body></html>}
