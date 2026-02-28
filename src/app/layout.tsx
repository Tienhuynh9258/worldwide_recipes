import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Worldwide Recipes - Global Culinary Adventure',
    template: '%s | Worldwide Recipes'
  },
  description: 'Discover authentic recipes from around the world. Explore diverse cuisines, cooking techniques, and flavors from every corner of the globe. Your culinary adventure starts here!',
  keywords: ['recipes', 'cooking', 'world cuisine', 'international food', 'culinary', 'global recipes', 'authentic dishes', 'food culture'],
  authors: [{ name: 'Worldwide Recipes Team' }],
  creator: 'Worldwide Recipes',
  publisher: 'Worldwide Recipes',
  metadataBase: new URL('https://worldwide-recipes.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://worldwide-recipes.com',
    title: 'Worldwide Recipes - Global Culinary Adventure',
    description: 'Discover authentic recipes from around the world. Explore diverse cuisines, cooking techniques, and flavors from every corner of the globe.',
    siteName: 'Worldwide Recipes',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Worldwide Recipes - Global Culinary Adventure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Worldwide Recipes - Global Culinary Adventure',
    description: 'Discover authentic recipes from around the world. Your culinary adventure starts here!',
    creator: '@worldwiderecipes',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'food',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Optimized Font Loading */}
        {/* <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Dancing+Script:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" 
          rel="stylesheet" 
        /> */}
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme and Viewport */}
        <meta name="theme-color" content="#FF6B35" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background text-foreground">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all duration-200"
        >
          Skip to main content
        </a>
        
        <Header />
        
        <main 
          id="main-content" 
          className="flex-grow container mx-auto px-4 md:px-6 py-6 md:py-8"
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
        
        <Footer />
        <Toaster />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Worldwide Recipes',
              description: 'Discover authentic recipes from around the world',
              url: 'https://worldwide-recipes.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://worldwide-recipes.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Worldwide Recipes',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://worldwide-recipes.com/logo.png',
                },
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
