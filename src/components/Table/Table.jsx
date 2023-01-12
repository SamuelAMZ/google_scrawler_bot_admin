import React, { useState, useEffect } from "react";

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
  const [pageNumber, setPageNumber] = useState("1");

  // get table data
  const handleTableData = async () => {
    // send req
    return await postReq(
      { page: pageNumber, perPage: conf.perPage },
      "/api/pagination"
    );
  };

  const {
    data: tableData,
    isLoading: tableLoading,
    status,
    refetch: getPaginate,
  } = useQuery(["table", pageNumber], handleTableData, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  //  handle next and prev
  const handleNext = () => {
    // check if page available
    if (Number(pageNumber) === Number(conf.perPage) - 1) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) + 1));
  };

  const handlePrev = () => {
    // check if page available
    if (Number(pageNumber) === 1) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) - 1));
  };

  return (
    <div className="overflow-x-auto table-container">
      {/* header */}
      <div className="table-header">
        <div className="actions">
          <button className="btn changed">
            <IoFilter /> <p>Actions</p>
          </button>
          <button className="btn btn-primary">
            <BsPlusLg /> <p>New Search</p>
          </button>
          {/* <p>0 elment selected</p> */}
        </div>
        <div className="search">
          <form>
            <input
              type="text"
              placeholder="Search in table"
              className="input input-bordered w-full"
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
            new Array(Number(conf.perPage)).fill("").map((elm) => {
              return (
                <tr>
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
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </td>
                  <td>{elm.keyword}</td>
                  <td>{elm.status}</td>
                  <td>{elm.allResults.length}</td>
                  <td>{elm.createdAt.split("T")[0]}</td>
                  <td>
                    <div className="actions">
                      <AiOutlineDelete />
                      <AiOutlineEdit />
                      <AiOutlineArrowDown />
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
              Page {pageNumber} of{" "}
              {Math.floor(
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
