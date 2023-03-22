import React, { useState } from "react";
import { useParams } from "react-router-dom";

// components
import Header from "../../components/Header/Header";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// icons
import { GoReport } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiOutlineLink } from "react-icons/ai";

const SingleUser = () => {
  const params = useParams();

  // single user details
  const handleLoadingUserDetails = async () => {
    // send req
    return await postReq({ uid: params.uid }, "/api/user-info");
  };
  const {
    data: userData,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery([params.uid + "details"], handleLoadingUserDetails, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // single user verification url
  const handleLoadingUserVerification = async () => {
    // send req
    return await postReq({ uid: params.uid }, "/api/user-verification-url");
  };
  const {
    data: userUrlData,
    isLoading: userUrlLoading,
    refetch: userUrlRefetch,
  } = useQuery([params.uid + "url"], handleLoadingUserVerification, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // user leak reports
  const handleLoadingUserleaks = async () => {
    // send req
    return await postReq({ uid: params.uid }, "/api/user-leaks");
  };
  const {
    data: userLeaksData,
    isLoading: userLeaksLoading,
    refetch: userLeaksRefetch,
  } = useQuery([params.uid + "leaks"], handleLoadingUserleaks, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // user fomains and urls
  const handleLoadingUserUrlsAndDomains = async () => {
    // send req
    return await postReq({ uid: params.uid }, "/api/user-urls-domains");
  };
  const {
    data: userUrlsAndDomainsData,
    isLoading: userUrlsAndDomainsLoading,
    refetch: userUrlsAndDomainsRefetch,
  } = useQuery(
    [params.uid + "UrlsAndDomains"],
    handleLoadingUserUrlsAndDomains,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return (
    <>
      <Header page={"Single user"} />

      <div className="centerer">
        <div className="stats-container-jd user-blocks">
          <label
            className="stat-jd"
            htmlFor="user-details"
            onClick={() => userRefetch()}
          >
            <FiUser />
            <div>
              <p>User details</p>
              <p className="desc">
                Deatils about the user, email, actual plan...
              </p>
            </div>
          </label>
          <label
            className="stat-jd"
            htmlFor="account-verification"
            onClick={() => userUrlRefetch()}
          >
            <HiOutlinePhotograph />
            <div>
              <p>Account verification</p>
              <p className="desc">
                Actual status of the user photo ID verification
              </p>
            </div>
          </label>
          <label
            className="stat-jd"
            htmlFor="takedown-request"
            onClick={() => userLeaksRefetch()}
          >
            <GoReport />
            <div>
              <p>Takedown requests</p>
              <p className="desc">User takedown reauests</p>
            </div>
          </label>
          <label
            className="stat-jd"
            htmlFor="urlsanddomains"
            onClick={() => userUrlsAndDomainsRefetch()}
          >
            <AiOutlineLink />
            <div>
              <p>URLs and Domains</p>
              <p className="desc">
                User specified urls and domains to always skip
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* popups */}
      {/* user details */}
      <input type="checkbox" id="user-details" className="modal-toggle" />
      <label htmlFor="user-details" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">User details</h3>
          <div className="user-details-popup-jd">
            {/* loading */}
            {userLoading ? (
              <>
                <div className="blovk-jd">
                  <div className="item-parent">
                    <SkeletonTheme
                      baseColor="#8b8b8b35"
                      highlightColor="#f9fafb"
                    >
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                    </SkeletonTheme>
                  </div>
                </div>
                <div className="blovk-jd">
                  <div className="item-parent">
                    <SkeletonTheme
                      baseColor="#8b8b8b35"
                      highlightColor="#f9fafb"
                    >
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} />
                    </SkeletonTheme>
                  </div>
                </div>
              </>
            ) : null}

            {!userLoading ? (
              <>
                <div className="block-jd">
                  <h3 className="headeing-jd">Account details</h3>
                  <div className="item-parent">
                    <div className="item-title">Usernames:</div>
                    <div className="item-desc">
                      {userData?.payload?.usernames.map((elm, idx) => {
                        return <span key={idx}>{elm}, </span>;
                      })}
                    </div>
                  </div>
                  <div className="item-parent">
                    <div className="item-title">Name:</div>
                    <div className="item-desc">{userData?.payload?.name}</div>
                  </div>
                  <div className="item-parent">
                    <div className="item-title">Email:</div>
                    <div className="item-desc">{userData?.payload?.email}</div>
                  </div>
                  <div className="item-parent">
                    <div className="item-title">Verification:</div>
                    <div className="item-desc">
                      {userData?.payload?.verification === "false"
                        ? "not verified yet"
                        : userData?.payload?.verification}
                    </div>
                  </div>
                  <div className="item-parent">
                    <div className="item-title">Registration Date:</div>
                    <div className="item-desc">
                      {userData?.payload?.registrationDate.split("T")[0]}
                    </div>
                  </div>
                </div>
                <div className="block-jd">
                  <h3 className="headeing-jd">Membership details</h3>
                  <div className="item-parent">
                    <div className="item-title">Current Plan:</div>
                    <div className="item-desc">
                      {userData?.payload?.currentPlan}
                    </div>
                  </div>
                  <div className="item-parent">
                    <div className="item-title">Plan start date:</div>
                    <div className="item-desc">
                      {userData?.payload?.start.split("T")[0]}
                    </div>
                  </div>
                  <div className="item-parent">
                    <div className="item-title">Next due:</div>
                    <div className="item-desc">
                      {userData?.payload?.end === "1"
                        ? "never"
                        : userData?.payload?.end.split("T")[0]}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </label>
      </label>

      {/* account verification */}
      <input
        type="checkbox"
        id="account-verification"
        className="modal-toggle"
      />
      <label htmlFor="account-verification" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Account verification</h3>
          <div className="verification-box">
            <div className="image-box-jd">
              <div className="image-jd">
                {/* <img src="" alt="" /> */}

                {userUrlLoading ? "loading..." : null}
                {!userUrlLoading ? (
                  userUrlData?.payload?.url ? (
                    <a
                      href={userUrlData?.payload?.url}
                      target="_blank"
                      className="link"
                    >
                      <img src={userUrlData?.payload?.url} />
                    </a>
                  ) : (
                    <HiOutlinePhotograph />
                  )
                ) : null}
              </div>
              <div className="image-actions">
                {userUrlLoading ? "loading..." : null}
                {!userUrlLoading ? (
                  userUrlData?.payload?.url ? (
                    <a
                      href={userUrlData?.payload?.url}
                      target="_blank"
                      className="link"
                    >
                      View image
                    </a>
                  ) : (
                    <p>No image uploaded yet</p>
                  )
                ) : null}
              </div>
            </div>
            <div className="verification-box-actions">
              {userUrlLoading ? (
                <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                  <Skeleton count={1} height={30} />
                  <Skeleton count={1} height={30} />
                </SkeletonTheme>
              ) : null}

              {!userUrlLoading ? (
                userUrlData?.payload?.url ? (
                  <>
                    <button className="btn btn-primary">Approve account</button>
                    <button className="btn btn-error">
                      Reject verification
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary">
                    Request verification
                  </button>
                )
              ) : null}
            </div>
          </div>
        </label>
      </label>

      {/* takedown request */}
      <input type="checkbox" id="takedown-request" className="modal-toggle" />
      <label htmlFor="takedown-request" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Takedown requests</h3>
          <div className="takedown-request-jd">
            {userLeaksLoading ? (
              <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                <Skeleton count={1} height={30} />
                <Skeleton count={1} height={30} />
                <Skeleton count={1} height={30} />
              </SkeletonTheme>
            ) : null}

            {!userLeaksLoading
              ? userLeaksData?.payload?.map((elm, idx) => {
                  return (
                    <div
                      tabIndex={0}
                      className="collapse collapse-arrow step3-details"
                      key={idx}
                    >
                      <input type="checkbox" />
                      <div className="collapse-title">
                        <p>
                          Reported on:{" "}
                          {elm?.date ? elm?.date : elm.createdAt.split("T")[0]}
                        </p>
                      </div>
                      <div className="collapse-content reports-jd">
                        <ul>
                          <li>
                            <p>Website:</p>
                            <p>{elm.website}</p>
                          </li>
                          <li>
                            <p>Description:</p>
                            <p>{elm.desc}</p>
                          </li>

                          <button className="btn btn-primary">
                            Mark as handled
                          </button>
                        </ul>
                      </div>
                    </div>
                  );
                })
              : null}

            {userLeaksData?.payload && userLeaksData?.payload.length === 0 && (
              <p>No report yet</p>
            )}
          </div>
        </label>
      </label>

      {/* urls and domains */}
      <input type="checkbox" id="urlsanddomains" className="modal-toggle" />
      <label htmlFor="urlsanddomains" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">User URLs and Domains to skip</h3>
          <div className="takedown-request-jd">
            <div tabIndex={0} className="collapse collapse-arrow step3-details">
              <input type="checkbox" />
              <div className="collapse-title">
                <p>URLs</p>
              </div>
              <div className="collapse-content urls-domains-jd">
                {userUrlsAndDomainsLoading ? "loading..." : null}
                {!userUrlsAndDomainsLoading
                  ? userUrlsAndDomainsData?.payload?.urls.map((elm, idx) => {
                      return (
                        <a key={idx} href={elm.url} className="link">
                          {elm.url}
                        </a>
                      );
                    })
                  : null}

                {userUrlsAndDomainsData?.payload?.urls.length === 0 &&
                  "no url added yet"}
              </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow step3-details">
              <input type="checkbox" />
              <div className="collapse-title">
                <p>Domains</p>
              </div>
              <div className="collapse-content urls-domains-jd">
                {userUrlsAndDomainsLoading ? "loading..." : null}
                {!userUrlsAndDomainsLoading
                  ? userUrlsAndDomainsData?.payload?.domains.map((elm, idx) => {
                      return (
                        <a key={idx} href={elm.domains} className="link">
                          {elm.domains}
                        </a>
                      );
                    })
                  : null}
                {userUrlsAndDomainsData?.payload?.domains.length === 0 &&
                  "no domain added yet"}
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default SingleUser;
