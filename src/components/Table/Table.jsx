import React from "react";

// icons
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { IoFilter } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const Table = ({ data }) => {
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
          <tr>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>Test name</td>
            <td>Finished</td>
            <td>125</td>
            <td>08/01/2023</td>
            <td>
              <div className="actions">
                <AiOutlineDelete />
                <AiOutlineEdit />
                <AiOutlineArrowDown />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>Test name</td>
            <td>Finished</td>
            <td>125</td>
            <td>08/01/2023</td>
            <td>
              <div className="actions">
                <AiOutlineDelete />
                <AiOutlineEdit />
                <AiOutlineArrowDown />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>Test name</td>
            <td>Finished</td>
            <td>125</td>
            <td>08/01/2023</td>
            <td>
              <div className="actions">
                <AiOutlineDelete />
                <AiOutlineEdit />
                <AiOutlineArrowDown />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>Test name</td>
            <td>Finished</td>
            <td>125</td>
            <td>08/01/2023</td>
            <td>
              <div className="actions">
                <AiOutlineDelete />
                <AiOutlineEdit />
                <AiOutlineArrowDown />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>Test name</td>
            <td>Finished</td>
            <td>125</td>
            <td>08/01/2023</td>
            <td>
              <div className="actions">
                <AiOutlineDelete />
                <AiOutlineEdit />
                <AiOutlineArrowDown />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>Test name</td>
            <td>Finished</td>
            <td>125</td>
            <td>08/01/2023</td>
            <td>
              <div className="actions">
                <AiOutlineDelete />
                <AiOutlineEdit />
                <AiOutlineArrowDown />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>Test name</td>
            <td>Finished</td>
            <td>125</td>
            <td>08/01/2023</td>
            <td>
              <div className="actions">
                <AiOutlineDelete />
                <AiOutlineEdit />
                <AiOutlineArrowDown />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* footer */}
      <div className="table-footer">
        <div className="elms">
          <button className="btn">Previous</button>
          <p>Page 1 of 10</p>
          <button className="btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Table;
