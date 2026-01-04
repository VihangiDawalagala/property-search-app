// Component that displays Google Maps showing the property location
import { MapPin } from "lucide-react"

export function GoogleMap({ latitude, longitude, location }) {
  return (
    <div className="space-y-4">
      {/* Embedded Google Maps iframe showing property location on map */}
      <div className="aspect-video rounded-xl overflow-hidden bg-muted shadow-inner border border-border/50">
        <iframe
          title={`Map of ${location}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
        />
      </div>

      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{location}</p>
          <p className="text-xs text-muted-foreground">
            Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  )
}
// test commits