"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function ImageGallery({ images, alt }) {
  const [mainImage, setMainImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setMainImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  return (
    <>
      <div className="space-y-4 animate-fade-in">
        {/* Main Image */}
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted group cursor-pointer shadow-lg">
          <Image
            src={images[mainImage] || "/placeholder.svg"}
            alt={`${alt} - Image ${mainImage + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
            onClick={() => openLightbox(mainImage)}
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              onClick={prevImage}
              className="rounded-full bg-background/95 backdrop-blur-md hover:bg-background shadow-xl h-12 w-12 transition-transform hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={nextImage}
              className="rounded-full bg-background/95 backdrop-blur-md hover:bg-background shadow-xl h-12 w-12 transition-transform hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => openLightbox(mainImage)}
              className="rounded-full bg-background/95 backdrop-blur-md hover:bg-background shadow-lg h-10 w-10 transition-transform hover:scale-110"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <div className="bg-background/95 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {mainImage + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(index)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                mainImage === index
                  ? "border-primary shadow-lg scale-95 ring-2 ring-primary/20"
                  : "border-border/50 hover:border-primary/50 hover:scale-105 hover:shadow-md"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
              {mainImage === index && <div className="absolute inset-0 bg-primary/10" />}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-screen-xl h-[90vh] p-0 bg-black/98 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={images[lightboxIndex] || "/placeholder.svg"}
                alt={`${alt} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <Button
              variant="secondary"
              size="icon"
              onClick={prevLightboxImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-2xl h-14 w-14 transition-transform hover:scale-110"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={nextLightboxImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-2xl h-14 w-14 transition-transform hover:scale-110"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-2xl h-12 w-12 transition-transform hover:scale-110"
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold shadow-2xl">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
