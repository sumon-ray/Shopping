// import { useEffect, useState } from "react";
// import axios from 'axios'
// const UseFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//         setIsLoading(true)
//     try {
//         const response = await axios.get(url);
//         setData(response.data.products);
//     } catch (error) {
//         setError(error)
//     }
//     finally{
//         setIsLoading(false)
//     }

//     };
//     fetchData()
//   }, [url]);
//   return {data, isLoading, error}
// };
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  console.log(data)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, error };
};

export default useFetch;
