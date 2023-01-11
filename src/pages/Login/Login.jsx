import React, { useState } from "react";

// third party dependencie
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  // captcha
  const [captchaState, setCaptachaState] = useState(false);
  const handleCaptcha = (e) => {
    if (e) {
      setCaptachaState(e);
    } else {
      setCaptachaState(false);
    }
  };

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
        <form>
          <label htmlFor="email">Email</label>
          <div className="inputs">
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full"
            />
          </div>

          {/* recaptcha */}
          <ReCAPTCHA
            //   className="thecaptcha"
            sitekey="6Le02eYjAAAAAD49XpN_CUXtsr-FOeXkavLRwIyg"
            onChange={handleCaptcha}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
