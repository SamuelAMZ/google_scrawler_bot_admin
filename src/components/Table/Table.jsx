import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// icons
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { IoFilter } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Table = ({ conf }) => {
  const [pageNumber, setPageNumber] = useState("0");
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();

  // get table data
  const handleTableData = async () => {
    // send req
    return await postReq(
      {
        page: pageNumber,
        perPage: conf.perPage,
        searchKeyword,
      },
      "/api/pagination"
    );
  };

  const {
    data: tableData,
    isLoading: tableLoading,
    status,
    refetch: getPaginate,
  } = useQuery(
    [location.pathname, pageNumber, searchKeyword],
    handleTableData,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  //  handle next and prev
  const handleNext = () => {
    // check if page available
    if (
      Number(pageNumber) + 1 ===
      Math.ceil(tableData.payload.totalItemsLength / Number(conf.perPage))
    ) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) + 1));
  };

  const handlePrev = () => {
    // check if page available
    if (Number(pageNumber) === 0) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) - 1));
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    setPageNumber("0");
    getPaginate();
  };

  return (
    <div className="overflow-x-auto table-container">
      {/* header */}
      <div className="table-header">
        <div className="actions">
          <button className="btn changed">
            <IoFilter /> <p>Actions</p>
          </button>
          <a href="/new">
            <button className="btn btn-primary">
              <BsPlusLg /> <p>New Search</p>
            </button>
          </a>
          {tableData && tableData.code === "ok" && (
            <p>{tableData.payload.totalItemsLength} items</p>
          )}
        </div>
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search in table"
              className="input input-bordered w-full"
              value={searchKeyword}
              onChange={(e) => {
                setPageNumber("0");
                setSearchKeyword(e.target.value);
              }}
            />
            <button className="btn btn-primary">
              <FiSearch />
            </button>
          </form>
        </div>
      </div>

      {/* table */}
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>URLs Crawled</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* loading */}
          {tableLoading &&
            new Array(Number(conf.perPage)).fill("").map((elm, idx) => {
              return (
                <tr key={idx}>
                  <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                  </SkeletonTheme>
                </tr>
              );
            })}

          {/* actual data */}
          {tableData &&
            tableData.code === "ok" &&
            tableData.payload.list.map((elm, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </td>
                  <td>
                    <Link to={`/search/${elm._id}`}>
                      {elm.keyword.substr(0, 20)}
                      {elm.keyword.length >= 20 && "..."}
                    </Link>
                  </td>
                  <td>{elm.status}</td>
                  <td>{elm.allResults.length}</td>
                  <td>{elm.createdAt.split("T")[0]}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/search/${elm._id}`}>
                        <AiOutlineEdit />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* footer */}
      <div className="table-footer">
        {tableData && tableData.code === "ok" && (
          <div className="elms">
            <button className="btn" onClick={handlePrev}>
              Previous
            </button>
            <p>
              Page {Number(pageNumber) + 1} of{" "}
              {Math.ceil(
                tableData.payload.totalItemsLength / Number(conf.perPage)
              )}
            </p>

            <button className="btn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
