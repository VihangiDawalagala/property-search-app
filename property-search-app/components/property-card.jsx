"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, BedDouble, Heart, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatPrice, formatDate } from "@/lib/property-utils"
import { useState, useEffect } from "react"

export function PropertyCard({
  property,
  onDragStart,
  isDraggable = false,
  onFavouriteToggle,
  isFavourite: initialFavourite,
}) {
  const [isFavourite, setIsFavourite] = useState(initialFavourite || false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("favourites")
    if (saved) {
      try {
        const ids = JSON.parse(saved)
        setIsFavourite(ids.includes(property.id))
      } catch {
        // Ignore
      }
    }
  }, [property.id])

  useEffect(() => {
    if (initialFavourite !== undefined) {
      setIsFavourite(initialFavourite)
    }
  }, [initialFavourite])

  const handleFavouriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    //console.log("[v0] Toggle favourite for property:", property.id)

    const saved = localStorage.getItem("favourites")
    let ids = []

    if (saved) {
      try {
        ids = JSON.parse(saved)
      } catch {
        ids = []
      }
    }

    const newFavouriteState = !isFavourite

    if (newFavouriteState) {
      // Add to favourites
      if (!ids.includes(property.id)) {
        ids.push(property.id)
      }
    } else {
      // Remove from favourites
      ids = ids.filter((id) => id !== property.id)
    }

    localStorage.setItem("favourites", JSON.stringify(ids))
    window.dispatchEvent(new Event("favouritesUpdated"))

    setIsFavourite(newFavouriteState)
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-move group border-border/50"
      draggable={isDraggable}
      onDragStart={(e) => onDragStart?.(e, property)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link href={`/property/${property.id}`}>
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.shortDescription}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/95 backdrop-blur-md hover:bg-background shadow-lg border-0 transition-all duration-300 hover:scale-110"
          onClick={handleFavouriteClick}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isFavourite ? "fill-destructive text-destructive scale-110" : "text-muted-foreground"
            }`}
          />
        </Button>

        <Link href={`/property/${property.id}`}>
          <div
            className={`absolute inset-x-0 bottom-0 p-4 flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      <Link href={`/property/${property.id}`}>
        <CardContent className="p-5">
          <div className="mb-4">
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">{formatPrice(property.price)}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
              {property.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm text-muted-foreground pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                <BedDouble className="h-4 w-4" />
              </div>
              <span className="font-medium">
                {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="font-medium">{property.location}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">Listed {formatDate(property.dateAdded)}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
