import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo/bettermeal.jpg";
import { useNavigate } from "react-router-dom";
import dashboard from "../../assets/images/icons/dashboard.jpg";
import meals from "../../assets/images/icons/meals.jpg";
import mealPreference from "../../assets/images/icons/meal_preference.jpg";
import tags from "../../assets/images/icons/tags.jpg";
import faqs from "../../assets/images/icons/faqs.jpg";
import explore from "../../assets/images/icons/explore.jpg";
import gut from "../../assets/images/icons/gut.jpg";
import { CiLogout } from "../../assets/icons/vander";

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
            <div className="d-flex align-items-center justify-content-center">
              <img src={logoImg} height="50" className="mb-2" alt="logo" />
              <h4
                className=" ms-1 mb-2"
                style={{ color: "#3498db", textTransform: "none" }}
              >
                BetterMeal
              </h4>
            </div>
          </Link>
        </div>

        <ul className="sidebar-menu">
          <li
            className={`${manu === "dashboard" || "" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Link to="/admin/dashboard">
              <img
                src={dashboard}
                style={{ width: "50px", height: "50px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
              />
              Dashboard
            </Link>
          </li>

          <li className={`${manu === "meals" ? "active" : ""} ms-0`} style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <Link to="/admin/meals">
              <img
                src={meals}
                style={{ width: "45px", height: "45px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
              />
              Meals
            </Link>
          </li>
          <li
            className={`${manu === "mealsPrefQuestions" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Link to="/admin/mealsPrefQuestions">
              <img
                src={mealPreference}
                style={{ width: "45px", height: "45px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
              />
              Meal Prefernce Questions
            </Link>
          </li>
          <li className={`${manu === "tags" ? "active" : ""} ms-0`} style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <Link to="/admin/tags">
              <img
                src={tags}
                style={{ width: "45px", height: "45px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
              />
              Tags
            </Link>
          </li>
          <li className={`${manu === "faqs" ? "active" : ""} ms-0`} style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <Link to="/admin/faqs">
              <img
                src={faqs}
                style={{ width: "45px", height: "45px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
              />
              FAQS
            </Link>
          </li>
          <li className={`${manu === "explore" ? "active" : ""} ms-0`} style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <Link to="/admin/explores">
              <img
                src={explore}
                style={{ width: "45px", height: "45px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
              />
              Explore
            </Link>
          </li>
          <li className={`${manu === "gutSurvQuestions" ? "active" : ""} ms-0`} style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <Link to="/admin/gutSurvQuestions">
              <img
                src={gut}
                style={{ width: "45px", height: "45px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
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
