import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // not found pages redirect to 404 page
  useEffect(() => {
    if (!location.pathname.includes("/404")) {
      navigate("/404");
    }
  }, [location.pathname]);

  return <div>404</div>;
};

export default NotFound;
