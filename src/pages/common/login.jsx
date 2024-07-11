import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo/bettermeal.jpg";
import bg1 from "../../assets/images/bg/bg-lines-one.png";
import { FiHome } from "react-icons/fi";
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
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      const response = await login(data);
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
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError(error.message || "Login failed");
      console.error(error);
    } finally {
      setLoading(false);
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
              <div
                className="card login-page shadow mt-4 rounded border-0"
                style={{ height: "400px" }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={logoImg}
                      height="50"
                      className="mx-0 d-block mb-2"
                      alt=""
                    />
                    <h4 className="ms-1 mb-0" style={{ color: "#3498db" }}>
                      <span>BetterMeal</span>
                    </h4>
                  </div>
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
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email",
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
                              required: "Password is required",
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

                      <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                          <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only">Sign in...</span>
                              </>
                            ) : (
                              "Sign in"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  {error && (
                    <div className="mt-3">
                      <p className="text-danger">{error}</p>
                    </div>
                  )}
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
