import React, { createContext, useContext, useState } from 'react';
import { searchPost } from '../api/posts';

const searchContext = createContext();

export default function SearchProvider ({children}) {
   const [searchResult, setSearchResult] = useState([])
   const handleSearch = async (query) => {
    const {error, posts} = await searchPost(query);
    if (error) return console.log(error);
    setSearchResult(posts)
   }
   const resetSearch = () => { 
      setSearchResult([]);
   }

   return (
      <searchContext.Provider value={{searchResult, handleSearch, resetSearch}}>
         {children}
      </searchContext.Provider>
   )
}

export const useSearch = () => useContext(searchContext)