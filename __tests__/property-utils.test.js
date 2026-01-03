/**
 
 * Covers: searchProperties critical logic, date/price formatting, ID lookup
 */

// Mock the JSON import used inside property-utils.js
jest.mock("@/data/properties.json", () => ([
  { id: 1, type: "house", price: 850000, bedrooms: 5, dateAdded: "2024-11-28", postcode: "SW1A 1AA" },
  { id: 2, type: "flat",  price: 325000, bedrooms: 2, dateAdded: "2024-12-05", postcode: "SE13 6LL" },
  { id: 3, type: "house", price: 450000, bedrooms: 3, dateAdded: "2024-10-12", postcode: "BR1 2CD" },
]));

import {
  getAllProperties,
  getPropertyById,
  searchProperties,
  formatPrice,
  formatDate,
} from "@/lib/property-utils";

// -------------------- Data / Access --------------------

test("getAllProperties returns the full dataset", () => {
  const props = getAllProperties();
  expect(props).toHaveLength(3);
});

test("getPropertyById returns correct property when id exists", () => {
  const prop = getPropertyById(2);
  expect(prop).toBeTruthy();
  expect(prop.type).toBe("flat");
  expect(prop.postcode).toBe("SE13 6LL");
});

test("getPropertyById returns undefined when id does not exist", () => {
  const prop = getPropertyById(999);
  expect(prop).toBeUndefined();
});

// -------------------- searchProperties (CRITICAL) --------------------

test("searchProperties with empty criteria returns all properties", () => {
  const result = searchProperties({});
  expect(result).toHaveLength(3);
});

test("filters by type (house)", () => {
  const result = searchProperties({ type: "house" });
  expect(result.map(p => p.id)).toEqual([1, 3]);
});

test("type 'any' does not filter out results", () => {
  const result = searchProperties({ type: "any" });
  expect(result).toHaveLength(3);
});

test("filters by minPrice only", () => {
  const result = searchProperties({ minPrice: 500000 });
  expect(result.map(p => p.id)).toEqual([1]);
});

test("filters by maxPrice only", () => {
  const result = searchProperties({ maxPrice: 400000 });
  expect(result.map(p => p.id)).toEqual([2]);
});

test("filters by minBedrooms and maxBedrooms", () => {
  const result = searchProperties({ minBedrooms: 2, maxBedrooms: 3 });
  expect(result.map(p => p.id)).toEqual([2, 3]);
});

test("filters by dateAfter (includes same day)", () => {
  const result = searchProperties({ dateAfter: "2024-11-28" });
  expect(result.map(p => p.id)).toEqual([1, 2]);
});

test("filters by dateBetweenStart and dateBetweenEnd (inclusive)", () => {
  const result = searchProperties({
    dateBetweenStart: "2024-10-01",
    dateBetweenEnd: "2024-11-15",
  });
  expect(result.map(p => p.id)).toEqual([3]);
});

test("filters by postcodeArea (case-insensitive and start-match)", () => {
  const result = searchProperties({ postcodeArea: "se13" });
  expect(result.map(p => p.id)).toEqual([2]);
});

test("combines multiple filters correctly (type + bedrooms + price)", () => {
  const result = searchProperties({ type: "house", minBedrooms: 4, minPrice: 800000 });
  expect(result.map(p => p.id)).toEqual([1]);
});

test("returns empty list when no property matches", () => {
  const result = searchProperties({ type: "flat", minBedrooms: 5 });
  expect(result).toEqual([]);
});

// -------------------- Formatting --------------------

test("formatPrice formats GBP with no decimals", () => {
  expect(formatPrice(250000)).toBe("£250,000");
});

test("formatDate returns a readable long date for older dates", () => {
  // Very old date -> should not be Today/Yesterday/days/weeks ago
  const result = formatDate("2000-01-01");
  // Example: "1 January 2000"
  expect(result).toMatch(/\d{1,2}\s[A-Za-z]+\s\d{4}/);
});
