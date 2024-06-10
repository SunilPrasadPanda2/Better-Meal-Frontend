import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import doctor1 from "../../assets/images/doctors/01.jpg";
import adminImage from "../../assets/images/adminImage/adminreg.jpeg";

import {
  FaBars,
  FiSettings,
  GrDashboard,
  LuLogOut,
} from "../../assets/icons/vander";

import { logout } from "../../api/auth";
import { useDispatch } from "react-redux";
import { resetAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
// import PersonChatTwo from "./personChatTwo";

export default function TopHeader({ toggle, setToggle }) {
  const navigate = useNavigate();
  let [countryModal, setCountryModal] = useState(false);
  let [mailModal, setMailModal] = useState(false);
  let [userModal, setUserModal] = useState(false);
  // let [show, setShow] = useState(false);

  // let handleClose = () => setShow(false);
  // let handleShow = () => setShow(true);

  // useEffect(() => {
  //   // const handleclose = () => {
  //   //   setCountryModal(false);
  //   // };
  //   // const closeMail = () => {
  //   //   setMailModal(false);
  //   // };
  //   const closeUserModal = () => {
  //     setUserModal(false);
  //   };
  //   // document.addEventListener("mousedown", handleclose);
  //   // document.addEventListener("mousedown", closeMail);
  //   document.addEventListener("mousedown", closeUserModal);

  //   return () => {
  //     // document.removeEventListener("mousedown", handleclose);
  //     // document.removeEventListener("mousedown", closeMail);
  //     // document.removeEventListener("mousedown", closeUserModal);
  //   };
  // });

  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.warn("logout");
    try {
      const response = await logout();
      if (response) {
        dispatch(resetAuth());
        navigate("/login");
      }
    } catch (err) {
      console.log("Logout failed. Please try again.", err);
    }
  };

  return (
    <div className="top-header">
      <div className="header-bar d-flex justify-content-between border-bottom">
        <div className="d-flex align-items-center">
          {/* <Link to="#" className="logo-icon">
            <img src={logoIcon} height="30" className="small" alt="" />
            <span className="big">
              <img
                // src={logoDark}
                height="22"
                className="logo-light-mode"
                alt=""
              />
              <img
                // src={logoLight}
                height="22"
                className="logo-dark-mode"
                alt=""
              />
            </span>
          </Link> */}
          <Link
            onClick={() => setToggle(!toggle)}
            className="btn btn-icon btn-pills btn-soft-primary ms-2"
            to="#"
          >
            <FaBars />
          </Link>
        </div>

        <ul className="list-unstyled mb-0">
          {/* <li className="list-inline-item mb-0 ms-1 mx-2">
            <Link
              to="#"
              onClick={handleShow}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <div className="btn btn-icon btn-pills btn-soft-primary">
                <FiSettings className="fea icon-sm" />
              </div>
            </Link>
          </li> */}
          {/* <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            style={{ width: "430px" }}
          >
            <Offcanvas.Header
              closeButton
              className="offcanvas-header p-4 border-bottom"
            >
              <h5 id="offcanvasRightLabel" className="mb-0">
                <img
                  src={logoDark}
                  height="22"
                  className="light-version"
                  alt=""
                />
                <img
                  src={logoLight}
                  height="22"
                  className="dark-version"
                  alt=""
                />
              </h5>
            </Offcanvas.Header>
            <Offcanvas.Body><PersonChatTwo/></Offcanvas.Body>
          </Offcanvas> */}

          {/* <li className="list-inline-item mb-0 ms-1 mx-2">
            <div className="dropdown dropdown-primary">
              <button
                type="button"
                className="btn btn-icon btn-pills btn-soft-primary dropdown-toggle p-0"
                onClick={() => setMailModal(!mailModal)}
              >
                <FiMail className="fea icon-sm" />
              </button>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                4 <span className="visually-hidden">unread mail</span>
              </span>

              <SimpleBar
                className={`${
                  mailModal ? "show" : ""
                } dropdown-menu dd-menu dropdown-menu-end shadow rounded border-0 mt-3 px-2 py-2`}
                style={{
                  height: "320px",
                  width: "300px",
                  position: "absolute",
                  right: "0",
                }}
              >
                {mailData.map((item, index) => {
                  return (
                    <Link
                      to="#"
                      className="d-flex align-items-center justify-content-between py-2"
                      key={index}
                    >
                      <div className="d-inline-flex position-relative overflow-hidden">
                        <img
                          src={item.image}
                          className="avatar avatar-md-sm rounded-circle shadow"
                          alt=""
                        />
                        <small className="text-dark mb-0 d-block text-truncat ms-3">
                          {item.desc} <b>{item.desc2}</b>{" "}
                          <small className="text-muted fw-normal d-inline-block">
                            {item.time}
                          </small>
                        </small>
                      </div>
                    </Link>
                  );
                })}
              </SimpleBar>
            </div>
          </li> */}

          <li className="list-inline-item mb-0 ms-1">
            <div className="dropdown dropdown-primary">
              <button
                type="button"
                className="btn btn-pills btn-soft-primary dropdown-toggle p-0"
                onClick={() => setUserModal(!userModal)}
              >
                <img
                  src={adminImage}
                  className="avatar avatar-ex-small rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
              </button>
              <div
                className={`${
                  userModal ? "show" : ""
                } dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3`}
                style={{ minWidth: "200px", position: "absolute", right: "0" }}
              >
                {/* <Link
                  className="dropdown-item d-flex align-items-center text-dark"
                  to="/profile"
                >
                  <img
                    src={adminImage}
                    className="avatar avatar-md-sm rounded-circle border shadow"
                    alt=""
                  />
                  <div className="flex-1 ms-2">
                    <span className="d-block mb-1">Calvin Carlo</span>
                    <small className="text-muted">Orthopedic</small>
                  </div>
                </Link> */}
                {/* <Link
                  className="dropdown-item text-dark d-flex align-items-center"
                  to="/"
                >
                  <span className="mb-0 d-inline-flex me-1">
                    <GrDashboard className="align-middle h6 mb-0" />
                  </span>{" "}
                  Dashboard
                </Link> */}
                {/* <Link
                  className="dropdown-item text-dark d-flex align-items-center"
                  to="/dr-profile"
                >
                  <span className="mb-0 d-inline-block me-1">
                    <FiSettings className="align-middle h6 mb-0" />
                  </span>{" "}
                  Profile Settings
                </Link> */}
                {/* <div className="dropdown-divider border-top"></div> */}
                {/* <Link
                  className="dropdown-item text-dark d-flex align-items-center"
                  to="/lock-screen"
                >
                  <span className="mb-0 d-inline-block me-1">
                    <RiLogoutCircleRLine className="align-middle h6 mb-0" />
                  </span>{" "}
                  Logout
                </Link> */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="dropdown-item text-dark d-flex align-items-center"
                >
                  <span className="mb-0 d-inline-block me-1 fw-bold">
                    <LuLogOut className="align-middle h5 mb-0 me-1" />
                    Logout
                  </span>{" "}
                </button>
              </div>
            </div>
          </li>
          {/* <li className="list-inline-item mb-0 ms-1">
            <button
              type="button"
              onClick={handleLogout}
              className="dropdown-item text-dark d-flex align-items-center"
            >
              <span className="mb-0 d-inline-block me-1 fw-bold">
                <LuLogOut className="align-middle h5 mb-0 me-1" />
                Logout
              </span>{" "}
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
