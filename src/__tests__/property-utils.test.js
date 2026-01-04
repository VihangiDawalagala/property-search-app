import { describe, test, expect } from "@jest/globals";

import {
  getAllProperties,
  getPropertyById,
  searchProperties,
  formatPrice,
  formatDate,
} from "../lib/property-utils.js";

describe("property-utils critical logic", () => {
  test("getAllProperties returns at least 7 properties", () => {
    const all = getAllProperties();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThanOrEqual(7);
  });

  test("getPropertyById returns a property for a valid id", () => {
    const first = getAllProperties()[0];
    const found = getPropertyById(first.id);
    expect(found).toBeDefined();
    expect(found.id).toBe(first.id);
  });

  test("empty criteria returns all properties", () => {
    expect(searchProperties({}).length).toBe(getAllProperties().length);
  });

  test("filters by type", () => {
    const results = searchProperties({ type: "house" });
    expect(results.every((p) => p.type === "house")).toBe(true);
  });

  test("filters by price range", () => {
    const results = searchProperties({ minPrice: 200000, maxPrice: 1000000 });
    expect(results.every((p) => p.price >= 200000 && p.price <= 1000000)).toBe(true);
  });

  test("filters by bedrooms range", () => {
    const results = searchProperties({ minBedrooms: 2, maxBedrooms: 4 });
    expect(results.every((p) => p.bedrooms >= 2 && p.bedrooms <= 4)).toBe(true);
  });

  test("filters by postcode area", () => {
    const results = searchProperties({ postcodeArea: "BR" });
    expect(results.length).toBeGreaterThan(0);
  });

  test("formatPrice includes £", () => {
    expect(formatPrice(450000)).toContain("£");
  });

  test("formatDate returns a string", () => {
    expect(typeof formatDate("2026-01-01")).toBe("string");
  });
});
