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

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products?q=${searchQuery}&page=${currentPage}&size=${itemsPerPage}`);
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
  }, [currentPage, itemsPerPage, searchQuery]);

  const handleSearch = () => {
    setCurrentPage(0); // Reset to the first page
    fetchData();
  };

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
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
        {error && <p className="text-red-500 mx-auto flex flex-col justify-center items-center mt-2"> 
        <img className="w-96" src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7932.jpg?t=st=1723837570~exp=1723841170~hmac=330707885b0254a7d3a2303b6827fea9cc5a4ac068c59281e5bb870e8df39379&w=740" alt="" />
        {error}</p>}
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
                Date: {new Date(product.product_creation_date_and_time).toLocaleString()}
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

      <div className="pagination">
        <p>Current page: {currentPage}</p>
        <button onClick={handlePrevPage}>Prev</button>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            className={currentPage === pageIndex ? "selected" : undefined}
            onClick={() => setCurrentPage(pageIndex)}
            key={pageIndex}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button onClick={handleNextPage}>Next</button>
        <select value={itemsPerPage} onChange={handleItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default HomeData;
