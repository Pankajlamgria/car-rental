import React, { useContext } from 'react'
import rentalcontext from '../context/Rentalcontext';
import ShopCard from './ShopCard';

const SearchResult = () => {
    const contextContent=useContext(rentalcontext);
  return (
    <div>
        <div id="ShopCover">
            {contextContent.searchResults.map((singleShop)=>{
                return <ShopCard key={singleShop.$id} shop={singleShop}/>
                })}
        </div>
    </div>
  )
}

export default SearchResult
