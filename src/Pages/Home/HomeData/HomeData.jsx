import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortOption, setSortOption] = useState("");

  const fetchData = async () => {
    // <p>loading...</p>
    try {
      const response = await axios.get(
        // console.log(response)
        //https://pagination-ten-green.vercel.app/
        // setLoading(true) 

        `https://pagination-ten-green.vercel.app/products?q=${searchQuery}&page=${currentPage}&size=${itemsPerPage}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sortOption}`
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
  }, [
    currentPage,
    itemsPerPage,
    searchQuery,
    brand,
    category,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  const handleSearch = () => {
    setCurrentPage(0); // Reset to the first page
    fetchData();
  };

  return (
    <div className="container mx-auto px-4 lg:px-10">
      <div className="text-center mb-8">
        <div className="flex mt-4 lg:flex-row flex-col gap-2 justify-center items-center">
          <div className="flex justify-center items-center ">
            <input
              type="text"
              placeholder="Search"
              className="input-md input-primary hover:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="outline-none border-none bg-blue-500 font-sans text-lg text-slate-300 btn-md "
            >
              Search
            </button>
          </div>

          {/* Categorization Dropdown */}
          <div className="dropdown dropdown-content">
            <div tabIndex={0} role="button" className="btn m-1">
              Filter
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-500 text-white rounded-box z-[1] w-60 p-2 shadow"
            >
              <li>
                <label className=" text-white">
                  {/* Brand Name */}
                  <input
                    placeholder="brand name"
                    type="text"
                    className="input input-primary bg-white text-black   input-bordered w-full"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </label>
              </li>
              <li>
                <label>
                  <input
                    placeholder="Category Name"
                    type="text"
                    className="input input-primary bg-white text-black  input-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </label>
              </li>
              <li>
                <label>
                  <div className="flex gap-2">
                    <input
                      // placeholder='Price Range'
                      type="number"
                      placeholder="Min"
                      className="input input-primary text-black bg-white input-bordered w-full"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="input input-primary text-black bg-white input-bordered w-full"
                      value={maxPrice === Infinity ? "" : maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          e.target.value === ""
                            ? Infinity
                            : Number(e.target.value)
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
            className="input-md  input bg-white "
          >
            <option className="bg-gray-500  shadow-md text-white" value="">
              <p className="text-black text-xl">Sort</p>
            </option>
            <option
              className="bg-gray-500 text-white shadow-md"
              value="priceLowHigh"
            >
              Price: Low to High
            </option>
            <option
              className="bg-gray-500 text-white shadow-md"
              value="priceHighLow"
            >
              Price: High to Low
            </option>
            <option
              className="bg-gray-500 text-white shadow-md"
              value="dateNewest"
            >
              Newest First
            </option>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col"
          >
            <div className="w-72 mx-auto h-5/6">
              <img
                className="w-40 flex justify-center items-center flex-col mx-auto py-4 object-cover"
                src={product.product_image || "nai"}
                alt={product.product_name}
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-red-600">Brand Name: {product.brand_name}</p>
              <h2 className="text-lg font-semibold text-gray-800">
                {product.product_name}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Category: {product.category}
              </p>
              <p className="text-yellow-500 text-sm mt-1">
                Rating: ⭐ {product.ratings}
              </p>
              <p
                className="text-gray-600 mt-3 flex-grow"
                style={{ minHeight: "60px" }} // Set a fixed height for the description area
              >
                {product.description.slice(0, 60)}
              </p>
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

      {/* Show current page and total pages */}
      <p className="mt-6 text-lg text-center mx-auto text-black font-semibold">
        Page {currentPage + 1} of {totalPages}
      </p>
      <div className="pagination mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className="btn btn-primary text-white"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            className={`btn ${
              currentPage === pageIndex ? "btn-active btn-accent" : ""
            }`}
            onClick={() => setCurrentPage(pageIndex)}
            key={pageIndex}
            style={{
              display:
                window.innerWidth < 640 && pageIndex >= 2
                  ? "none"
                  : "inline-block",
            }}
          >
            {pageIndex + 1}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)
          }
          className="btn btn-primary text-white"
        >
          Next
        </button>

        {/* Optional: Show items per page dropdown */}
        {/* 
  <select
    value={itemsPerPage}
    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
    className="input input-bordered w-24 ml-4"
  >
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>
  </select> 
  */}
      </div>
    </div>
  );
};

export default HomeData;
