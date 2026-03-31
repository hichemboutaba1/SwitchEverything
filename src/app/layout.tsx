import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SwitchEverything — Free Universal File Converter Online",
    template: "%s | SwitchEverything",
  },
  description:
    "Convert images, documents and data files instantly — free, private, and 100% client-side. JPG/PNG to WebP, Text to PDF, CSV to JSON, JSON to Excel and more.",
  keywords: [
    "file converter",
    "online converter",
    "free converter",
    "jpg to webp",
    "png to webp",
    "text to pdf",
    "csv to json",
    "json to excel",
    "image converter",
    "document converter",
    "no upload converter",
    "client side converter",
  ],
  authors: [{ name: "SwitchEverything" }],
  creator: "SwitchEverything",
  publisher: "SwitchEverything",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "SwitchEverything",
    title: "SwitchEverything — Free Universal File Converter Online",
    description:
      "Convert images, documents and data files instantly. Free, private, and 100% client-side — your files never leave your device.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SwitchEverything Universal File Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwitchEverything — Free Universal File Converter",
    description:
      "Convert files instantly, for free. JPG/PNG↔WebP, Text→PDF, CSV→JSON, JSON→Excel. All client-side.",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SwitchEverything",
  url: BASE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free universal file converter. Convert images, documents, and data files entirely in your browser — no uploads, no accounts.",
  featureList: [
    "JPG to WebP conversion",
    "PNG to WebP conversion",
    "WebP to JPG conversion",
    "WebP to PNG conversion",
    "Text to PDF conversion",
    "CSV to JSON conversion",
    "JSON to Excel conversion",
  ],
  screenshot: `${BASE_URL}/og-image.png`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
