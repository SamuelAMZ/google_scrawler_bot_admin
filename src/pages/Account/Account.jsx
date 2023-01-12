import React from "react";

import { Outlet, Link, useLocation } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

const Account = () => {
  const location = useLocation();

  return (
    <>
      <Header page={"Account"} />
      <div className="centerer account-container">
        {/* memu */}
        <div className="tabs menu-tab-parent">
          <Link to={"/account"}>
            <a
              className={
                location.pathname === "/account"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Your account
            </a>
          </Link>
          <Link to={"/account/new-account"}>
            <a
              className={
                location.pathname === "/account/new-account"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Create new Account
            </a>
          </Link>
        </div>

        {/* your account  */}
        {location.pathname === "/account" && (
          <div className="your-account">
            {/* change name */}
            <div className="change change-name">
              <label htmlFor="keyword">Change Name</label>
              <form>
                <input
                  id="keyword"
                  type="text"
                  placeholder="name"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary">Update</button>
              </form>
            </div>

            {/* change email */}
            <div className="change change-email">
              <label htmlFor="email">Change email</label>
              <form>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary">Update</button>
              </form>
            </div>

            {/* change password */}
            <div className="change change-password">
              <label htmlFor="password">Change password</label>
              <form>
                <input
                  id="password"
                  type="text"
                  placeholder="password"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        )}

        {/* outlet */}
        {location.pathname !== "/account" && <Outlet />}
      </div>
    </>
  );
};

export default Account;
