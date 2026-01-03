"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Heart, MapPin, BedDouble, HomeIcon, Share2, Phone, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/image-gallery"
import { GoogleMap } from "@/components/google-map"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPropertyById, formatPrice, formatDate } from "@/lib/property-utils"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function PropertyPage({ params }) {
  const { id } = use(params)
  const property = getPropertyById(id)
  const [isFavourite, setIsFavourite] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("favourites")
    if (saved) {
      try {
        const ids = JSON.parse(saved)
        setIsFavourite(ids.includes(id))
      } catch {
        // Ignore
      }
    }
  }, [id])

  if (!property) {
    notFound()
  }

  const toggleFavourite = () => {
    const saved = localStorage.getItem("favourites")
    let ids = []
    if (saved) {
      try {
        ids = JSON.parse(saved)
      } catch {
        // Ignore
      }
    }

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

    localStorage.setItem("favourites", JSON.stringify(ids))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.shortDescription,
          text: `Check out this property: ${formatPrice(property.price)} in ${property.location}`,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Property link copied to clipboard",
      })
    }
  }

  return (
    <>
      <Header />
      <main className="container py-8 md:py-12 px-6 md:px-8 lg:px-12">
        <div className="mb-8 animate-fade-in">
          <Link
            href="/"
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
                      <Image
                        src={property.floorPlan || "/placeholder.svg"}
                        alt="Floor plan"
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 800px"
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
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full h-12 bg-transparent font-semibold hover:bg-muted transition-all hover:scale-[1.02]"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Share Property
                  </Button>
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
