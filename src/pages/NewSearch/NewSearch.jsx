import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// components
import Header from "../../components/Header/Header";

// icons
import { IoIosArrowBack } from "react-icons/io";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../helpers/postReq";

const NewSearch = () => {
  const [searchData, setSearchData] = useState({
    keyword: "",
    numberOfPages: "20",
    tabs: "all",
    urls: "",
    domains: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChanges = (e, type) => {
    if (type === "keyword") {
      setSearchData({
        keyword: e.target.value,
        numberOfPages: searchData.numberOfPages,
        tabs: searchData.tabs,
        urls: searchData.urls,
        domains: searchData.domains,
      });
    }

    if (type === "pages") {
      setSearchData({
        keyword: searchData.keyword,
        numberOfPages: e.target.value,
        tabs: searchData.tabs,
        urls: searchData.urls,
        domains: searchData.domains,
      });
    }

    if (type === "tabs") {
      setSearchData({
        keyword: searchData.keyword,
        numberOfPages: searchData.numberOfPages,
        tabs: e.target.value,
        urls: searchData.urls,
        domains: searchData.domains,
      });
    }

    if (type === "urls") {
      setSearchData({
        keyword: searchData.keyword,
        numberOfPages: searchData.numberOfPages,
        tabs: searchData.tabs,
        urls: e.target.value,
        domains: searchData.domains,
      });
    }

    if (type === "domains") {
      setSearchData({
        keyword: searchData.keyword,
        numberOfPages: searchData.numberOfPages,
        tabs: searchData.tabs,
        urls: searchData.urls,
        domains: e.target.value,
      });
    }
  };

  const handleSubmitions = async () => {
    const inputData = {
      keyword: searchData.keyword,
      numberOfPages: searchData.numberOfPages,
      tab: searchData.tabs ? searchData.tabs : "all",
      urls: searchData.urls.replaceAll("\n", "").replaceAll(" ", "").split(","),
      domains: searchData.domains
        .replaceAll("\n", "")
        .replaceAll(" ", "")
        .split(","),
    };

    // send req
    return await postReq(inputData, "/api/new");
  };

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: sendPost,
  } = useQuery(["new"], handleSubmitions, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleNewSearch = (e) => {
    e.preventDefault();

    // send req
    sendPost();
  };

  // move to single search page
  useEffect(() => {
    if (data && data.code === "ok") {
      navigate(`/search/${data.data.searchId}`);
    }
  }, [data]);

  // //// grab details from url
  useEffect(() => {
    const urlData = location.search.replace("?", "").split("&");

    const dataFromUrl = {
      keyword: "",
      numberOfPages: "20",
      urls: "",
      domains: "",
    };
    urlData.forEach((elm) => {
      const temp = elm.split("=");
      if (temp[0] === "keyword") {
        dataFromUrl.keyword = decodeURI(temp[1]);
      }
      if (temp[0] === "num") {
        dataFromUrl.numberOfPages = temp[1];
      }
      if (temp[0] === "urls") {
        dataFromUrl.urls = temp[1];
      }
      if (temp[0] === "doms") {
        dataFromUrl.domains = temp[1];
      }
    });
    // setting data
    setSearchData(dataFromUrl);
  }, []);

  return (
    <>
      <Header page={"New Search"} />

      {/* new search */}
      <div className="centerer newsearch-container">
        <div className="newsearch-elements">
          {/* back */}
          <button className="btn btn-link" onClick={() => navigate(-1)}>
            <IoIosArrowBack /> Back
          </button>
          {/* form */}
          <div className="heading">
            <h2>Start a new search</h2>
          </div>

          <form onSubmit={handleNewSearch}>
            <div>
              <label htmlFor="keyword">Keyword</label>
              <input
                id="keyword"
                type="text"
                placeholder="kimberlina cherie"
                className="input input-bordered w-full"
                value={searchData.keyword}
                onChange={(e) => handleChanges(e, "keyword")}
                required
              />
            </div>
            <div>
              <label htmlFor="pages">
                Number Of Google Page To Crawl (default 20)
              </label>
              <input
                id="pages"
                type="number"
                placeholder="20"
                className="input input-bordered w-full"
                value={searchData.numberOfPages}
                onChange={(e) => handleChanges(e, "pages")}
                required
              />
            </div>

            <div>
              <label htmlFor="tabs">Google Tabs To Target</label>
              <select
                id="tabs"
                className="select select-bordered w-full"
                value={searchData.tabs}
                onChange={(e) => handleChanges(e, "tabs")}
                required
              >
                <option value="all">All Results Tab Only</option>
                <option value="videos">Videos Tab Only</option>
                <option value="both">Both Tabs</option>
              </select>
            </div>

            <div>
              <label htmlFor="url">
                Specific URLs To Skip (seperate them with a comma)
              </label>
              <textarea
                id="url"
                className="textarea textarea-bordered"
                placeholder="https://google.com/courses/,
                https://wikipedia.com/the-walking-dead/"
                value={searchData.urls}
                onChange={(e) => handleChanges(e, "urls")}
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="domains">Domains To Skip</label>
              <textarea
                id="domains"
                className="textarea textarea-bordered"
                placeholder="google.com,
                wikipedia.com"
                value={searchData.domains}
                onChange={(e) => handleChanges(e, "domains")}
                required
              ></textarea>
            </div>

            {isLoading ? (
              <button className="btn btn-primary loading">Scraping...</button>
            ) : (
              <button className="btn btn-primary">Start Scraping</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSearch;
