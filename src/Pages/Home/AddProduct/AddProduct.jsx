import React from 'react';
import { NavLink, Navigate } from "react-router-dom";

const AddProduct = () => {
    return (
        <div className='flex justify-center items-center my-9'>
            <NavLink to={'/form'}>
          <button  className='btn btn-md btn-outline text-3xl'>Add Product</button>

            </NavLink>
        </div>
    );
};

export default AddProduct;