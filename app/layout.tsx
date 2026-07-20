import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { Navbar } from "@/components/ui/Navbar";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0C0E",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-ayane.vercel.app'),
  title: "Felix Dawodu — Full-Stack & Systems Engineer",
  description: "Felix Dawodu builds the whole stack — polished interfaces down to bare metal. Full-stack engineering, AI infrastructure, and hardware from Lagos, Nigeria.",
  authors: [{ name: "Felix Dawodu" }],
  keywords: [
    "Full Stack Developer",
    "Systems Engineer",
    "AI Infrastructure",
    "React",
    "Node.js",
    "Web Development",
    "Software Engineering",
    "TypeScript",
    "Next.js"
  ],
  openGraph: {
    title: "Felix Dawodu — Full-Stack & Systems Engineer",
    description: "The whole stack: glass to copper. Interfaces, AI infrastructure, and hardware.",
    url: "https://portfolio-ayane.vercel.app",
    siteName: "Felix Dawodu Portfolio",
    images: [
      {
        url: "/images/portfolio-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Felix Dawodu — Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Dawodu — Full-Stack & Systems Engineer",
    description: "The whole stack: glass to copper.",
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
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${jetbrainsMono.variable} ${archivo.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
