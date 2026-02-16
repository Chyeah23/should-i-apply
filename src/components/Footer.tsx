import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-amber-200/50 bg-amber-50/50 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-charcoal text-lg">Jason</h3>
            <p className="text-warm-gray text-sm mt-2">
              Helping AI teams ship better products.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-charcoal text-sm mb-3">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link href="/blog" className="text-warm-gray hover:text-charcoal text-sm transition-colors">Blog</Link>
              <Link href="/resources" className="text-warm-gray hover:text-charcoal text-sm transition-colors">Resources</Link>
              <Link href="/portfolio" className="text-warm-gray hover:text-charcoal text-sm transition-colors">Portfolio</Link>
              <Link href="/about" className="text-warm-gray hover:text-charcoal text-sm transition-colors">About</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-charcoal text-sm mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-charcoal text-sm transition-colors">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-charcoal text-sm transition-colors">Twitter / X</a>
              <Link href="/contact" className="text-warm-gray hover:text-charcoal text-sm transition-colors">Get in touch</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-200/50 mt-8 pt-8 text-center text-warm-gray text-xs">
          &copy; {new Date().getFullYear()} Jason. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
