import React from "react";

import { Suspense } from "react";
import useFetch from "../../Hooks/UseFetch";
// import useFetch from "../../../Hooks/UseFetch";
const About = () => {
  const { data } = useFetch("data", "http://localhost:5000/books");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <ProductList /> */}
      <div className="container mx-auto p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Product List</h1>
          {/* <p>Total Products: {products.length}</p> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-md">
              <img src={product.photo} alt="" />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default About;
