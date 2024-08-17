import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from "./Routes/Routes";
import "./index.css";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<AuthProvider>
<QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
</AuthProvider>
  </React.StrictMode>
);
