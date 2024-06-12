import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";

import bg1 from "../../assets/images/bg/bg-lines-one.png";

import {
  FiHome,
  AiFillFacebook,
  SlSocialGoogle,
} from "../../assets/icons/vander";

import { useForm } from "react-hook-form";
import { login } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    try {
      const response = await login(data);
      console.log(response);
      if (response) {
        dispatch(
          setAuth({
            _id: response.admin._id,
            mobile: response.admin.mobile,
            name: response.admin.name,
            isAuthenticated: true,
            token: response.token,
            refreshToken: response.refreshToken,
          })
        );
      }
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
  return (
    <>
      <div className="back-to-home rounded d-none d-sm-block">
        <Link to="/index" className="btn btn-icon btn-primary">
          <FiHome className="icons" />
        </Link>
      </div>

      <section
        className="bg-home d-flex bg-light align-items-center"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "center" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-6 col-sm-4">
              {/* <img
                src={logoDark}
                height="22"
                className="mx-auto d-block"
                alt=""
              /> */}
              <div
                className="card login-page shadow mt-4 rounded border-0"
                style={{ height: "400px" }}
              >
                <div className="card-body">
                  <h3 className="text-center">
                    <span className="text-decoration-underline">
                      Better-Meal
                    </span>
                  </h3>
                  <h4 className="text-center">Sign In</h4>
                  <form
                    className="login-form mt-4"
                    onSubmit={handleSubmit(handleLogin)}
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Your Email <span className="text-danger">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            required=""
                            {...register("email", {
                              required: true,
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regular expression for 10 digits
                                message: "Please enter a valid email Id",
                              },
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                          />
                          {errors.email && (
                            <p role="alert" className="text-danger">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-5">
                          <label className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("password", {
                              required: true,
                              pattern: {
                                //value: /^[0-9]{4}$/, // Regular expression for 6-digit OTP
                                message: "Please enter a valid password",
                              },
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                          />
                          {errors.password && (
                            <p role="alert" className="text-danger">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                className="form-check-input align-middle"
                                type="checkbox"
                                value=""
                                id="remember-check"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="remember-check"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <Link
                            to="/forgot-password"
                            className="text-dark h6 mb-0"
                          >
                            Forgot password ?
                          </Link>
                        </div>
                      </div> */}
                      <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                          <button className="btn btn-primary">Sign in</button>
                        </div>
                      </div>

                      {/* <div className="col-lg-12 mt-3 text-center">
                        <h6 className="text-muted">Or</h6>
                      </div>

                      <div className="col-6 mt-3">
                        <div className="d-grid">
                          <Link to="#" className="btn btn-soft-primary">
                            <AiFillFacebook /> Facebook
                          </Link>
                        </div>
                      </div>

                      <div className="col-6 mt-3">
                        <div className="d-grid">
                          <Link to="#" className="btn btn-soft-primary">
                            <SlSocialGoogle /> Google
                          </Link>
                        </div>
                      </div> */}

                      {/* <div className="col-12 text-center">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Don't have an account ?
                          </small>{" "}
                          <Link to="/signup" className="text-dark fw-bold">
                            Sign Up
                          </Link>
                        </p>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
