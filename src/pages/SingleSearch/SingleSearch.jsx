import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleSearch = () => {
  const params = useParams();
  const [pageData, setPageData] = useState(null);

  // req
  const handlePageLoading = async () => {
    // send req
    return await postReq({ id: params.searchid }, "/api/singleSearch");
  };

  const {
    data: searchData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["single"], handlePageLoading, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // setting data
  useEffect(() => {
    if (searchData && searchData.code === "ok") {
      setPageData(searchData);
    }
  }, [searchData]);

  // loading screen for analitycs
  const LoadingAnalytics = () => {
    return (
      <div className="loading">
        <div>
          <Skeleton count={2} />
        </div>
        <span className="lorem"></span>
        <div>
          <Skeleton count={2} />
        </div>
        <span className="lorem"></span>
        <div>
          <Skeleton count={2} />
        </div>
        <span className="lorem"></span>
        <Skeleton height={40} />
        <span className="lorem"></span>
        <Skeleton height={40} />
        <span className="lorem"></span>
        <Skeleton height={40} />
      </div>
    );
  };

  // ////// filtering result  STEP2
  // req
  const handleFIltering = async () => {
    // send req
    return await postReq({ id: params.searchid }, "/api/filterResult");
  };

  const {
    data: filterData,
    isLoading: filterLoading,
    isError: filterError,
  } = useQuery(["filter"], handleFIltering, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // setting data
  useEffect(() => {
    if (filterData && filterData.code === "ok") {
      console.log(filterData);
      // update data
      setPageData(filterData);
    }
  }, [filterData]);

  return (
    <>
      {/* header */}
      <Header page={"Single Search"} />
      {/* single search */}
      <div className="centerer search-container">
        {/* steps */}
        <ul className="steps w-full steps-container">
          <li
            className={
              pageData && pageData.payload.steps.step1 === "done!"
                ? "step step-primary"
                : "step"
            }
          >
            Crawl Google Results
          </li>
          <li
            className={
              pageData && pageData.payload.steps.step2 === "done!"
                ? "step step-primary"
                : "step"
            }
          >
            Filter Results
          </li>
          <li
            className={
              pageData && pageData.payload.steps.step3 === "done!"
                ? "step step-primary"
                : "step"
            }
          >
            Visit Filtered URLs
          </li>
        </ul>

        <div className="single-elements">
          {!isLoading && pageData && (
            <div className="step-content">
              {/* step1 */}
              <div className="step-elements">
                <div className="elm">
                  <p>Step Name</p>
                  <p>Status</p>
                  <p>URLs found</p>
                  <p>URL list</p>
                </div>
                <div className="elm">
                  <p>Crawl Google Results</p>
                  <p>{pageData.payload.steps.step1}</p>
                  <p>{pageData.payload.allResults.length}</p>
                  <div className="urlList">
                    {pageData.payload.allResults.map((elm, idx) => {
                      return (
                        <a key={idx} href={elm.link} target="_blank">
                          {elm.link}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* step2 */}
              <div className="step-elements">
                <div className="elm">
                  <p>Step Name</p>
                  <p>Status</p>
                  <p>URLs After Filtering</p>
                  <p>URL list</p>
                </div>
                <div className="elm">
                  <p>Filter Results</p>
                  <p>{pageData.payload.steps.step2}</p>
                  <p>
                    {pageData.payload.steps.step2 !== "done!" ? (
                      <Skeleton count={1} />
                    ) : (
                      pageData.payload.filtered.length
                    )}
                  </p>
                  <div className="urlList">
                    {pageData.payload.steps.step2 !== "done!" ? (
                      <Skeleton count={6} />
                    ) : (
                      pageData.payload.filtered.map((elm, idx) => {
                        return (
                          <a key={idx} href={elm} target="_blank">
                            {elm}
                          </a>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              {/* step 3 */}
              <div className="step-elements">
                <div className="elm">
                  <p>Step Name</p>
                  <p>Status</p>
                  <p>URLs where the keyword only has been found</p>
                  <p className="last">
                    URLs where the keyword and the video content were found
                  </p>
                </div>
                <div className="elm">
                  <p>Visit Filtered URLs</p>
                  <p>{pageData.payload.steps.step3}</p>
                  <div className="urlList">
                    {pageData.payload.keywordOnly.length === 0 && (
                      <Skeleton count={6} />
                    )}
                  </div>
                  <div className="urlList ">
                    {pageData.payload.keywordAndMedia.length === 0 && (
                      <Skeleton count={6} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="analitycs-actions">
            {/* details */}
            {isLoading && <LoadingAnalytics />}
            {!isLoading && pageData && (
              <div className="details">
                <div>
                  <h3>Search name:</h3>
                  <p>{pageData.payload.keyword}</p>
                </div>

                <div>
                  <h3>Search Status:</h3>
                  <p>{pageData.payload.status}</p>
                </div>

                <div>
                  <h3>Search Date:</h3>
                  <p>{pageData.payload.createdAt.split("T")[0]}</p>
                </div>

                <span></span>

                {/* actions */}
                <div>
                  <button className="btn w-full">Delete This Search</button>
                </div>
                <div>
                  <button className="btn w-full">Re-Launch</button>
                </div>
                <div>
                  <button className="btn btn-primary w-full">
                    Download CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default SingleSearch;
