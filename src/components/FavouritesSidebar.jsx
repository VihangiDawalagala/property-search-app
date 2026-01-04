// Sidebar component that displays user's saved favourite properties
import { Link } from "react-router-dom"
import { Heart, X, Trash2, Sparkles, Home } from "lucide-react"
import { getAllProperties, formatPrice } from "../lib/property-utils"
import { useRef, useEffect, useState } from "react"

export default function FavouritesSidebar({
  favouriteIds = [],
  onRemove,
  onClear,
  onDropAdd,
}) {
  // Gets all properties and filters to show only the ones user saved as favourites
  const all = getAllProperties()
  const favouriteProperties = all.filter((p) => favouriteIds.includes(p.id))
  const scrollContainerRef = useRef(null)
  const autoScrollIntervalRef = useRef(null)
  // Tracks which property images failed to load
  const [failedImages, setFailedImages] = useState(new Set())

  // Handles when user drags and drops a property card into favourites area
  const handleDropAdd = (e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    if (id) onDropAdd?.(id)
    stopAutoScroll()
  }

  // Handles when user drags a property to the remove area to delete it from favourites
  const handleDropRemove = (e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    if (id) onRemove?.(id)
    stopAutoScroll()
  }

  // Auto-scroll function when dragging near edges
  const startAutoScroll = (direction) => {
    // Stop any existing scroll first
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const scrollAmount = direction === 'down' ? 30 : -30
        const newScrollTop = scrollContainerRef.current.scrollTop + scrollAmount
        
        // Ensure we don't scroll beyond bounds
        const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight
        scrollContainerRef.current.scrollTop = Math.max(0, Math.min(newScrollTop, maxScroll))
      }
    }, 30) // Faster scroll interval
  }

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }
  }

  // Handles drag over the scrollable area with auto-scroll
  const handleDragOverScrollable = (e) => {
    e.preventDefault()
    checkAndAutoScroll(e)
  }

  // Check mouse position and trigger auto-scroll if near edges
  const checkAndAutoScroll = (e) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const rect = container.getBoundingClientRect()
    const mouseY = e.clientY
    const scrollThreshold = 120 // pixels from edge to trigger scroll

    const canScrollUp = container.scrollTop > 0
    const canScrollDown = container.scrollTop < (container.scrollHeight - container.clientHeight - 1)

    // Calculate distance from top and bottom
    const distanceFromTop = mouseY - rect.top
    const distanceFromBottom = rect.bottom - mouseY

    // Check if near top edge of scrollable container - scroll up
    if (distanceFromTop < scrollThreshold && canScrollUp) {
      startAutoScroll('up')
    }
    // Check if near bottom edge of scrollable container - scroll down to reveal remove area
    else if (distanceFromBottom < scrollThreshold && canScrollDown) {
      startAutoScroll('down')
    } 
    // Also check if mouse is in the lower half and we can scroll down - helps when dragging items
    else if (mouseY > rect.top + (rect.height / 2) && canScrollDown && distanceFromBottom < 200) {
      startAutoScroll('down')
    }
    // Or if mouse is in upper half and we can scroll up
    else if (mouseY < rect.top + (rect.height / 2) && canScrollUp && distanceFromTop < 200) {
      startAutoScroll('up')
    } else {
      stopAutoScroll()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll()
    }
  }, [])

  // Handles drag over the entire sidebar container - also checks for auto-scroll
  const handleSidebarDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Check if we should auto-scroll when dragging over the entire sidebar
    checkAndAutoScroll(e)
  }

  return (
    <div 
      className="rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/20 shadow-xl p-4 w-full backdrop-blur-sm flex flex-col h-full max-h-[calc(100vh-8rem)]"
      onDragOver={handleSidebarDragOver}
      onDragEnter={handleSidebarDragOver}
      onDragLeave={(e) => {
        // Only stop scroll if we're actually leaving the sidebar area
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX
        const y = e.clientY
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          stopAutoScroll()
        }
      }}
    >
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
            <Heart className="h-5 w-5 text-primary fill-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Favourites</h3>
            <p className="text-xs text-muted-foreground">
              {favouriteIds.length} {favouriteIds.length === 1 ? "property" : "properties"}
            </p>
          </div>
        </div>
        {favouriteIds.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors group"
            aria-label="Clear all favourites"
            title="Clear all"
          >
            <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* DROP TO ADD - Scrollable area */}
      <div
        ref={scrollContainerRef}
        className="rounded-xl border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 transition-all hover:border-primary/40 hover:from-primary/10 group/drop flex-1 min-h-0 overflow-y-auto"
        onDragOver={handleDragOverScrollable}
        onDragLeave={stopAutoScroll}
        onDrop={handleDropAdd}
      >
        {favouriteIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mb-4 group-hover/drop:scale-110 transition-transform">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No favourites yet</p>
            <p className="text-xs text-muted-foreground">
              Drag a property here or click the <Heart className="inline h-3 w-3 fill-destructive text-destructive" /> button
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {favouriteProperties.map((p) => (
              <li
                key={p.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", String(p.id))
                  e.dataTransfer.effectAllowed = "move"
                }}
                className="group/item relative flex gap-3 p-2.5 rounded-lg bg-background/80 hover:bg-background border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-move"
              >
                <Link
                  to={`/property/${p.id}`}
                  className="flex gap-3 flex-1 min-w-0"
                  draggable={false}
                >
                  <div className="relative flex-shrink-0">
                    {failedImages.has(p.id) || !p.images?.[0] ? (
                      <div className="h-16 w-20 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <Home className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    ) : (
                      <img
                        src={p.images[0]}
                        alt={p.shortDescription || "Property"}
                        className="h-16 w-20 rounded-lg object-cover shadow-sm group-hover/item:shadow-md transition-shadow"
                        draggable={false}
                        onError={() => setFailedImages((prev) => new Set([...prev, p.id]))}
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate group-hover/item:text-primary transition-colors">
                      {p.shortDescription || `${p.type} in ${p.location}`}
                    </p>
                    <p className="text-xs font-bold text-primary mt-0.5">
                      {formatPrice(p.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {p.bedrooms} bed{p.bedrooms !== 1 ? "s" : ""}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground truncate">{p.location}</span>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onRemove?.(p.id)
                  }}
                  className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all opacity-0 group-hover/item:opacity-100 group-hover/item:scale-110"
                  aria-label="Remove favourite"
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DROP TO REMOVE - Fixed at bottom */}
      {favouriteIds.length > 0 && (
        <div
          className="mt-4 rounded-lg border-2 border-dashed border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent p-3 text-center transition-all hover:border-destructive/40 hover:from-destructive/10 group/remove flex-shrink-0"
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // When dragging over remove area, scroll down if needed to keep it visible
            if (scrollContainerRef.current) {
              const container = scrollContainerRef.current
              const canScrollDown = container.scrollTop < (container.scrollHeight - container.clientHeight - 1)
              if (canScrollDown) {
                startAutoScroll('down')
              }
            }
          }}
          onDragLeave={() => stopAutoScroll()}
          onDrop={handleDropRemove}
        >
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground group-hover/remove:text-destructive transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
            <span className="font-medium">Drag here to remove</span>
          </div>
        </div>
      )}
    </div>
  )
}
