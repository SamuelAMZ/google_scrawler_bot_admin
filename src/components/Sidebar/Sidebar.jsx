import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// component
import Auth from "../Auth/Auth";

// icons
import { AiOutlineHome, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { FiSearch, FiExternalLink } from "react-icons/fi";
import { BiTask, BiEnvelope } from "react-icons/bi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

const Sidebar = () => {
  // loaction
  const location = useLocation();

  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("/404")) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Auth />
      {allowed && (
        <>
          <div className="sidebar">
            {/* heading */}
            <div className="heading">
              <Link to={"/home"}>
                <h1>Admin</h1>
              </Link>
            </div>

            {/* menu elements */}
            <ul className="menu-container">
              <Link to={"/home"}>
                <li
                  className={location.pathname === "/home" ? "active-menu" : ""}
                >
                  <AiOutlineHome />
                  <p>Home</p>
                </li>
              </Link>
              <Link to={"/searches"}>
                <li
                  className={
                    location.pathname === "/searches" ? "active-menu" : ""
                  }
                >
                  <FiSearch />
                  <p>Searches</p>
                </li>
              </Link>
              <Link to={"/schedules"}>
                <li
                  className={
                    location.pathname === "/schedules" ? "active-menu" : ""
                  }
                >
                  <BiTask />
                  <p>Schedules</p>
                </li>
              </Link>
              <Link to={"/emails"}>
                <li
                  className={
                    location.pathname === "/emails" ? "active-menu" : ""
                  }
                >
                  <BiEnvelope />
                  <p>Emails</p>
                </li>
              </Link>
              <Link to={"/analytics"}>
                <li
                  className={
                    location.pathname === "/analytics" ? "active-menu" : ""
                  }
                >
                  <TbBrandGoogleAnalytics />
                  <p>Analytics</p>
                </li>
              </Link>

              {/* separator */}
              <span className="seperator-element"></span>

              <Link to={"/settings"}>
                <li
                  className={
                    location.pathname === "/settings" ? "active-menu" : ""
                  }
                >
                  <AiOutlineSetting />
                  <p>Settings</p>
                </li>
              </Link>
              <Link to={"/account"}>
                <li
                  className={
                    location.pathname === "/account" ||
                    location.pathname === "/account/new-account"
                      ? "active-menu"
                      : ""
                  }
                >
                  <AiOutlineUser />
                  <p>Account</p>
                </li>
              </Link>

              {/* logout */}
              <Link to={"/logout"} className="logout">
                <li className="btn btn-neutral ">
                  <FiExternalLink />
                  <p>Logout</p>
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
