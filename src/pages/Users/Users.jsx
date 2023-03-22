import React from "react";

// components
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

const Users = () => {
  const tableConf = { perPage: "10", target: "users" };
  return (
    <>
      <Header page={"All users"} />

      <div className="centerer">
        {/* table */}
        <Table conf={tableConf} />
      </div>
    </>
  );
};

export default Users;
