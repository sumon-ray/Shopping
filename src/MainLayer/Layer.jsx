import React from "react";
import { Outlet } from "react-router-dom";
import { Component } from "../Shared/Component/Component";
import { FooterComponent } from "../Shared/Footer/FooterComponent";

const Layer = () => {
  return (
    <>
    <div className="min-h-[calc(100vh-700px)] ">
      <Component />
    </div>
      <div>
        <Outlet />
      </div>
      <FooterComponent />
    </>
  );
};

export default Layer;
