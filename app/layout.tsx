import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-ayane.vercel.app'),
  title: "Felix Dawodu - Full Stack Developer Portfolio",
  description: "Portfolio of Felix Dawodu, an innovative Full Stack Developer with expertise in React, Node.js, and cutting-edge web technologies.",
  authors: [{ name: "Felix Dawodu" }],
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "Web Development",
    "Software Engineering",
    "JavaScript",
    "TypeScript",
    "Next.js"
  ],
  openGraph: {
    title: "Felix Dawodu - Full Stack Developer",
    description: "Explore innovative web solutions and full-stack development projects",
    url: "https://portfolio-ayane.vercel.app",
    siteName: "Felix Dawodu Portfolio",
    images: [
      {
        url: "/images/portfolio-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Felix Dawodu - Portfolio Landing Page"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Dawodu - Full Stack Developer",
    description: "Innovative web solutions and full-stack development projects",
    images: ["/images/portfolio-og-image.jpg"]
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/favicon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/favicon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/favicon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/favicon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/favicon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/favicon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/favicon-180x180.png',
      }
    ]
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}