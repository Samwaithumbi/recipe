import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchedMeal, setSearchedMeal] = useState("");
  const [meals, setMeals] = useState([]);

  return (
    <SearchContext.Provider value={{ searchedMeal, setSearchedMeal, meals, setMeals }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
