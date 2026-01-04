// Property detail page that shows full information about a single property
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { ArrowLeft, Heart, MapPin, BedDouble, HomeIcon, Share2, Phone, Mail, Facebook, Instagram, Link as LinkIcon } from "lucide-react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ImageGallery } from "../components/ImageGallery"
import { GoogleMap } from "../components/GoogleMap"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { getPropertyById, formatPrice, formatDate } from "../lib/property-utils"
import { useToast } from "../hooks/use-toast"

export default function PropertyPage() {
  // Gets the property ID from the URL
  const { id } = useParams()
  // Finds the property data using the ID from URL
  const property = getPropertyById(id)
  // Tracks whether this property is saved in user's favourites
  const [isFavourite, setIsFavourite] = useState(false)
  // Used to show notification messages to the user
  const { toast } = useToast()

  // Checks if property is in favourites when page loads
  useEffect(() => {
    const saved = localStorage.getItem("favourites")
    if (saved) {
      try {
        const ids = JSON.parse(saved)
        setIsFavourite(ids.includes(id))
      } catch {
        // Error parsing favourites
      }
    }
  }, [id])

  // Shows error message if property doesn't exist
  if (!property) {
    return (
      <>
        <Header />
        <main className="container py-8 md:py-12 px-6 md:px-8 lg:px-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Link to="/" className="text-primary hover:underline">
              Return to search
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Adds or removes property from user's favourites list
  const toggleFavourite = () => {
    const saved = localStorage.getItem("favourites")
    let ids = []
    if (saved) {
      try {
        ids = JSON.parse(saved)
      } catch {
        // Error parsing favourites
      }
    }

    // Removes property from favourites if already saved, otherwise adds it
    if (isFavourite) {
      ids = ids.filter((favId) => favId !== id)
      setIsFavourite(false)
      toast({
        title: "Removed from favourites",
        description: "Property removed from your favourites",
      })
    } else {
      ids.push(id)
      setIsFavourite(true)
      toast({
        title: "Added to favourites",
        description: property.shortDescription,
      })
    }

    // Saves updated favourites list to browser storage
    localStorage.setItem("favourites", JSON.stringify(ids))
  }

  // Gets the current page URL to share
  const shareUrl = window.location.href

  // Opens Facebook share dialog in a new window
  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
    toast({
      title: "Opening Facebook",
      description: "Share this property on Facebook",
    })
  }

  // Copies link to clipboard and opens Instagram website
  const handleShareInstagram = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link copied",
      description: "Link copied! Open Instagram and paste it in your post.",
    })
    window.open("https://www.instagram.com/", "_blank")
  }

  // Copies the property page URL to user's clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Link copied",
        description: "Property link copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Header />
      <main className="container py-8 md:py-12 px-6 md:px-8 lg:px-12">
        <div className="mb-8 animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to search results
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-10">
          <div className="space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={property.images} alt={property.shortDescription} />

            {/* Property Details Tabs */}
            <Card className="border-border/50 shadow-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="pt-6">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50">
                    <TabsTrigger value="description" className="font-semibold">
                      Description
                    </TabsTrigger>
                    <TabsTrigger value="floorplan" className="font-semibold">
                      Floor Plan
                    </TabsTrigger>
                    <TabsTrigger value="map" className="font-semibold">
                      Map
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-6 pt-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-foreground">Property Description</h3>
                      <p className="text-muted-foreground leading-relaxed text-base">{property.longDescription}</p>
                    </div>
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold mb-4 text-foreground">Key Features</h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <BedDouble className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">
                            {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}
                          </span>
                        </li>
                        <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <HomeIcon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{property.type === "house" ? "House" : "Flat"}</span>
                        </li>
                        <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">
                            {property.location}, {property.postcode}
                          </span>
                        </li>
                        <li className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <span className="font-medium">Added {formatDate(property.dateAdded)}</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="floorplan" className="pt-6">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted shadow-inner">
                      <img
                        src={property.floorPlan || "/placeholder.svg"}
                        alt="Floor plan"
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="map" className="pt-6">
                    <GoogleMap
                      latitude={property.latitude}
                      longitude={property.longitude}
                      location={property.location}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24 h-fit space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* Property Summary */}
            <Card className="border-border/50 shadow-xl">
              <CardContent className="pt-8 space-y-6">
                <div>
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground font-medium">
                      Listed {formatDate(property.dateAdded)}
                    </span>
                  </div>
                  <h1 className="font-serif text-4xl font-bold text-primary mb-3">{formatPrice(property.price)}</h1>
                  <p className="text-muted-foreground text-base leading-relaxed">{property.shortDescription}</p>
                </div>

                <div className="flex items-center gap-6 py-5 border-y border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <BedDouble className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                      <p className="font-bold text-foreground">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <MapPin className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-bold text-foreground">{property.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={toggleFavourite}
                    className="w-full h-12 font-semibold shadow-lg transition-all hover:scale-[1.02]"
                    variant={isFavourite ? "secondary" : "default"}
                  >
                    <Heart className={`mr-2 h-5 w-5 ${isFavourite ? "fill-current" : ""}`} />
                    {isFavourite ? "Saved to Favourites" : "Save to Favourites"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 font-semibold hover:from-primary/10 hover:to-primary/15 hover:border-primary/30 hover:shadow-lg transition-all hover:scale-[1.02] group"
                      >
                        <Share2 className="mr-2 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        Share Property
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-border/50">
                      <DropdownMenuItem 
                        onClick={handleShareFacebook} 
                        className="cursor-pointer rounded-lg p-3 mb-1 hover:bg-[#1877F2]/10 focus:bg-[#1877F2]/10 transition-all group/item"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1877F2]/10 group-hover/item:bg-[#1877F2]/20 transition-colors">
                            <Facebook className="h-5 w-5 text-[#1877F2]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">Share on Facebook</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={handleShareInstagram} 
                        className="cursor-pointer rounded-lg p-3 mb-1 hover:bg-gradient-to-r hover:from-[#E4405F]/10 hover:to-[#FCAF45]/10 focus:bg-gradient-to-r focus:from-[#E4405F]/10 focus:to-[#FCAF45]/10 transition-all group/item"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#E4405F]/20 to-[#FCAF45]/20 group-hover/item:from-[#E4405F]/30 group-hover/item:to-[#FCAF45]/30 transition-colors">
                            <Instagram className="h-5 w-5 text-[#E4405F]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">Share on Instagram</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={handleCopyLink} 
                        className="cursor-pointer rounded-lg p-3 hover:bg-primary/10 focus:bg-primary/10 transition-all group/item"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                            <LinkIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">Copy Link</p>
                            <p className="text-xs text-muted-foreground">Copy to clipboard</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-bold text-lg text-foreground">Contact Agent</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:02012345678"
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-semibold text-foreground">020 1234 5678</p>
                      </div>
                    </a>
                    <a
                      href="mailto:info@homefind.com"
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">info@homefind.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
