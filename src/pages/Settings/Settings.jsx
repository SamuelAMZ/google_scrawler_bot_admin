import React from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

const Settings = () => {
  const location = useLocation();

  return (
    <>
      <Header page={"Settings"} />

      <h1 className="centerer">
        {/* memu */}
        <div className="tabs menu-tab-parent">
          <Link to={"/settings/domains"}>
            <a
              className={
                location.pathname === "/settings/domains"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Skiped Domains
            </a>
          </Link>
          <Link to={"/settings/links"}>
            <a
              className={
                location.pathname === "/settings/links"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Skiped URLs
            </a>
          </Link>
        </div>

        {/* subpages */}
        <div className="settings">
          <Outlet />
        </div>
      </h1>
    </>
  );
};

export default Settings;
