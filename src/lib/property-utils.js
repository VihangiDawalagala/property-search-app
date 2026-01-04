// Utility functions for working with property data
import propertiesData from "../data/properties.json"

// Returns all properties from the data file
export function getAllProperties() {
  return propertiesData
}

// Finds a single property by its ID number
export function getPropertyById(id) {
  const properties = getAllProperties()
  return properties.find((property) => property.id === id)
}

// Filters properties based on search criteria like price, bedrooms, location, etc.
export function searchProperties(criteria) {
  let properties = getAllProperties()

  // Filter by type - shows only houses or flats if user selects a type
  if (criteria.type && criteria.type !== "any") {
    properties = properties.filter((property) => property.type === criteria.type)
  }

  // Filter by price range - shows properties within min and max price
  if (criteria.minPrice !== undefined && criteria.minPrice > 0) {
    properties = properties.filter((property) => property.price >= criteria.minPrice)
  }
  if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
    properties = properties.filter((property) => property.price <= criteria.maxPrice)
  }

  // Filter by bedrooms - shows properties with number of bedrooms in range
  if (criteria.minBedrooms !== undefined && criteria.minBedrooms > 0) {
    properties = properties.filter((property) => property.bedrooms >= criteria.minBedrooms)
  }
  if (criteria.maxBedrooms !== undefined && criteria.maxBedrooms > 0) {
    properties = properties.filter((property) => property.bedrooms <= criteria.maxBedrooms)
  }

  // Filter by date added - shows properties listed after a certain date
  if (criteria.dateAfter) {
    const afterDate = new Date(criteria.dateAfter)
    properties = properties.filter((property) => new Date(property.dateAdded) >= afterDate)
  }
  // Shows properties listed between two dates
  if (criteria.dateBetweenStart && criteria.dateBetweenEnd) {
    const startDate = new Date(criteria.dateBetweenStart)
    const endDate = new Date(criteria.dateBetweenEnd)
    properties = properties.filter((property) => {
      const propDate = new Date(property.dateAdded)
      return propDate >= startDate && propDate <= endDate
    })
  }

  // Filter by postcode area - shows properties in specific area like BR1, NW1, etc.
  if (criteria.postcodeArea && criteria.postcodeArea.trim()) {
    const searchPostcode = criteria.postcodeArea.trim().toUpperCase()
    properties = properties.filter((property) => property.postcode.toUpperCase().startsWith(searchPostcode))
  }

  return properties
}

// Formats price number into UK currency format like £450,000
export function formatPrice(price) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  }).format(price)
}

// Formats date into readable text like "2 days ago" or "15 December 2024"
export function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}


