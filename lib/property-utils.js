import propertiesData from "@/data/properties.json"

export function getAllProperties() {
  return propertiesData
}

export function getPropertyById(id) {
  const properties = getAllProperties()
  return properties.find((property) => property.id === id)
}

export function searchProperties(criteria) {
  let properties = getAllProperties()

  // Filter by type
  if (criteria.type && criteria.type !== "any") {
    properties = properties.filter((property) => property.type === criteria.type)
  }

  // Filter by price range
  if (criteria.minPrice !== undefined && criteria.minPrice > 0) {
    properties = properties.filter((property) => property.price >= criteria.minPrice)
  }
  if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
    properties = properties.filter((property) => property.price <= criteria.maxPrice)
  }

  // Filter by bedrooms
  if (criteria.minBedrooms !== undefined && criteria.minBedrooms > 0) {
    properties = properties.filter((property) => property.bedrooms >= criteria.minBedrooms)
  }
  if (criteria.maxBedrooms !== undefined && criteria.maxBedrooms > 0) {
    properties = properties.filter((property) => property.bedrooms <= criteria.maxBedrooms)
  }

  // Filter by date added
  if (criteria.dateAfter) {
    const afterDate = new Date(criteria.dateAfter)
    properties = properties.filter((property) => new Date(property.dateAdded) >= afterDate)
  }
  if (criteria.dateBetweenStart && criteria.dateBetweenEnd) {
    const startDate = new Date(criteria.dateBetweenStart)
    const endDate = new Date(criteria.dateBetweenEnd)
    properties = properties.filter((property) => {
      const propDate = new Date(property.dateAdded)
      return propDate >= startDate && propDate <= endDate
    })
  }

  // Filter by postcode area
  if (criteria.postcodeArea && criteria.postcodeArea.trim()) {
    const searchPostcode = criteria.postcodeArea.trim().toUpperCase()
    properties = properties.filter((property) => property.postcode.toUpperCase().startsWith(searchPostcode))
  }

  return properties
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price)
}

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
