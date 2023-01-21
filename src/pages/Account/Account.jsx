import React, { useContext, useEffect } from "react";

import { Outlet, Link, useLocation } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";
import Auth from "../../components/Auth/Auth";

// contexts
import UserContext from "../../contexts/UserContext";

const Account = () => {
  const location = useLocation();
  const { login, changeLogin } = useContext(UserContext);

  useEffect(() => {
    console.log(login);
  }, []);

  return (
    <>
      <Auth />
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
          <div className="account">
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

            <div className="account-details">
              {login && (
                <ul>
                  <li>
                    <span>Name:</span> {login.user.name}
                  </li>
                  <li>
                    <span>Email:</span> {login.user.email}
                  </li>
                  <li>
                    <span>Role:</span> admin
                  </li>
                  <li>
                    <span>Registration Date:</span>{" "}
                    {login.user.date.split("T")[0]}
                  </li>
                </ul>
              )}
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
