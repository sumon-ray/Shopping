import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeData = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortOption, setSortOption] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products?q=${searchQuery}&page=${currentPage}&size=${itemsPerPage}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sortOption}`
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setError(""); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("The product cannot be found");
        setProducts([]); // Clear the product list
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery, brand, category, minPrice, maxPrice, sortOption]);

  const handleSearch = () => {
    setCurrentPage(0); // Reset to the first page
    fetchData();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <div className="flex gap-2 justify-center items-center">
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search"
              className="input-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="outline-none border-none bg-blue-500 font-sans text-lg text-slate-300 btn-md -translate-x-4"
            >
              Search
            </button>
          </div>

          {/* Categorization Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Filter
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow"
            >
              <li>
                <label>
                  Brand Name
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </label>
              </li>
              <li>
                <label>
                  Category Name
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </label>
              </li>
              <li>
                <label>
                  Price Range
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="input input-bordered w-full"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="input input-bordered w-full"
                      value={maxPrice === Infinity ? "" : maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          e.target.value === "" ? Infinity : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </label>
              </li>
            </ul>
          </div>

          {/* Sort by Price and Date */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="input-md"
          >
            <option value="">Sort</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="dateNewest">Newest First</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 mx-auto flex flex-col justify-center items-center mt-2">
            <img
              className="w-96"
              src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7932.jpg"
              alt="Error"
            />
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
          >
            <img
              className="w-full h-48 object-cover"
              src={product.product_image || "nai"}
              alt={product.product_name}
            />
            <div className="p-4">
              <p className="text-red-600">Brand Name: {product.brand_name} </p>
              <h2 className="text-lg font-semibold text-gray-800">
                {product.product_name}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Category: {product.category}
              </p>
              <p className="text-yellow-500 text-sm mt-1">
                Rating: ⭐ {product.ratings}
              </p>
              <p className="text-gray-600 mt-3">{product.description}</p>
              <p className="text-gray-500 text-sm mt-2">
                Date:{" "}
                {new Date(
                  product.product_creation_date_and_time
                ).toLocaleString()}
              </p>
              <p className="text-xl font-bold text-gray-800 mt-4">
                ${product.price}
              </p>
              <button
                onClick={() => navigate(`/details/${product._id}`)}
                className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className="btn btn-primary"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            className={`btn ${currentPage === pageIndex ? "btn-active" : ""}`}
            onClick={() => setCurrentPage(pageIndex)}
            key={pageIndex}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
          className="btn btn-primary"
        >
          Next
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="input input-bordered w-24 ml-4"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};

export default HomeData;
