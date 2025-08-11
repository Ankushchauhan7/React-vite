import React from "react";

const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg p-4 h-72 flex flex-col gap-4">
    <div className="bg-gray-300 h-24 rounded"></div>
    <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
  </div>
);

export default SkeletonCard;