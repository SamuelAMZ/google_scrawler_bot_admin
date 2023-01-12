import React from "react";

// componenets
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

const Searches = () => {
  const tableConf = { perPage: "20" };

  return (
    <>
      <Header page={"All Searches"} />

      <div className="searches-container centerer">
        {/* table */}
        <Table conf={tableConf} />
      </div>
    </>
  );
};

export default Searches;
