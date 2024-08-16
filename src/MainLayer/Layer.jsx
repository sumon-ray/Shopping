import React from "react";
import { Outlet } from "react-router-dom";
import { Component } from "../Shared/Component/Component";

const Layer = () => {
  return (
    <>
    <div className="min-h-[calc(100vh-700px)] ">
      <Component />
    </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layer;
