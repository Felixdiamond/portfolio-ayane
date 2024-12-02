import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
        url: "/images/portfolio-og-image.png",
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
    title: "Felix Dowodu - Full Stack Developer",
    description: "Innovative web solutions and full-stack development projects",
    images: ["/images/portfolio-og-image.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
