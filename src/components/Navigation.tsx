import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-warm-bg/80 backdrop-blur-md border-b border-amber-200/50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center">
        <Link href="/" className="text-xl font-bold text-charcoal hover:text-amber-600 transition-colors">
          Should I Apply?
        </Link>
      </div>
    </nav>
  );
}
