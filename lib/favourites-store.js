const KEY = "favourites";
export function readFavourites(){
    if (typeof window === "undefined") return[];
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw): [];

    }   catch {
        return [];
    }
}

export function writeFavourites(favs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(favs));
}

export function addFavourite(favs, property) {
  // prevent duplicates (by id)
  if (favs.some((p) => p.id === property.id)) return favs;
  return [...favs, property];
}

export function removeFavourite(favs, id) {
  return favs.filter((p) => p.id !== id);
}

export function clearFavourites() {
  writeFavourites([]);
}