// hooks/useFavourites.js
"use client";

import { useEffect, useState } from "react";
import {
  readFavourites,
  writeFavourites,
  addFavourite,
  removeFavourite,
} from "@/lib/favourites-store";

export default function useFavourites() {
  const [favourites, setFavourites] = useState([]);

  // load from storage on first render
  useEffect(() => {
    setFavourites(readFavourites());
  }, []);

  // keep storage updated
  useEffect(() => {
    writeFavourites(favourites);
  }, [favourites]);

  const add = (property) => setFavourites((prev) => addFavourite(prev, property));
  const remove = (id) => setFavourites((prev) => removeFavourite(prev, id));
  const clear = () => setFavourites([]);

  const isFavourite = (id) => favourites.some((p) => p.id === id);

  return { favourites, add, remove, clear, isFavourite };
}
