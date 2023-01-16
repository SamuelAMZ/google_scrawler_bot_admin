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
  const [step2Loading, setStep2Loading] = useState(false);
  const [startStep3, setStartStep3] = useState(false);
  const [step3Loading, setStep3Loading] = useState(false);
  const [progress, setProgress] = useState({ total: 0, done: 0 });

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

      // progress
      setProgress({
        total: searchData.payload.linksStats.allLinksCount,
        done: searchData.payload.linksStats.visitedCount,
      });
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
  const step2req = async () => {
    const reqData = { id: params.searchid };

    // loading step2
    setStep2Loading(true);

    // sending request
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/filterResult`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(reqData),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      // loading step2
      setStep2Loading(false);

      if (serverMessage.code === "500") {
        console.log(serverMessage.message);
      }

      // set data
      if (serverMessage.code === "ok") {
        setPageData(serverMessage);
      }
    } catch (err) {
      console.log(err);
      setStep2Loading(false);
    }
  };

  // control when send the req
  useEffect(() => {
    if (pageData && pageData.payload.status === "step 2") {
      step2req();
    } else {
      console.log("already filtered");
    }
  }, [pageData]);

  // //////// sending step 3 request
  const step3req = async () => {
    const reqData = { id: params.searchid };

    // loading step2
    setStep2Loading(true);

    // sending request
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/visit-each-link`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(reqData),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      // loading step2
      setStep3Loading(false);

      if (serverMessage.code === "500") {
        console.log(serverMessage.message);
      }

      // set data
      if (serverMessage.code === "ok") {
        setPageData(serverMessage);
      }
    } catch (err) {
      console.log(err);
      setStep3Loading(false);
    }
  };

  useEffect(() => {
    if (startStep3) {
      step3req();
      // reset starter
      setStartStep3(false);
    }
  }, [startStep3]);

  // //////// request to sed each 10sec to update progress of step 3
  const { data: latestData, refetch: updateProgress } = useQuery(
    ["latest", progress],
    handlePageLoading,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    if (startStep3) {
      // set interval
      let intervalId = setInterval(() => {
        updateProgress();
      }, [10000]);
    }
  }, [startStep3]);

  // setting data
  useEffect(() => {
    if (latestData && latestData.code === "ok") {
      setPageData(latestData);

      // progress
      setProgress({
        total: latestData.payload.linksStats.allLinksCount,
        done: latestData.payload.linksStats.visitedCount,
      });
    }
  }, [latestData]);

  // clear interval
  useEffect(() => {
    if (pageData && pageData.payload.status === "done") {
      console.log("cleared");
      let highestTimeoutId = setTimeout(";");
      for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }

      // set progress a last time
      setProgress({
        total: pageData.payload.linksStats.allLinksCount,
        done: pageData.payload.linksStats.visitedCount,
      });
    }
  }, [pageData]);

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
                  {/* actions */}
                  <div className="steps-actions">
                    <button className="btn ">More details</button>
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

                  {/* actions */}
                  <div className="steps-actions">
                    <button className="btn ">More details</button>
                  </div>
                </div>
              </div>
              {/* step 3 */}
              <div className="step-elements">
                <div className="elm">
                  <p>Step Name</p>
                  <p>Status</p>
                  <p>Progress</p>
                  <p>URLs results</p>
                </div>
                <div className="elm">
                  <p>Visit Filtered URLs One By One</p>
                  <p>{pageData.payload.steps.step3}</p>
                  <div className="progress-status">
                    <progress
                      className="progress progress-primary w-56"
                      value={progress.done}
                      max={progress.total}
                    ></progress>
                    <p>
                      {progress.done}/{progress.total} URLs visited
                    </p>
                  </div>

                  <div className="urlList">
                    {pageData.payload.visitResults.length === 0 && (
                      <Skeleton count={6} />
                    )}
                    {pageData.payload.visitResults.length > 0 && (
                      <>
                        {pageData.payload.visitResults.map((resElm, idx) => {
                          return (
                            <div
                              key={idx}
                              tabIndex={0}
                              className="collapse collapse-arrow step3-details"
                            >
                              <input type="checkbox" />
                              <div className="collapse-title">
                                <p>
                                  {resElm.link.substr(0, 50)}
                                  {resElm.link.length > 50 ? "..." : ""}{" "}
                                </p>
                              </div>
                              <div className="collapse-content">
                                <div className="step3-data">
                                  {/* keyword */}
                                  <div className="step3-divs">
                                    <h3>Keyword combination tested</h3>
                                    {/* keywordCombinations */}
                                    <ul>
                                      {resElm.keywordCombinations.map(
                                        (combs, combsIdx) => {
                                          return (
                                            <li key={combsIdx}>
                                              <p>{combs}</p>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </div>
                                  {/* keyword found data */}
                                  <div className="step3-divs">
                                    <h3>Keyword search report</h3>
                                    <ul>
                                      <li>
                                        <p>
                                          Keyword found on page?{" "}
                                          {resElm.keywordData.isMatch
                                            ? "YES"
                                            : "NO"}
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          Keyword found{" "}
                                          {resElm.keywordData.resultCount}{" "}
                                          time(s) on page
                                        </p>
                                      </li>
                                    </ul>
                                  </div>

                                  {/* video found data */}
                                  <div className="step3-divs">
                                    <h3>Video search report</h3>
                                    <ul>
                                      <li>
                                        <p>
                                          Video found on page?{" "}
                                          {resElm.videoData.isVideo
                                            ? "YES"
                                            : "NO"}
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          Video found {resElm.videoData.count}{" "}
                                          time(s) on page
                                        </p>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  {/* actions */}
                  <div className="steps-actions">
                    {pageData && pageData.payload.status !== "done" && (
                      <button
                        className={
                          (pageData &&
                            pageData.payload.steps.step3 === "scraping...") ||
                          startStep3
                            ? "btn btn-primary loading"
                            : "btn btn-primary"
                        }
                        onClick={() => setStartStep3(true)}
                      >
                        {(pageData &&
                          pageData.payload.steps.step3 === "scraping...") ||
                        startStep3
                          ? "Scraping..."
                          : "Start Visiting"}
                      </button>
                    )}

                    <button className="btn ">More details</button>
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
