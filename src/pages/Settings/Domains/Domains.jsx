import React, { useState } from "react";

// components
import Table from "../../../components/Table/Table";

// helpers
import notif from "../../../helpers/notif";

const Domains = () => {
  const [tableConf, setTableCounf] = useState({
    perPage: "10",
    target: "domains",
    refresh: 0,
  });
  const [newDomain, setNewDomain] = useState("");
  const [addingNew, setAddingNew] = useState(false);

  // add new domain
  const handleAddNewDomain = async (e) => {
    e.preventDefault();

    if (!newDomain) {
      return notif("type in a domain name");
    }

    const reqData = {
      domain: newDomain,
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
        `${process.env.REACT_APP_DOMAIN}/api/new-domain`,
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
        notif("domain added successfully");

        // clear fields
        setNewDomain("");

        // trigger table refresh
        setTableCounf({
          perPage: "10",
          target: "domains",
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
        <h1>Domains to always skip</h1>

        <div className="domains-table">
          <Table conf={tableConf} />
        </div>
      </div>

      {/* add new */}
      <div className="add-new">
        <form onSubmit={handleAddNewDomain}>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Type domain name here"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
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

export default Domains;
