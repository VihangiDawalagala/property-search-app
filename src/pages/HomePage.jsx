// Main home page that shows property search form and list of properties
import { useState, useEffect, useRef } from "react"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { SearchForm } from "../components/SearchForm.jsx"
import { PropertyCard } from "../components/PropertyCard.jsx"
import FavouritesSidebar from "../components/FavouritesSidebar.jsx"
import { searchProperties, getAllProperties } from "../lib/property-utils"
import { Search } from "lucide-react"

export default function HomePage() {
  // State to store property list, search status, and user's favourite properties
  const [properties, setProperties] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [favouriteIds, setFavouriteIds] = useState([])
  const pageScrollIntervalRef = useRef(null)

  // Loads all properties when page first loads
  useEffect(() => {
    setProperties(getAllProperties())
  }, [])

  // Loads user's saved favourites from browser storage when page loads
  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("favourites")
    try {
      const parsed = saved ? JSON.parse(saved) : []
      setFavouriteIds(Array.isArray(parsed) ? parsed : [])
    } catch {
      setFavouriteIds([])
    }
  }, [])

  // Saves favourites list to browser storage so it persists between page visits
  const saveFavourites = (ids) => {
    setFavouriteIds(ids)
    if (typeof window !== "undefined") {
      localStorage.setItem("favourites", JSON.stringify(ids))
    }
  }

  // Checks if a property is already in user's favourites
  const isFavourite = (propertyId) => favouriteIds.includes(propertyId)

  // Adds or removes a property from favourites when user clicks heart button
  const toggleFavourite = (propertyId) => {
    const updated = isFavourite(propertyId)
      ? favouriteIds.filter((id) => id !== propertyId)
      : [...favouriteIds, propertyId]

    saveFavourites(updated)
  }

  // Removes a specific property from favourites list
  const removeFavourite = (propertyId) => {
    const updated = favouriteIds.filter((id) => id !== propertyId)
    saveFavourites(updated)
  }

  // Clears all properties from favourites list
  const clearFavourites = () => {
    saveFavourites([])
  }

  // Filters properties based on search criteria user entered
  const handleSearch = (criteria) => {
    setIsSearching(true)
    setTimeout(() => {
      const results = searchProperties(criteria)
      setProperties(results)
      setIsSearching(false)
    }, 300)
  }

  // Page-level auto-scroll when dragging near top of viewport
  useEffect(() => {
    let isDragging = false

    const startPageScroll = () => {
      if (pageScrollIntervalRef.current) return
      
      pageScrollIntervalRef.current = setInterval(() => {
        if (window.scrollY > 0) {
          window.scrollBy({ top: -50, behavior: 'auto' })
        } else {
          stopPageScroll()
        }
      }, 30)
    }

    const stopPageScroll = () => {
      if (pageScrollIntervalRef.current) {
        clearInterval(pageScrollIntervalRef.current)
        pageScrollIntervalRef.current = null
      }
    }

    const handleGlobalDragStart = () => {
      isDragging = true
    }

    const handleGlobalDragOver = (e) => {
      if (!isDragging) return
      
      // Check if near top of viewport
      const scrollThreshold = 200 // pixels from top to trigger scroll
      const mouseY = e.clientY

      if (mouseY < scrollThreshold && window.scrollY > 0) {
        startPageScroll()
      } else {
        stopPageScroll()
      }
    }

    const handleGlobalDragEnd = () => {
      isDragging = false
      stopPageScroll()
    }

    // Add global drag listner
    document.addEventListener('dragstart', handleGlobalDragStart)
    document.addEventListener('dragover', handleGlobalDragOver)
    document.addEventListener('dragend', handleGlobalDragEnd)
    document.addEventListener('drop', handleGlobalDragEnd)

    return () => {
      stopPageScroll()
      document.removeEventListener('dragstart', handleGlobalDragStart)
      document.removeEventListener('dragover', handleGlobalDragOver)
      document.removeEventListener('dragend', handleGlobalDragEnd)
      document.removeEventListener('drop', handleGlobalDragEnd)
    }
  }, [])

  return (
    <>
      <Header />
      <main className="w-full py-8 md:py-12 overflow-x-hidden">
        {/* Hero */}
        <div className="mb-12 text-center md:text-left md:pl-8 lg:pl-12 animate-fade-in-up">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance text-foreground">
            Find Your Dream Home
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl text-pretty">
            Discover thousands of exceptional properties across the UK with our advanced search tools
          </p>
        </div>

        {/* Main 2-column layout: SearchForm (left) + Content (right) */}
        <div className="grid lg:grid-cols-[230px_1fr] gap-4 lg:gap-8">
          {/* LEFT: Search form */}
          <aside className="lg:sticky lg:top-24 h-fit animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <SearchForm onSearch={handleSearch} />
          </aside>

          {/* RIGHT: split into Results + Favourites sidebar */}
          <div className="grid gap-6 lg:grid-cols-[1fr_240px]  ">
            {/* RESULTS */}
            <div className="min-h-96 min-w-0">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  {isSearching ? (
                    <span className="animate-pulse">Searching...</span>
                  ) : (
                    <>
                      {properties.length} {properties.length === 1 ? "Property" : "Properties"}
                    </>
                  )}
                </h2>
                {properties.length > 0 && (
                  <p className="text-sm text-muted-foreground hidden md:block">Showing all results</p>
                )}
              </div>

              {properties.length === 0 && !isSearching ? (
                <div className="text-center py-20 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search criteria to find more results</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-6">
                  {properties.map((property) => (
                    <div key={property.id} className="property-card-enter">
                      <PropertyCard
                        property={property}
                        isFavourite={isFavourite(property.id)}
                        isDraggable={true}
                        onToggleFavourite={() => toggleFavourite(property.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FAVOURITES SIDEBAR */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <FavouritesSidebar
                favouriteIds={favouriteIds}
                onRemove={removeFavourite}
                onClear={clearFavourites}
                onDropAdd={(id) => {
                  // prevent duplicates
                  if (!favouriteIds.includes(id)) saveFavourites([...favouriteIds, id])
                }}
              />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
