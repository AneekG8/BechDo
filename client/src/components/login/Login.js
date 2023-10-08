import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import "./Login.css";
import LandingNavbar from "../LandingNavbar/LandingNavbar";

const Login = () => {
  const [state, setState] = useState({
    loading: false,
    loginSuccess: false,
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    error: "",
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: {
        value: e.target.value,
        error: "",
      },
      error: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    axios
      .post("http://localhost:5000/api/auth/login", {
        email: state.email.value,
        password: state.password.value,
      })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          loginSuccess: true,
        }));
        //loading buffer
        setTimeout(() => {
          window.location.assign("/home");
        }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        const { name, message } = err.response.data;

        if (name === "server") {
          setState((prevState) => ({
            ...prevState,
            error: message,
            loading: false,
            loginSuccess: false,
          }));
          return;
        }

        setState((prevState) => ({
          ...prevState,
          [name]: {
            value: prevState[name].value,
            error: message,
          },
          loading: false,
          loginSuccess: false,
        }));
      });
  };

  const googleSuccess = (response) => {
    axios
      .post("/api/auth/login/oAuth", { email: response.profileObj.email }) //make it ? strategy = oAuth
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          loginSuccess: true,
        }));

        setTimeout(() => {
          window.location.assign("/home");
        }, 500);
      })
      .catch((err) => {
        localStorage.setItem("profile", JSON.stringify(response.profileObj));
        window.location.assign(`/signup?strategy=oAuth`);
      });
  };

  const googleFailure = (res) => {
    console.log(res);
    setState({ ...state, error: res.error, loginSuccess: false });
  };

  return (
    <div className="" id="login">
      <LandingNavbar activeLink="login" />

      <div className="vh-100 row p-0 m-0">
        {/* <div style={{height: "56px"}}></div> */}

        <div
          className="col-4 d-none d-md-flex justify-content-center align-items-center"
          id="sideDisplay"
        >
          <h1 className="display-3" id="title">
            {" "}
            Bech Do
          </h1>
        </div>

        <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
          {state.loginSuccess ? (
            <div className="text-center">
              <div className="alert alert-success" role="alert">
                login succesful !{" "}
                <i
                  className="fa fa-check-circle"
                  style={{ fontSize: "24px" }}
                ></i>
              </div>
              <div
                className="text-center spinner-border spinner-border-sm text-dark"
                role="status"
              >
                <span className="text-small sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="">
              <h1 className="mt-5 display-6 text-dark">
                {" "}
                <b>Sign In </b>{" "}
              </h1>

              <p className="text-secondary"> Enter your details below</p>

              <GoogleLogin
                clientId="769379499448-mmo1evlm2b35tjmllal38kf79hufh5l9.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                className="w-100 mb-2 border"
              />

              <hr className="w-100" />

              <form onSubmit={handleSubmit} className="d-block">
                <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control-sm w-100"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleInputChange}
                    required
                  />
                  <p style={{ color: "red", fontSize: "14px" }} className="m-0">
                    {" "}
                    {state.email.error}{" "}
                  </p>
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control-sm w-100"
                    name="password"
                    placeholder="password"
                    onChange={handleInputChange}
                    required
                  />
                  <p style={{ color: "red", fontSize: "14px" }} className="m-0">
                    {" "}
                    {state.password.error}{" "}
                  </p>
                  <p className="text-end">
                    <a
                      href="/change_password"
                      style={{ fontSize: "14px" }}
                      className="link-light"
                    >
                      Forgot Password
                    </a>
                  </p>
                </div>

                <button className="btn btn-dark btn-sm w-100 mb-1">
                  {state.loading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="text-small sr-only">Loading...</span>
                    </div>
                  ) : (
                    "login"
                  )}
                </button>
              </form>

              <p style={{ color: "red", fontSize: "14px" }} className="mb-2">
                {" "}
                {state.error}
              </p>

              <p className="mb-0">
                don't have an account?{" "}
                <a href="/signup" className="link-light">
                  Sign up
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
