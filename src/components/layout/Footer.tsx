export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Global Gastronomy Guide. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Discover culinary delights from around the world.
        </p>
      </div>
    </footer>
  );
}
