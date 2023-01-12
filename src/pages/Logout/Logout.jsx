import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notif from "../../helpers/notif";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
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
          `${process.env.REACT_APP_DOMAIN}/api/logout`,
          {
            mode: "cors",
            method: "GET",
            headers: headers,
            credentials: "include",
          }
        );

        const serverMessage = await response.json();

        notif(serverMessage.message);

        if (serverMessage.code === "ok") {
          window.location.reload(false);
          navigate("/");
        }
      } catch (err) {
        notif("server error try again later");
        console.log(err);
      }
    };
    handleLogout();
  }, []);

  return <div>Logout...</div>;
};

export default Logout;
