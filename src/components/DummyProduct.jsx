import React, { useEffect, useState, useMemo } from "react";
import DummyCard from "./DummyCard";
import SkeletonCard from "./SkeletonCard";

const ITEMS_PER_PAGE = 10;

const DummyProduct = () => {
  const [allProducts, setAllProducts] = useState([]); // all products from backend
  const [loading, setLoading] = useState(true);

  // Filters & search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch ALL products once
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let page = 1;
      let hasMore = true;
      let allData = [];

      while (hasMore) {
        const res = await fetch(
          `https://specscart-api.onrender.com/products?page=${page}&limit=100`
        );
        const data = await res.json();

        if (data.products && data.products.length > 0) {
          allData = [...allData, ...data.products];
          page++;
        } else {
          hasMore = false;
        }
      }

      setAllProducts(allData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Apply filters, search, and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Brand filter
    if (selectedBrands.length) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Sorting
    if (sortOption === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name_asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name_desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [allProducts, searchTerm, selectedCategories, selectedBrands, sortOption]);

  // Paginate locally
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Toggle filter helper
  const toggleValue = (value, state, setter) => {
    setter(
      state.includes(value) ? state.filter((v) => v !== value) : [...state, value]
    );
    setCurrentPage(1); // reset page when filter changes
  };

  return (
    <div className="p-4">
      {/* Search & Sort */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Products"
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex gap-6 mb-4">
        <div>
          <h4 className="font-bold">Categories</h4>
          {["6898897353a12070626d18c1", "6898898053a12070626d18c3"].map((cat) => (
            <label key={cat} className="block">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleValue(cat, selectedCategories, setSelectedCategories)}
              />{" "}
              {cat}
            </label>
          ))}
        </div>

        <div>
          <h4 className="font-bold">Brands</h4>
          {["Apple", "Sony", "Specscart"].map((brand) => (
            <label key={brand} className="block">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleValue(brand, selectedBrands, setSelectedBrands)}
              />{" "}
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => (
            <DummyCard key={product._id} data={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border mx-1 rounded"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border mx-1 rounded ${
              currentPage === i + 1 ? "bg-gray-300" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border mx-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DummyProduct;
