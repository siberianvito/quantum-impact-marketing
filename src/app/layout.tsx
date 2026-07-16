import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
});

const SITE_URL = "https://quantumimpactmarketing.com"; // TODO: replace with live domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Quantum Impact Marketing — AI Business Systems | Systems Scale. Chaos Doesn't.",
  description:
    "Quantum Impact Marketing engineers AI-powered business systems: lead generation, custom CRM, automation, and AI employees fused into one intelligent operating system for scale. South Florida · Washington D.C. · Nationwide.",
  keywords: [
    "AI business systems",
    "AI automation",
    "CRM development",
    "AI voice agents",
    "lead generation",
    "business automation",
    "marketing infrastructure",
    "South Florida",
    "Washington DC",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Quantum Impact Marketing",
    title: "Quantum Impact Marketing — AI Business Systems",
    description:
      "We don't sell marketing. We build the intelligent operating system your business runs on. Systems Scale. Chaos Doesn't.",
    images: [{ url: "/media/og-core.png", width: 1856, height: 1056, alt: "The Quantum Core — Quantum Impact Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Impact Marketing — AI Business Systems",
    description:
      "We don't sell marketing. We build the intelligent operating system your business runs on.",
    images: ["/media/og-core.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#040505",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Quantum Impact Marketing",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  slogan: "Systems Scale. Chaos Doesn't.",
  description:
    "AI business systems company engineering lead generation, CRM, automation, and AI employees into one scalable business operating system.",
  founder: { "@type": "Person", name: "Gustavo Siverio" },
  areaServed: ["South Florida", "Florida", "Washington, D.C.", "United States"],
  knowsAbout: [
    "AI Automation",
    "Google Ads",
    "SEO",
    "CRM Systems",
    "AI Voice Agents",
    "AI Chatbots",
    "SMS & Email Automation",
    "Funnel Building",
    "Landing Pages",
    "Reputation Management",
    "Content Creation",
    "Social Media",
    "Business Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${robotoMono.variable} antialiased`}
    >
      <body data-custom-cursor="on">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
