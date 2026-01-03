"use client"

import Link from "next/link"
import { getAllProperties } from "@/lib/property-utils"

export default function FavouritesSidebar({
  favouriteIds = [],
  onRemove,
  onClear,
  onDropAdd,
}) {
  const all = getAllProperties()
  const favouriteProperties = all.filter((p) => favouriteIds.includes(p.id))

  const handleDropAdd = (e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain") // ✅ FIXED KEY
    if (id) onDropAdd?.(id)
  }

  const handleDropRemove = (e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain") // ✅ FIXED KEY
    if (id) onRemove?.(id)
  }

  return (
    <div className="rounded-xl border bg-background p-3 max-w-[240px]">
      {/* DROP TO ADD */}
      <div
        className="rounded-lg border border-dashed p-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropAdd}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Favourites ({favouriteIds.length})</h3>

          <button
            onClick={onClear}
            disabled={favouriteIds.length === 0}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Clear all
          </button>
        </div>

        {favouriteIds.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Drag a property here or press the ❤️ button.
          </p>
        ) : (
          <ul className="space-y-3">
            {favouriteProperties.map((p) => (
              <li key={p.id} className="flex gap-3">
                <img
                  src={p.images?.[0]}
                  alt={p.title || "Property"}
                  className="h-12 w-14 rounded-md object-cover"
                  draggable={false}
                />

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/property/${p.id}`}
                    className="block truncate font-medium hover:underline"
                    draggable={false}
                  >
                    {p.title || `${p.type} in ${p.location}`}
                  </Link>
                  <p className="text-sm text-muted-foreground truncate">{p.price}</p>
                </div>

                <button
                  onClick={() => onRemove?.(p.id)}
                  className="rounded-md border px-2 py-1 text-sm"
                  aria-label="Remove favourite"
                  title="Remove"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DROP TO REMOVE */}
      <div
        className="mt-4 rounded-lg border border-dashed p-3 text-center text-sm text-muted-foreground"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropRemove}
      >
        Drag here to remove
      </div>
    </div>
  )
}
