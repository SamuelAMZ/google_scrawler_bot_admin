import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    urls: "",
    domains: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e, type) => {
    if (type === "keyword") {
      setSearchData({
        keyword: e.target.value,
        numberOfPages: searchData.numberOfPages,
        urls: searchData.urls,
        domains: searchData.domains,
      });
    }

    if (type === "pages") {
      setSearchData({
        keyword: searchData.keyword,
        numberOfPages: e.target.value,
        urls: searchData.urls,
        domains: searchData.domains,
      });
    }

    if (type === "urls") {
      setSearchData({
        keyword: searchData.keyword,
        numberOfPages: searchData.numberOfPages,
        urls: e.target.value,
        domains: searchData.domains,
      });
    }

    if (type === "domains") {
      setSearchData({
        keyword: searchData.keyword,
        numberOfPages: searchData.numberOfPages,
        urls: searchData.urls,
        domains: e.target.value,
      });
    }
  };

  const handleSubmitions = async () => {
    const inputData = {
      keyword: searchData.keyword,
      numberOfPages: searchData.numberOfPages,
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
              />
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
