import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="text-3xl font-headline hover:opacity-80 transition-opacity">
          Global Gastronomy Guide
        </Link>
      </div>
    </header>
  );
}
