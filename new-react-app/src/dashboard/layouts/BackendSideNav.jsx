import React from "react";
import { Link } from "react-router-dom";

const BackendSideNav = () => {
  return (
    <>
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" to="/dashboard">
              <div className="sb-nav-link-icon">
                <i className="fas fa-home text-light" aria-hidden="true"></i>
              </div>
              Dashboard
            </Link>

            <div className="sb-sidenav-menu-heading">Interface</div>
            <Link className="nav-link collapsed" to="#">
              <div className="sb-nav-link-icon">
              <i className="fa-solid fa-user-check text-light"></i>
              </div>
               Main Users
            </Link>
            <Link className="nav-link collapsed" to="#">
              <div className="sb-nav-link-icon">
              <i class="fa-solid fa-user-secret text-light"></i>
              </div>
              Region Users
            </Link>
            
            <Link className="nav-link collapsed" to="#">
              <div className="sb-nav-link-icon">
              <i className="fa-solid fa-user-plus text-light"></i>
              
              </div>
              Branch Users
            </Link>
            <Link className="nav-link collapsed" to="#">
              <div className="sb-nav-link-icon">
              <i className="fa-solid fa-users text-light"></i>
              </div>
              Sub-Branch Users
            </Link>

            <Link className="nav-link collapsed" to="#">
              <div className="sb-nav-link-icon">
                <i className="fas fa-book-open text-light" />
              </div>
              Pages
            </Link>
          </div>
        </div>
          <a className="btn btn-secondary text-uppercase" href="/">goto home page</a>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
            
        </div>
      </nav>
    </>
  );
};

export default BackendSideNav;
