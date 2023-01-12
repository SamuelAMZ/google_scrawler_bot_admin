import React, { useState } from "react";

// helpers
import postReq from "../../../helpers/postReq";

// react query
import { useQuery } from "react-query";

const CreateNewAccount = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChanges = (e, type) => {
    if (type === "username") {
      setData({
        username: e.target.value,
        name: data.name,
        email: data.email,
        password: data.password,
      });
    }
    if (type === "name") {
      setData({
        username: data.username,
        name: e.target.value,
        email: data.email,
        password: data.password,
      });
    }
    if (type === "email") {
      setData({
        username: data.username,
        name: data.name,
        email: e.target.value,
        password: data.password,
      });
    }
    if (type === "password") {
      setData({
        username: data.username,
        name: data.name,
        email: data.email,
        password: e.target.value,
      });
    }
  };

  // handling registration function
  const handleSubmitions = async () => {
    // verify if username don't have spaces and special caracters
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(data.username)) {
      // notif("verify username no space, no special characters");
      return;
    }

    if (
      data.username !== "" &&
      data.name !== "" &&
      data.email !== "" &&
      data.password !== ""
    ) {
      const newUser = {
        username: data.username.trim(),
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password.trim(),
      };

      // send req
      return await postReq(newUser, "/api/new-account");
    } else {
      // alert empty
      console.log("empty");
    }
  };

  const {
    data: newUserData,
    isLoading,
    refetch: sendPost,
  } = useQuery(["new"], handleSubmitions, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleNewAccount = (e) => {
    e.preventDefault();

    // send req
    sendPost();
  };

  return (
    <div className="your-account">
      {/* create user */}
      <div className="change change-name">
        <label htmlFor="keyword">Create New Admin User</label>
        <form onSubmit={handleNewAccount}>
          <input
            id="name"
            type="text"
            placeholder="name"
            className="input input-bordered w-full"
            value={data.name}
            onChange={(e) => handleChanges(e, "name")}
          />
          <input
            id="username"
            type="text"
            placeholder="username"
            className="input input-bordered w-full"
            value={data.username}
            onChange={(e) => handleChanges(e, "username")}
          />
          <input
            id="email"
            type="text"
            placeholder="email"
            className="input input-bordered w-full"
            value={data.email}
            onChange={(e) => handleChanges(e, "email")}
          />
          <input
            id="keyword"
            type="text"
            placeholder="password"
            className="input input-bordered w-full"
            value={data.password}
            onChange={(e) => handleChanges(e, "password")}
          />
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewAccount;
