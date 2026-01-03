"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { getAllProperties } from "@/lib/property-utils"

export default function FavoritesPage() {
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFavourites()

    const handleStorageChange = (e) => {
      if (e.key === "favourites") {
        loadFavourites()
      }
    }

    const handleFavouritesUpdate = () => {
      loadFavourites()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("favouritesUpdated", handleFavouritesUpdate)

    const interval = setInterval(() => {
      if (!document.hidden) {
        loadFavourites()
      }
    }, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favouritesUpdated", handleFavouritesUpdate)
      clearInterval(interval)
    }
  }, [])

  const loadFavourites = () => {
    const saved = localStorage.getItem("favourites")

    if (saved) {
      try {
        const ids = JSON.parse(saved)
        const allProps = getAllProperties()
        const savedFavs = ids.map((id) => allProps.find((p) => p.id === id)).filter(Boolean)
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

  const toggleFavourite = (property) => {
    const updatedFavs = favourites.filter((f) => f.id !== property.id)
    setFavourites(updatedFavs)
    localStorage.setItem("favourites", JSON.stringify(updatedFavs.map((f) => f.id)))
    window.dispatchEvent(new Event("favouritesUpdated"))
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 font-serif">Favorites</h1>

        {favourites.length === 0 ? (
          <p className="text-gray-700 text-lg">You haven't added any properties to your favorites yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {favourites.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavouriteToggle={toggleFavourite}
                isFavourite={true}
                isDraggable={false}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
