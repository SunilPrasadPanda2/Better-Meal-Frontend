import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import { useNavigate } from "react-router-dom";

import {
  GrDashboard,
  CiLogout,
  GiMeal,
  MdOutlineQuestionMark,
  FaTags,
  VscRemoteExplorer,
  FaQuora,
  RiSurveyLine 
} from "../../assets/icons/vander";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { logout } from "../../api/auth";
import { useDispatch } from "react-redux";
import { resetAuth } from "../../store/authSlice";

export default function Sidebar({ manuClass }) {
  const [manu, setManu] = useState("");
  const [subManu, setSubManu] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    var current = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    setManu(current);
    setSubManu(current);
  }, [location.pathname.substring(location.pathname.lastIndexOf("/") + 1)]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
    <nav id="sidebar" className={manuClass}>
      <SimpleBar
        className="sidebar-content"
        data-simplebar
        style={{ height: "calc(100% - 60px)" }}
      >
        <div className="sidebar-brand">
          <Link to="/index">
            {/* <img
              src={logoDark}
              height="33"
              className="logo-light-mode"
              alt=""
            /> */}
            {/* <img
              src={logoLight}
              height="33"
              className="logo-dark-mode"
              alt=""
            /> */}
            {/* <span className="sidebar-colored">
              <img src={logoLight} height="33" alt="" />
            </span> */}
            <h4 className="ms-5 my-auto fw-bold">Better-Meal</h4>
          </Link>
        </div>

        <ul className="sidebar-menu">
          <li className={`${manu === "dashboard" || "" ? "active" : ""} ms-0`}>
            <Link to="/admin/dashboard">
              <GrDashboard
                className="me-2 d-inline-block mb-0 icon"
                style={{ width: "40px", height: "40px" }}
              />
              Dashboard
            </Link>
          </li>

          <li className={`${manu === "meals" ? "active" : ""} ms-0`}>
            <Link to="/admin/meals">
              <GiMeal
                className="me-2 d-inline-block mb-0 icon"
                style={{ width: "40px", height: "40px" }}
              />
              Meals
            </Link>
          </li>
          <li
            className={`${manu === "mealsPrefQuestions" ? "active" : ""} ms-0`}
          >
            <Link to="/admin/mealsPrefQuestions">
              <MdOutlineQuestionMark
                className="me-2 d-inline-block mb-0 icon"
                style={{ width: "40px", height: "40px" }}
              />
              Meal Prefernce Questions
            </Link>
          </li>
          <li className={`${manu === "tags" ? "active" : ""} ms-0`}>
            <Link to="/admin/tags">
              <FaTags
                className="me-2 d-inline-block mb-0 icon"
                style={{ width: "40px", height: "40px" }}
              />
              Tags
            </Link>
          </li>
          <li className={`${manu === "faqs" ? "active" : ""} ms-0`}>
            <Link to="/admin/faqs">
              <FaQuora  
                className="me-2 d-inline-block mb-0 icon"
                style={{ width: "40px", height: "40px" }}
              />
              Faqs
            </Link>
          </li>
          <li className={`${manu === "explore" ? "active" : ""} ms-0`}>
            <Link to="/admin/explores">
              <VscRemoteExplorer 
                className="me-2 d-inline-block mb-0 icon"
                style={{ width: "40px", height: "40px" }}
              />
              Explore
            </Link>
          </li>
          <li className={`${manu === "gutSurvQuestions" ? "active" : ""} ms-0`}>
            <Link to="/admin/gutSurvQuestions">
              <RiSurveyLine  
                className="me-2 d-inline-block mb-0 icon"
                style={{ width: "40px", height: "40px" }}
              />
              Gut Survey Questions
            </Link>
          </li>
        </ul>
      </SimpleBar>
      <ul className="sidebar-footer list-unstyled mb-0">
        <li className="list-inline-item mb-0 ms-1">
          <button
            type="button"
            onClick={handleLogout}
            className="dropdown-item text-dark d-flex align-items-center"
          >
            <span className="mb-0 d-inline-block fw-bold ms-1 mt-2">
              <CiLogout
                className="align-middle h5 mb-0 me-1"
                style={{ width: "22px", height: "22px" }}
              />
              Logout
            </span>{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
}
