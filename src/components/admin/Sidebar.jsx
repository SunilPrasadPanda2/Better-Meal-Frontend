import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo/bettermeal.jpg";
import dashboard from "../../assets/images/icons/dashboard.jpg";
import meals from "../../assets/images/icons/meals.jpg";
import mealPreference from "../../assets/images/icons/meal_preference.jpg";
import groupImage from "../../assets/images/icons/groupImage.jpeg";
import tags from "../../assets/images/icons/tags.jpg";
import faqs from "../../assets/images/icons/faqs.jpg";
import explore from "../../assets/images/icons/explore.jpg";
import gut from "../../assets/images/icons/gut.jpg";
import { CiLogout } from "../../assets/icons/vander";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { logout } from "../../api/auth";
import { useDispatch } from "react-redux";
import { resetAuth } from "../../store/authSlice";

export default function Sidebar({ manuClass }) {
  const [manu, setManu] = useState("");
  const [subManu, setSubManu] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const showDeleteConfirm = () => {
    setShowConfirm(true);
  };

  const handleLogout = async () => {
    setLoading(true);
    setShowConfirm(false);
    try {
      const response = await logout();
      if (response) {
        dispatch(resetAuth());
        navigate("/login");
        toast.success("You have logout Successfully");
      }
    } catch (err) {
      console.log("Logout failed. Please try again.", err);
    } finally {
      setLoading(false);
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

          <li
            className={`${manu === "meals" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
          <li
            className={`${manu === "tags" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
          <li
            className={`${manu === "faqs" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
          <li
            className={`${manu === "explore" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
          <li
            className={`${manu === "gutSurvQuestions" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
          <li
            className={`${manu === "users" ? "active" : ""} ms-0`}
            style={{ transition: "transform 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Link to="/admin/users">
              <img
                src={groupImage}
                style={{ width: "45px", height: "45px" }}
                className="me-2 d-inline-block mb-0 icon"
                alt=""
              />
              Users
            </Link>
          </li>
        </ul>
      </SimpleBar>
      <ul className="sidebar-footer list-unstyled mb-0">
        <li className="list-inline-item mb-0 ms-1">
          <button
            type="button"
            onClick={() => showDeleteConfirm()}
            className="dropdown-item text-dark d-flex align-items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Logout...</span>
              </>
            ) : (
              <>
                <CiLogout
                  className="align-middle h5 mb-0 me-1"
                  style={{ width: "22px", height: "22px" }}
                />
                <span className="mb-0 d-inline-block fw-bold ms-1 mt-2">
                  Logout
                </span>
              </>
            )}
          </button>
        </li>
      </ul>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
