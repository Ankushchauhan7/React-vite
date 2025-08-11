import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import SearchBar from "./Search";
import SkeletonCard from "./SkeletonCard"; // Add this import

const Body = () => {
  const [listRestro, setListRestro] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const filterRestro = () =>
    setFilterList(listRestro.filter((res) => res.info.avgRating > 4.3));

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6943878&lng=77.44391879999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await result.json();
    setListRestro(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterList(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  console.log("body render");

  return listRestro.length === 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 m-3">
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  ) : (
    <div>
      <div className="flex gap-1 mt-3">
        <SearchBar listrestro={listRestro} setlist={setFilterList} />
        <button
          onClick={filterRestro}
          className="cursor-pointer bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:brightness-110 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Filter Above 4.2 Stars
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 m-3">
        {filterList.map((r) => (
          <RestaurantCard key={r?.info?.id} restaurant={r} />
        ))}
      </div>
    </div>
  );
};

export default Body;