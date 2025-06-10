
export default function Footer() {
  return (
    <footer className="bg-muted/50 text-muted-foreground py-8 mt-auto border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm mb-1">
          &copy; {new Date().getFullYear()} Global Gastronomy Guide. All rights reserved.
        </p>
        <p className="text-xs">
          Crafted with passion for culinary exploration.
        </p>
      </div>
    </footer>
  );
}
