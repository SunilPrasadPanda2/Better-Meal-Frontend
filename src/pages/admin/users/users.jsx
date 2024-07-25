import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import { getAllUsers, deleteUser } from "@/api/admin";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "@/pages/common/loading";

function users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const usersPerPage = 10; // Display only 5 users per page
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        toast.error("Error fetching users");
        console.error("Error fetching users:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUsers();
  }, []);

  // Calculate the index of the first and last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Show delete confirmation modal
  const showDeleteConfirm = (userId) => {
    setUserToDelete(userId);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    setShowConfirm(false);
    if (!userToDelete) return;

    try {
      setLoading(true);
      await deleteUser(userToDelete);
      setUsers(users.filter((user) => user._id !== userToDelete));
      navigate("/admin/users");
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* <Header
        title="Users"
      /> */}
      <div className="row">
        <div className="col-10 mt-4 mx-auto">
          {loading ? ( // Render spinner if loading is true
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "70vh" }}
            >
              <Loading />
            </div>
          ) : (
            <div className="table-responsive shadow rounded">
              <table className="table table-center mx-auto bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3 col-2">Sl No.</th>
                    <th className="border-bottom p-3 col-2">Name</th>
                    <th className="border-bottom p-3 col-2">Email</th>
                    <th className="border-bottom p-3 col-2">Mob</th>
                    <th className="border-bottom p-3 col-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => {
                    // Calculate the continuous index across all pages
                    const continuousIndex = indexOfFirstUser + index + 1;
                    return (
                      <tr key={user._id}>
                        <th className="p-3 col-2">{continuousIndex}</th>
                        <td className="p-3 col-2">
                          {user.name.charAt(0).toUpperCase() +
                            user.name.slice(1)}
                        </td>
                        <th className="p-3 col-2">{user.email}</th>
                        <th className="p-3 col-2">{user.mobile}</th>
                        <td className="p-3 col-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => showDeleteConfirm(user._id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {users.length > usersPerPage && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button onClick={goToPreviousPage} className="page-link">
                    {"<"}
                  </button>
                </li>
                {/* Show only current page, previous page, next page, first page, last page, and an ellipsis (...) between the next page and last page */}
                {Array.from(
                  { length: Math.ceil(users.length / usersPerPage) },
                  (_, i) => i + 1
                ).map((page) => {
                  if (
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    page === 1 ||
                    page === Math.ceil(users.length / usersPerPage)
                  ) {
                    return (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          onClick={() => paginate(page)}
                          className="page-link"
                        >
                          {page}
                        </button>
                      </li>
                    );
                  } else if (
                    page === currentPage + 2 ||
                    page === currentPage - 2
                  ) {
                    return (
                      <li key={page} className="page-item disabled">
                        <button className="page-link">...</button>
                      </li>
                    );
                  }
                  return null;
                })}
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(users.length / usersPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button onClick={goToNextPage} className="page-link">
                    {">"}
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default users;
