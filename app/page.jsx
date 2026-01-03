"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import { PropertyCard } from "@/components/property-card"
import { searchProperties, getAllProperties } from "@/lib/property-utils"
import { Search } from "lucide-react"

export default function HomePage() {
  const [searchCriteria, setSearchCriteria] = useState({})
  const [properties, setProperties] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setProperties(getAllProperties())
  }, [])

  const handleSearch = (criteria) => {
    setIsSearching(true)
    setSearchCriteria(criteria)
    setTimeout(() => {
      const results = searchProperties(criteria)
      setProperties(results)
      setIsSearching(false)
    }, 300)
  }

  const isFavourite = (propertyId) => {
    const saved = localStorage.getItem("favourites")
    if (saved) {
      try {
        const favourites = JSON.parse(saved)
        return favourites.includes(propertyId)
      } catch {
        return false
      }
    }
    return false
  }

  return (
    <>
      <Header />
      <main className="container py-8 md:py-12">
        <div className="mb-12 text-center md:text-left md:pl-8 lg:pl-12 animate-fade-in-up">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance text-foreground">
            Find Your Dream Home
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl text-pretty">
            Discover thousands of exceptional properties across the UK with our advanced search tools
          </p>
        </div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-6 lg:gap-8">
          <aside className="lg:sticky lg:top-24 h-fit animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <SearchForm onSearch={handleSearch} />
          </aside>

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
              <div className="grid sm:grid-cols-2 gap-6">
                {properties.map((property, index) => (
                  <div key={property.id} className="property-card-enter">
                    <PropertyCard property={property} isFavourite={isFavourite(property.id)} isDraggable={false} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
