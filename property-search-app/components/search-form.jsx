"use client"

import { useState } from "react"
import { CalendarIcon, Search, X, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function SearchForm({ onSearch }) {
  const [type, setType] = useState("any")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000000)
  const [minBedrooms, setMinBedrooms] = useState(0)
  const [maxBedrooms, setMaxBedrooms] = useState(6)
  const [dateMode, setDateMode] = useState("after")
  const [dateAfter, setDateAfter] = useState()
  const [dateBetweenStart, setDateBetweenStart] = useState()
  const [dateBetweenEnd, setDateBetweenEnd] = useState()
  const [postcodeArea, setPostcodeArea] = useState("")

  const handleSearch = () => {
    const criteria = {
      type: type === "any" ? undefined : type,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < 1000000 ? maxPrice : undefined,
      minBedrooms: minBedrooms > 0 ? minBedrooms : undefined,
      maxBedrooms: maxBedrooms < 6 ? maxBedrooms : undefined,
      dateAfter: dateMode === "after" && dateAfter ? format(dateAfter, "yyyy-MM-dd") : undefined,
      dateBetweenStart: dateMode === "between" && dateBetweenStart ? format(dateBetweenStart, "yyyy-MM-dd") : undefined,
      dateBetweenEnd: dateMode === "between" && dateBetweenEnd ? format(dateBetweenEnd, "yyyy-MM-dd") : undefined,
      postcodeArea: postcodeArea.trim() || undefined,
    }
    onSearch(criteria)
  }

  const handleReset = () => {
    setType("any")
    setMinPrice(0)
    setMaxPrice(1000000)
    setMinBedrooms(0)
    setMaxBedrooms(6)
    setDateMode("after")
    setDateAfter(undefined)
    setDateBetweenStart(undefined)
    setDateBetweenEnd(undefined)
    setPostcodeArea("")
    onSearch({})
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Type */}
        <div className="space-y-3">
          <Label htmlFor="property-type" className="text-sm font-semibold text-foreground">
            Property Type
          </Label>
          <Select value={type} onValueChange={(value) => setType(value)}>
            <SelectTrigger id="property-type" className="h-11">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="flat">Flat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-foreground">Price Range</Label>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Min</p>
              <p className="text-lg font-bold text-foreground">£{minPrice.toLocaleString()}</p>
            </div>
            <div className="h-px flex-1 mx-4 bg-border" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Max</p>
              <p className="text-lg font-bold text-foreground">
                £{maxPrice === 1000000 ? "1M+" : maxPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Slider
                id="min-price"
                min={0}
                max={1000000}
                step={25000}
                value={[minPrice]}
                onValueChange={(value) => setMinPrice(value[0])}
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <Slider
                id="max-price"
                min={0}
                max={1000000}
                step={25000}
                value={[maxPrice]}
                onValueChange={(value) => setMaxPrice(value[0])}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-foreground">Bedrooms</Label>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Min</p>
              <p className="text-lg font-bold text-foreground">{minBedrooms === 0 ? "Any" : minBedrooms}</p>
            </div>
            <div className="h-px flex-1 mx-4 bg-border" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Max</p>
              <p className="text-lg font-bold text-foreground">{maxBedrooms === 6 ? "6+" : maxBedrooms}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Slider
              id="min-bedrooms"
              min={0}
              max={6}
              step={1}
              value={[minBedrooms]}
              onValueChange={(value) => setMinBedrooms(value[0])}
              className="cursor-pointer"
            />
            <Slider
              id="max-bedrooms"
              min={0}
              max={6}
              step={1}
              value={[maxBedrooms]}
              onValueChange={(value) => setMaxBedrooms(value[0])}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Date Added */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Date Added</Label>
          <Select value={dateMode} onValueChange={(value) => setDateMode(value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select date filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="after">After date</SelectItem>
              <SelectItem value="between">Between dates</SelectItem>
            </SelectContent>
          </Select>

          {dateMode === "after" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal",
                    !dateAfter && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateAfter ? format(dateAfter, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateAfter} onSelect={setDateAfter} initialFocus />
              </PopoverContent>
            </Popover>
          ) : (
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal",
                      !dateBetweenStart && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateBetweenStart ? format(dateBetweenStart, "PPP") : <span>Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateBetweenStart} onSelect={setDateBetweenStart} initialFocus />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal",
                      !dateBetweenEnd && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateBetweenEnd ? format(dateBetweenEnd, "PPP") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateBetweenEnd} onSelect={setDateBetweenEnd} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Postcode Area */}
        <div className="space-y-3">
          <Label htmlFor="postcode" className="text-sm font-semibold text-foreground">
            Postcode Area
          </Label>
          <Input
            id="postcode"
            placeholder="e.g., BR1, NW1"
            value={postcodeArea}
            onChange={(e) => setPostcodeArea(e.target.value.toUpperCase())}
            className="h-11"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button onClick={handleSearch} className="flex-1 h-11 font-semibold shadow-lg">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button onClick={handleReset} variant="outline" className="h-11 px-4 bg-transparent">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
