import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Registration from "../../../../src/assets/registration.svg";
const Form = () => {
  const [Product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        "https://pagination-ten-green.vercel.app/addProduct",
        Product
      );
      if (response.status == 200) {
        toast.success("product added successfully");
      }
    } catch (error) {
      toast.error("faild to add product");
    }
  };
  return (
    <div className="container mx-auto lg:px-24 px-4">
      <div>
        <div className="my-10 hero    ">
          <div className="hero-content gap-14 flex-col lg:flex-row-reverse">
            <div className="text-center hidden md:block  w-8/12">
              {/* <h1 className="text-4xl font-bold mb-10">Login now!</h1> */}
              <img
                className="w-[500px] h-full object-cover"
                src={Registration}
                alt=""
              />
            </div>
            <div className="w-full outline-double max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
              <h1 className="text-2xl font-bold text-center">Add Product</h1>
              <form
                onSubmit={handleSubmit}
                noValidate=""
                action=""
                className="space-y-6"
              >
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="title"
                  className="w-full"
                  value={Product.title}
                  name="title"
                  id=""
                />
                <textarea
                  onChange={handleChange}
                  name="description"
                  id=""
                  cols="auto"
                  className="w-full"
                  value={Product.description}
                  placeholder="description"
                ></textarea>
                <input
                  onChange={handleChange}
                  type="number"
                  placeholder="price"
                  className="w-full"
                  value={Product.price}
                  name="price"
                  id=""
                />

                <button
                  type="submit"
                  className="btn btn-outline block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-lime-600"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
