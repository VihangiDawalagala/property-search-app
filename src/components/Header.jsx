// Header component with navigation menu that stays at top of page
import { Link } from "react-router-dom"

export function Header() {
  return (
    // Sticky header that stays visible when scrolling down the page
    <header className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "rgb(130, 62, 71)" }}>
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Brand/Logo - Clicking this takes user back to home page */}
        <Link to="/" className="flex items-center group">
          <span className="font-serif text-3xl font-bold text-white tracking-tight transition-opacity duration-300 hover:opacity-80">
            Britannia Homes.
          </span>
        </Link>

        {/* Navigation Links - Menu items to navigate between pages */}
        <nav className="flex items-center gap-10">
          <Link
            to="/"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            Favorites
          </Link>
          <Link
            to="/about"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}


