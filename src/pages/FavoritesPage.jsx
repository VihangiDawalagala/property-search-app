// Favorites page that shows all properties user has saved as favourites
import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { PropertyCard } from "../components/PropertyCard"
import { getAllProperties } from "../lib/property-utils"
import { Button } from "../components/ui/button"
import { Trash2, X } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function FavoritesPage() {
  // Stores list of favourite properties and loading state
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Loads favourites when page opens and listens for changes from other pages
  useEffect(() => {
    loadFavourites()

    // Updates favourites if changed in another browser tab
    const handleStorageChange = (e) => {
      if (e.key === "favourites") {
        loadFavourites()
      }
    }

    // Updates favourites when changed on same page
    const handleFavouritesUpdate = () => {
      loadFavourites()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("favouritesUpdated", handleFavouritesUpdate)

    // Removes event listeners when page is closed
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favouritesUpdated", handleFavouritesUpdate)
    }
  }, [])

  // Loads favourite property IDs from storage and finds full property details
  const loadFavourites = () => {
    const saved = localStorage.getItem("favourites")

    if (saved) {
      try {
        const ids = JSON.parse(saved)
        const allProps = getAllProperties()
        const savedFavs = ids
          .map((id) => allProps.find((p) => p.id === id))
          .filter(Boolean)

        setFavourites(savedFavs)
      } catch (error) {
        console.error("Error loading favourites:", error)
        setFavourites([])
      }
    } else {
      setFavourites([])
    }

    setIsLoading(false)
  }

  // Removes a single property from favourites
  const toggleFavourite = (propertyId) => {
    const updatedFavs = favourites.filter((f) => f.id !== propertyId)
    setFavourites(updatedFavs)
    localStorage.setItem("favourites", JSON.stringify(updatedFavs.map((f) => f.id)))
    window.dispatchEvent(new Event("favouritesUpdated"))
    toast({
      title: "Removed from favourites",
      description: "Property removed from your favourites",
    })
  }

  // Clears all favourites from the list
  const clearAllFavourites = () => {
    setFavourites([])
    localStorage.setItem("favourites", JSON.stringify([]))
    window.dispatchEvent(new Event("favouritesUpdated"))
    toast({
      title: "All favourites cleared",
      description: "All properties have been removed from your favourites",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 container py-20">
          <div className="text-center">
            <div
              className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 container py-12 md:py-16 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">Favorites</h1>
          {favourites.length > 0 && (
            <Button
              onClick={clearAllFavourites}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {favourites.length === 0 ? (
          <p className="text-gray-700 text-lg">You haven't added any properties to your favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {favourites.map((property) => (
              <div key={property.id} className="relative group">
                <PropertyCard
                  property={property}
                  isFavourite={true}
                  isDraggable={false}
                  onToggleFavourite={() => toggleFavourite(property.id)}
                />
                {/* Remove button for individual property */}
                <Button
                  onClick={() => toggleFavourite(property.id)}
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4 z-30 h-9 w-9 rounded-full bg-destructive/90 hover:bg-destructive shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Remove from favourites"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
