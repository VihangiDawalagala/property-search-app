"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import { PropertyCard } from "@/components/property-card"
import FavouritesSidebar from "@/components/ui/favourites-sidebar"

import { searchProperties, getAllProperties } from "@/lib/property-utils"
import { Search } from "lucide-react"

export default function HomePage() {
  const [searchCriteria, setSearchCriteria] = useState({})
  const [properties, setProperties] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // ✅ favourites in React state (so UI updates without refresh)
  const [favouriteIds, setFavouriteIds] = useState([])

  // Load properties initially
  useEffect(() => {
    setProperties(getAllProperties())
  }, [])

  // Load favourites initially
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

  const saveFavourites = (ids) => {
    setFavouriteIds(ids)
    if (typeof window !== "undefined") {
      localStorage.setItem("favourites", JSON.stringify(ids))
    }
  }

  const isFavourite = (propertyId) => favouriteIds.includes(propertyId)

  const toggleFavourite = (propertyId) => {
    const updated = isFavourite(propertyId)
      ? favouriteIds.filter((id) => id !== propertyId)
      : [...favouriteIds, propertyId]

    saveFavourites(updated)
  }

  const removeFavourite = (propertyId) => {
    const updated = favouriteIds.filter((id) => id !== propertyId)
    saveFavourites(updated)
  }

  const clearFavourites = () => {
    saveFavourites([])
  }

  const handleSearch = (criteria) => {
    setIsSearching(true)
    setSearchCriteria(criteria)
    setTimeout(() => {
      const results = searchProperties(criteria)
      setProperties(results)
      setIsSearching(false)
    }, 300)
  }

  return (
    <>
      <Header />

      <main className="container py-8 md:py-12">
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
        <div className="grid lg:grid-cols-[250px_1fr] gap-6 lg:gap-8">
          {/* LEFT: Search form */}
          <aside className="lg:sticky lg:top-24 h-fit animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <SearchForm onSearch={handleSearch} />
          </aside>

          {/* RIGHT: split into Results + Favourites sidebar */}
          <div className="grid gap-6 lg:grid-cols-[1fr_170px]">
            {/* RESULTS */}
            <div className="min-h-96">
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
            <aside className="lg:sticky lg:top-24 h-fit lg:ml-auto">
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
