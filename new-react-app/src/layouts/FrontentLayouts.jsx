import React from "react";
import Header from "../frontend/layouts/Header";
import Footer from "../frontend/layouts/Footer";
import { Outlet } from "react-router-dom";
import Nav from "../frontend/layouts/Nav";

const FrontentLayouts = () => {
  return (
    <>
      <Header />
      <Nav/>
      <Outlet/>
      <Footer />
    </>
  );
};

export default FrontentLayouts;
