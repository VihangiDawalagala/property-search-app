// Component that automatically scrolls to top of page when route changes
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToTop() {
  // Gets the current page path to detect when user navigates
  const { pathname } = useLocation()

  // Scrolls to top whenever the page path changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // This component doesn't render anything visible
  return null
}

