import React from "react";
import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// auths
import Auth from "./components/Auth/Auth";
// components
import Sidebar from "./components/Sidebar/Sidebar";
// pages
import Login from "./pages/Login/Login";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/Home/Home";
import NewSearch from "./pages/NewSearch/NewSearch";
import Searches from "./pages/Searches/Searches";
import Account from "./pages/Account/Account";
import Schedules from "./pages/Schedules/Schedules";
import Emails from "./pages/Emails/Emails";
import Settings from "./pages/Settings/Settings";
import Analytics from "./pages/Analitycs/Analitycs";
import Users from "./pages/Users/Users";
import Logout from "./pages/Logout/Logout";

// subpages
import SingleSearch from "./pages/SingleSearch/SingleSearch";
import CreateNewAccount from "./pages/Account/CreateNew/CreateNewAccount";
import Domains from "./pages/Settings/Domains/Domains";
import Links from "./pages/Settings/Links/Links";
import SingleUser from "./pages/Users/SingleUser";

// contexts
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  // react query
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <>
          {/* auth */}
          {/* <Auth /> */}

          {/* component code */}
          <div className="site-container">
            <div className="notif"></div>

            <UserProvider>
              {/* sidebar */}
              <Sidebar />

              {/* main */}
              <div className="main">
                <Routes>
                  {/* auth pages */}
                  <Route path="/" exact element={<Login />} />

                  {/* dashboad pages */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/new" element={<NewSearch />} />
                  <Route path="/searches" element={<Searches />} />
                  <Route path="/schedules" element={<Schedules />} />
                  <Route path="/emails" element={<Emails />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/user/:uid" element={<SingleUser />} />
                  <Route path="/settings" element={<Settings />}>
                    <Route path="/settings/domains" element={<Domains />} />
                    <Route path="/settings/links" element={<Links />} />
                  </Route>
                  <Route path="/account" element={<Account />}>
                    <Route
                      path="/account/new-account"
                      element={<CreateNewAccount />}
                    />
                  </Route>
                  <Route path="/logout" element={<Logout />} />

                  {/* single search page */}
                  <Route path="/search/:searchid" element={<SingleSearch />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </UserProvider>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
