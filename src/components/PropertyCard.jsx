// Card component that displays a single property with image, price, and details
import { Link } from "react-router-dom"
import { MapPin, BedDouble, Heart, ArrowRight, GripVertical, Home } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { formatPrice, formatDate } from "../lib/property-utils"
import { useState } from "react"

export function PropertyCard({
  property,
  isDraggable = false,
  isFavourite,
  onToggleFavourite,
}) {
  // Allows user to drag property card to favourites sidebar
  const handleDragStart = (e) => {
    if (!isDraggable) return
    e.dataTransfer.setData("text/plain", String(property.id))
    e.dataTransfer.effectAllowed = "move"
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group border-border/50"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden bg-muted"
        draggable={isDraggable}
        onDragStart={handleDragStart}
      >
        {/* Drag handle */}
        {isDraggable && (
          <div
            className="absolute top-4 left-4 z-20 flex items-center gap-1 rounded-full bg-background/95 px-3 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur-md"
            draggable={true}
            onDragStart={handleDragStart}
            title="Drag to favourites"
          >
            <GripVertical className="h-4 w-4" />
            Drag
          </div>
        )}

        <Link to={`/property/${property.id}`} draggable={false}>
          {property.images?.[0] && (
            <img
              draggable={false}
              src={property.images[0]}
              alt={property.shortDescription}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-background/95 backdrop-blur-md hover:bg-background shadow-lg border-0 transition-all duration-300 hover:scale-110"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleFavourite?.()
          }}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isFavourite ? "fill-destructive text-destructive scale-110" : "text-muted-foreground"
            }`}
          />
        </Button>

        <Link to={`/property/${property.id}`} draggable={false}>
          <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 opacity-0 group-hover:opacity-100">
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      <Link to={`/property/${property.id}`} draggable={false}>
        <CardContent className="p-5">
          <div className="mb-4">
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">
              {formatPrice(property.price)}
            </h3>
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
            <p className="text-xs text-muted-foreground">
              Listed {formatDate(property.dateAdded)}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}


