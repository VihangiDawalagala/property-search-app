import Link from "next/link"
import { Home, Heart, Info, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-[rgb(189,176,153)] text-neutral-900 mt-20">



      <div className="container py-12 md:py-16 px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Britannia Homes.</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Discover exceptional properties across the UK with our expert guidance and
              comprehensive search tools.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2.5">
              <Link
                href="/"
                className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <Home className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                Home
              </Link>
              <Link
                href="/favorites"
                className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <Heart className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                Favorites
              </Link>
              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <Info className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                About
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
              >
                <Mail className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <address className="not-italic space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Property Street, City, State 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@propertyfinder.com" className="hover:text-white transition-colors">
                  info@propertyfinder.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+11234567890" className="hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </div>
            </address>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Business Hours</h4>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between gap-4">
                <span>Monday - Friday:</span>
                <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Saturday:</span>
                <span className="font-medium text-white">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Sunday:</span>
                <span className="font-medium text-white">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>&copy; 2025 Britannia Homes. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
