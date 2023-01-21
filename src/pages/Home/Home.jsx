import React, { useContext } from "react";

// components
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Auth from "../../components/Auth/Auth";

// contexts
import UserContext from "../../contexts/UserContext";

// icons
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLink } from "react-icons/ai";
import { TbBrandTelegram } from "react-icons/tb";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const tableConf = { perPage: "7", target: "searches" };
  const { login, changeLogin } = useContext(UserContext);

  // get analytics
  const handleAnalyticsLoading = async (e) => {
    // send req
    return await postReq({ home: "home" }, "/api/homeAnalytics");
  };

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    isError,
    isSuccess,
  } = useQuery(["analytics"], handleAnalyticsLoading, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  return (
    <>
      <Auth />
      <Header page={"Home"} />
      {/* home */}
      <div className="centerer home-container">
        {/* stats */}
        {analyticsLoading && (
          <div className="loaderAnalytics">
            <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
              <Skeleton height={100} count={1} />
              <Skeleton height={100} count={1} />
              <Skeleton height={100} count={1} />
              <Skeleton height={100} count={1} />
            </SkeletonTheme>
          </div>
        )}
        {analyticsData && analyticsData.code === "ok" && (
          <div className="stats-container-jd">
            <div className="stat-jd">
              <FiSearch />
              <div>
                <p>Search Performed</p>
                <p className="desc">{analyticsData.payload[0].searchCount}</p>
              </div>
            </div>
            <div className="stat-jd">
              <AiOutlineLink />
              <div>
                <p>URL crawled</p>
                <p className="desc">
                  {analyticsData.payload[0].urlCrawledCount}
                </p>
              </div>
            </div>
            <div className="stat-jd">
              <TbBrandGoogleAnalytics />
              <div>
                <p>Page Visited</p>
                <p className="desc">
                  {analyticsData.payload[0].pageVisitedCount}
                </p>
              </div>
            </div>
            <div className="stat-jd">
              <TbBrandTelegram />
              <div>
                <p>Email Sent</p>
                <p className="desc">
                  {analyticsData.payload[0].emailSentCount}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* table */}
        <Table conf={tableConf} />
      </div>
    </>
  );
};

export default Home;
