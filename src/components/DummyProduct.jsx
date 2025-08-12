import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import DummyCard from "./DummyCard";
import SkeletonCard from "./SkeletonCard";

const ITEMS_PER_PAGE = 10;

const DummyProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  // Get state from URL params
  const searchTerm = searchParams.get("search") || "";
  const selectedCategories = (searchParams.get("category") || "").split(",").filter(Boolean);
  const selectedBrands = (searchParams.get("brand") || "").split(",").filter(Boolean);
  const sortOption = searchParams.get("sort") || "";
  const currentPage = parseInt(searchParams.get("page") || 1);

  // Helper to update URL params properly
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (Array.isArray(value)) {
      if (value.length === 0) {
        params.delete(key);
      } else {
        params.set(key, value.join(","));
      }
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", 1); // Reset to first page when filters change
    setSearchParams(params);
  };

  // Toggle filter helper for checkboxes
  const toggleValue = (value, key, currentValues) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    updateParam(key, newValues);
  };

  // Pagination helper
  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params);
  };

  // Fetch products on param change (debounced)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://specscart-api.onrender.com/products/products?${searchParams.toString()}`
        );
        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    const delay = setTimeout(fetchProducts, 400); // debounce
    return () => clearTimeout(delay);
  }, [searchParams]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search Products..."
          className="p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400 w-full"
          value={searchTerm}
          onChange={(e) => updateParam("search", e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          <option value="price_asc">💲 Price: Low → High</option>
          <option value="price_desc">💲 Price: High → Low</option>
          <option value="name_asc">🔠 Name: A → Z</option>
          <option value="name_desc">🔠 Name: Z → A</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap md:flex-nowrap gap-6 mb-4 bg-white p-4 rounded-lg shadow">
        <div>
          <h4 className="font-bold text-lg mb-2 border-b pb-1">Categories</h4>
          {["Electronics", "Apparel", "Books"].map((cat) => (
            <label key={cat} className="block cursor-pointer text-gray-700">
              <input
                type="checkbox"
                className="mr-2 accent-blue-500"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleValue(cat, "category", selectedCategories)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div>
          <h4 className="font-bold text-lg mb-2 border-b pb-1">Brands</h4>
          {["Sony", "UrbanWear", "VisionX", "SoundMax", "Specscart"].map((brand) => (
            <label key={brand} className="block cursor-pointer text-gray-700">
              <input
                type="checkbox"
                className="mr-2 accent-green-600"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleValue(brand, "brand", selectedBrands)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      <div className="mb-6">
        {[...selectedCategories, ...selectedBrands].map((val) => (
          <span
            key={val}
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full mr-2 text-sm"
          >
            {val}
            <button
              onClick={() =>
                toggleValue(
                  val,
                  selectedCategories.includes(val) ? "category" : "brand",
                  selectedCategories.includes(val) ? selectedCategories : selectedBrands
                )
              }
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </span>
        ))}
        {(selectedCategories.length || selectedBrands.length) > 0 && (
          <button
            className="ml-4 text-sm font-medium text-red-600 hover:underline"
            onClick={() => {
              updateParam("category", []);
              updateParam("brand", []);
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="transform transition hover:scale-105 hover:shadow-lg rounded-xl bg-white"
            >
              <DummyCard data={product} to={`/product/${product.productKey}`} />
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && products.length === 0 && (
        <div className="text-center py-16 text-gray-500 text-lg font-medium">
          No products found 🛒
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 flex-wrap gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className={`px-4 py-2 rounded-lg border shadow-sm ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          ⬅ Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-4 py-2 rounded-lg border shadow-sm transition ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className={`px-4 py-2 rounded-lg border shadow-sm ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default DummyProduct;
