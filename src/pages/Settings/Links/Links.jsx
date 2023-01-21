import React, { useState } from "react";

// components
import Table from "../../../components/Table/Table";

// helpers
import notif from "../../../helpers/notif";

const Links = () => {
  const [tableConf, setTableCounf] = useState({
    perPage: "10",
    target: "urls",
    refresh: 0,
  });
  const [newUrl, setNewUrl] = useState("");
  const [addingNew, setAddingNew] = useState(false);

  // add new domain
  const handleAddNewUrl = async (e) => {
    e.preventDefault();

    if (!newUrl) {
      return notif("type in a url");
    }

    const reqData = {
      url: newUrl,
    };

    // loading download
    setAddingNew(true);

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
        `${process.env.REACT_APP_DOMAIN}/api/new-url`,
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
      setAddingNew(false);

      if (serverMessage.code === "500") {
        console.log(serverMessage.message);
      }

      // set data
      if (serverMessage.code === "ok") {
        // update domains

        // show success message
        notif("url added successfully");

        // clear fields
        setNewUrl("");

        // trigger table refresh
        setTableCounf({
          perPage: "10",
          target: "urls",
          refresh: tableConf.refresh + 1,
        });
      }
    } catch (err) {
      console.log(err);
      setAddingNew(false);
    }
  };

  return (
    <div className="settings-domains">
      {/* list domains */}
      <div className="domains-list">
        <h1>URLs to always skip</h1>

        <div className="domains-table">
          <Table conf={tableConf} />
        </div>
      </div>

      {/* add new */}
      <div className="add-new">
        <form onSubmit={handleAddNewUrl}>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Type the URL here"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          {addingNew ? (
            <button className="btn btn-primary loading">Adding...</button>
          ) : (
            <button className="btn btn-primary">Add new</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Links;
