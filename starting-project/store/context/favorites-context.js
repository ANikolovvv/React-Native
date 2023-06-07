import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: () => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function addFavorite(id) {
    setFavoriteIds((currentIds) => [...currentIds, id]);
  }
  function removeFavorite(id) {
    setFavoriteIds((currentIds) => currentIds.filter((ids) => ids !== id));
  }

  const value = {
    ids: favoriteIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContextProvider;
