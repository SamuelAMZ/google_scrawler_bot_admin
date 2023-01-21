import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import notify
import notif from "../../helpers/notif";

// csv
import { CSVLink, CSVDownload } from "react-csv";

const SingleSearch = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [step2Loading, setStep2Loading] = useState(false);
  const [startStep3, setStartStep3] = useState(false);
  const [step3Loading, setStep3Loading] = useState(false);
  const [progress, setProgress] = useState({ total: 0, done: 0 });
  // csv state
  const [csvRows, setCsvRows] = useState({
    keyword: true,
    urls: true,
    keywordReport: true,
    videoReport: true,
    date: true,
  });
  const [csvReady, setCsvReady] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [csvData, setCsvData] = useState(null);

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

  // //// remove single search
  const handleRemovingSearch = async () => {
    // send req
    return await postReq({ id: params.searchid }, "/api/remove-single-earch");
  };

  const {
    data: removeConfirmationData,
    isLoading: loadingRemove,
    isError: errorRemove,
    refetch: sendRemove,
  } = useQuery([`${params.searchid}remove`], handleRemovingSearch, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const removeSingleSearch = async () => {
    sendRemove();
  };

  // give comfirmation once remove done or error message
  useEffect(() => {
    if (removeConfirmationData && removeConfirmationData.code === "ok") {
      notif("search removed");

      // redirect to home
      navigate("/home");
    }
    if (removeConfirmationData && removeConfirmationData.code === "bad") {
      notif("error removing search, try again later");
    }
  }, [removeConfirmationData]);

  // ///// relaunch
  const relauchSearch = () => {
    if (!pageData) {
      return notif("something wrong, reload the page");
    }
    const relunchSearchName = pageData.payload.keyword
      ? pageData.payload.keyword
      : "";
    const relaunchNumberOfPage = pageData.payload.numberOfPagesToVisitOnGoogle
      ? pageData.payload.numberOfPagesToVisitOnGoogle
      : "";
    const relauchUrlsToSkip = pageData.payload.exactLinks
      ? pageData.payload.exactLinks
      : "";
    const relauchDomainToSkip = pageData.payload.domainsLinks
      ? pageData.payload.domainsLinks
      : "";

    // redirect to new search form
    window.location = `/new?keyword=${relunchSearchName}&num=${relaunchNumberOfPage}&urls=${relauchUrlsToSkip}&doms=${relauchDomainToSkip}`;
  };

  // //// download csv
  const handleRowsChecked = (e, type) => {
    if (type === "keyword") {
      setCsvRows({
        keyword: e.target.checked,
        urls: csvRows.urls,
        keywordReport: csvRows.keywordReport,
        videoReport: csvRows.videoReport,
        date: csvRows.date,
      });
    }
    if (type === "urls") {
      setCsvRows({
        keyword: csvRows.keyword,
        urls: e.target.checked,
        keywordReport: csvRows.keywordReport,
        videoReport: csvRows.videoReport,
        date: csvRows.date,
      });
    }
    if (type === "keywordReport") {
      setCsvRows({
        keyword: csvRows.keyword,
        urls: csvRows.urls,
        keywordReport: e.target.checked,
        videoReport: csvRows.videoReport,
        date: csvRows.date,
      });
    }
    if (type === "videoReport") {
      setCsvRows({
        keyword: csvRows.keyword,
        urls: csvRows.urls,
        keywordReport: csvRows.keywordReport,
        videoReport: e.target.checked,
        date: csvRows.date,
      });
    }
    if (type === "date") {
      setCsvRows({
        keyword: csvRows.keyword,
        urls: csvRows.urls,
        keywordReport: csvRows.keywordReport,
        videoReport: csvRows.videoReport,
        date: e.target.checked,
      });
    }
  };

  const handleDownloadCSV = async (e) => {
    e.preventDefault();

    // set download action to false
    setCsvReady(false);

    const reqData = {
      id: params.searchid,
      keyword: csvRows.keyword,
      urls: csvRows.urls,
      keywordReport: csvRows.keywordReport,
      videoReport: csvRows.videoReport,
      date: csvRows.date,
    };

    // loading download
    setDownloadLoading(true);

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
        `${process.env.REACT_APP_DOMAIN}/api/download-csv`,
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
      setDownloadLoading(false);

      if (serverMessage.code === "500") {
        console.log(serverMessage.message);
      }

      // set data
      if (serverMessage.code === "ok") {
        // create csv
        createCsv(serverMessage.payload);
      }
    } catch (err) {
      console.log(err);
      setDownloadLoading(false);
    }
  };

  const createCsv = (csvToCreate) => {
    const headers = [
      csvToCreate.keyword && "KEYWORD",
      csvToCreate.urls && "URLS VISITED",
      csvToCreate.keywordReport && "KEYWORD FOUND",
      csvToCreate.videoReport && "VIDEO FOUND",
      csvToCreate.date && "SEARCH DATE",
    ];
    const csvBody = [];

    // populate scvBody
    csvToCreate.urls.forEach((elm, idx) => {
      if (idx === 0) {
        csvBody.push([
          csvToCreate.keyword,
          csvToCreate.urls[0],
          csvToCreate.keywordReport &&
            (csvToCreate.keywordReport[0] ? "YES" : "NO"),
          csvToCreate.videoReport &&
            (csvToCreate.videoReport[0] ? "YES" : "NO"),
          csvToCreate.date && csvToCreate.date.split("T")[0],
        ]);
      } else {
        csvBody.push([
          "",
          csvToCreate.urls[idx],
          csvToCreate.keywordReport &&
            (csvToCreate.keywordReport[idx] ? "YES" : "NO"),
          csvToCreate.videoReport &&
            (csvToCreate.videoReport[idx] ? "YES" : "NO"),
          csvToCreate.date && "",
        ]);
      }
    });

    const csvData = [headers, ...csvBody];

    // set csv data
    setCsvData(csvData);
  };

  useEffect(() => {
    if (csvData) {
      // download csv
      setCsvReady(csvData);
    }
  }, [csvData]);

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
                  <h3>Target Tabs:</h3>
                  <p>{pageData.payload.tab ? pageData.payload.tab : "all"}</p>
                </div>

                <div>
                  <h3>Search Date:</h3>
                  <p>{pageData.payload.createdAt.split("T")[0]}</p>
                </div>

                <span></span>

                {/* actions */}
                <div>
                  {loadingRemove ? (
                    <button className="btn w-full loading">Detecting...</button>
                  ) : (
                    <button className="btn w-full" onClick={removeSingleSearch}>
                      Delete This Search
                    </button>
                  )}
                </div>
                <div>
                  <button className="btn w-full" onClick={relauchSearch}>
                    Re-Launch
                  </button>
                </div>
                <div>
                  {pageData.payload.status === "done" ? (
                    <label
                      htmlFor="choose-csv-rows"
                      className="btn btn-primary w-full"
                    >
                      Download CSV
                    </label>
                  ) : (
                    <label className="btn btn-primary w-full " disabled>
                      Download CSV
                    </label>
                  )}
                </div>

                {/* download csv choose rows modal */}
                <input
                  type="checkbox"
                  id="choose-csv-rows"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box relative">
                    <label
                      htmlFor="choose-csv-rows"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <h3 className="text-lg font-bold">
                      Choose the rows that you want in the CSV
                    </h3>
                    <div className="check-rows">
                      <form onSubmit={handleDownloadCSV}>
                        <div className="inputs">
                          <div>
                            <input
                              type="checkbox"
                              id="csv-keyword"
                              className="checkbox"
                              disabled
                              checked={csvRows.keyword}
                              onChange={(e) => handleRowsChecked(e, "keyword")}
                            />
                            <label htmlFor="csv-keyword">Keyword</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="csv-url"
                              className="checkbox"
                              disabled
                              checked={csvRows.urls}
                              onChange={(e) => handleRowsChecked(e, "urls")}
                            />
                            <label htmlFor="csv-url">URLs visited</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="csv-keyword-report"
                              className="checkbox"
                              checked={csvRows.keywordReport}
                              onChange={(e) =>
                                handleRowsChecked(e, "keywordReport")
                              }
                            />
                            <label htmlFor="csv-keyword-report">
                              URLs keyword report
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="csv-video-report"
                              className="checkbox"
                              checked={csvRows.videoReport}
                              onChange={(e) =>
                                handleRowsChecked(e, "videoReport")
                              }
                            />
                            <label htmlFor="csv-video-report">
                              URLs video report
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="csv-date"
                              className="checkbox"
                              checked={csvRows.date}
                              onChange={(e) => handleRowsChecked(e, "date")}
                            />
                            <label htmlFor="csv-date">Search date</label>
                          </div>
                        </div>

                        {/* download btn */}
                        {downloadLoading ? (
                          <button
                            className="btn btn-primary w-full loading"
                            onClick={handleDownloadCSV}
                          >
                            Loading...
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary w-full"
                            onClick={handleDownloadCSV}
                          >
                            Download
                          </button>
                        )}
                      </form>

                      {/* download csv */}
                      {/* csv link */}
                      {csvReady ? (
                        <CSVDownload
                          data={csvReady}
                          filename={"takedownly.csv"}
                          target="_blank"
                        />
                      ) : (
                        false
                      )}
                    </div>
                  </div>
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
