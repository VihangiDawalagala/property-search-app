import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "rgb(130, 62, 71)" }}>
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center group">
          <span className="font-serif text-3xl font-bold text-white tracking-tight transition-opacity duration-300 hover:opacity-80">
            Britannia Homes.
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-10">
          <Link
            href="/"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            Favorites
          </Link>
          <Link
            href="/about"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
