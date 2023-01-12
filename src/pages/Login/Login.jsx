// built in hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// react query
import { useQuery } from "react-query";
// custom  hook
import postReq from "../../helpers/postReq";
import notif from "../../helpers/notif";

const Login = () => {
  // login to site
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  // useQuery from React query
  const handlePostrequest = async () => {
    // sending data for validation and login to backend
    const inputData = { ...formInputs };

    // post request
    return await postReq(inputData, "/api/login");
  };

  const {
    data,
    isLoading,
    refetch: sendPost,
  } = useQuery(["login"], handlePostrequest, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // check if an element from form is empty
    if (!formInputs.email || !formInputs.password) {
      console.log("error");
      notif("verify inputs and captcha");
      return;
    }

    // send req
    sendPost();
  };

  // after check credentials
  const navigate = useNavigate();
  useEffect(() => {
    // redirect to 2fa hash page
    if (data && data.code === "ok") {
      navigate(`/home`);
    }
    if (data && data.code === "bad") {
      notif(data.message);
    }
  }, [data]);

  return (
    <div className="login-f">
      <div className="login-container">
        <div className="heading">
          {/* logo */}
          <h1>Admin</h1>

          {/* login text */}
          <h2>Log in to the dashboard</h2>
        </div>

        {/* form */}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <div className="inputs">
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full"
              value={formInputs.email}
              onChange={(e) =>
                setFormInputs({
                  email: e.target.value,
                  password: formInputs.password,
                })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full"
              value={formInputs.password}
              onChange={(e) =>
                setFormInputs({
                  email: formInputs.email,
                  password: e.target.value,
                })
              }
            />
          </div>

          {isLoading && (
            <button className="btn btn-primary loading">loading...</button>
          )}
          {!isLoading && <button className="btn btn-primary">Login</button>}
        </form>
      </div>
    </div>
  );
};

export default Login;
