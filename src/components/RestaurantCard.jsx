import React from "react";
import { IMG_CDN } from "../utils/imagecdn";

function RestaurantCard({ restaurant }) {
  const { name, cuisines, costForTwo, areaName, avgRating, cloudinaryImageId } =
    restaurant.info;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <img
        src={IMG_CDN + cloudinaryImageId}
        alt={name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <div className="text-sm text-gray-700 mb-2">
          {cuisines.join(" , ")} • {costForTwo}
        </div>
        <div className="text-sm text-gray-500 mb-2">{areaName}</div>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="font-semibold">{avgRating}</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
