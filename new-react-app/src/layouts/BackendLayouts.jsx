import React from "react";
import BackendHeader from "../dashboard/layouts/BackendHeader";
import BackendSideNav from "../dashboard/layouts/BackendSideNav";
import { Outlet } from "react-router-dom";

const BackendLayouts = () => {
  return (
    <>
      <div className="sb-nav-fixed">
        <div id="layoutSidenav">
          <BackendHeader />
          <div id="layoutSidenav_nav">
            <BackendSideNav />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <Outlet/>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackendLayouts;
