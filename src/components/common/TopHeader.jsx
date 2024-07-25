import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import doctor1 from "../../assets/images/doctors/01.jpg";
import adminImage from "../../assets/images/adminImage/adminreg.jpeg";
import { Modal, Button } from "react-bootstrap";
import {
  FaBars,
  FiSettings,
  GrDashboard,
  LuLogOut,
} from "../../assets/icons/vander";
import { logout } from "../../api/auth";
import { resetAuth } from "../../store/authSlice";

export default function TopHeader({ toggle, setToggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userModalRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);

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
      }
    } catch (err) {
      console.log("Logout failed. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (userModalRef.current && !userModalRef.current.contains(event.target)) {
      setUserModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-header">
      <div className="header-bar d-flex justify-content-between border-bottom">
        <div className="d-flex align-items-center">
          <Link
            onClick={() => setToggle(!toggle)}
            className="btn btn-icon btn-pills btn-soft-primary ms-2"
            to="#"
          >
            <FaBars />
          </Link>
        </div>
        <ul className="list-unstyled mb-0">
          <li className="list-inline-item mb-0 ms-1">
            <div className="dropdown dropdown-primary" ref={userModalRef}>
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
                <button
                  type="button"
                  onClick={() => showDeleteConfirm()}
                  className="dropdown-item text-dark d-flex align-items-center"
                  style={{ textTransform: "none" }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </>
                  ) : (
                    <>
                      <LuLogOut className="align-middle mb-0 me-1" />
                      <span className="mb-0 d-inline-block me-1 fw-bold h6">
                        Logout
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
    </div>
  );
}
