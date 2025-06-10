
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background text-foreground shadow-md sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl md:text-4xl lg:text-[2.75rem] font-headline text-primary hover:text-accent transition-colors duration-200 tracking-tight leading-tight"
        >
          Global Gastronomy Guide
        </Link>
        <nav className="space-x-4">
          {/* Future navigation links can go here */}
          {/* Example:
          <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Explore
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          */}
        </nav>
      </div>
    </header>
  );
}
