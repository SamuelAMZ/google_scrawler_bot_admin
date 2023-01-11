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

// subpages
import SingleSearch from "./pages/SingleSearch/SingleSearch";

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
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />

                {/* single search page */}
                <Route path="/search/:searchid" element={<SingleSearch />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
