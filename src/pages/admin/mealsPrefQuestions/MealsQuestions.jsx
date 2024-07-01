import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import { getMealAllQuestions, deleteMealQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap"; // Assuming you have react-bootstrap installed
import Loading from "@/pages/common/loading";
import { MdAutoDelete } from "react-icons/md";

export default function MealsQuestions() {
  const navigate = useNavigate();
  const [mealQuestions, setMealQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const questionsPerPage = 10; // Number of questions per page

  useEffect(() => {
    const fetchMealQuestions = async () => {
      try {
        const response = await getMealAllQuestions();
        setMealQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching meals questions:", error);
        toast.error("Failed to fetch meal questions");
        setIsLoading(false);
      }
    };
    fetchMealQuestions();
  }, []);

  const handleDeleteClick = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      setIsLoading(true);
      await deleteMealQuestion({ _id: selectedQuestionId });
      setMealQuestions((mealQuestions) =>
        mealQuestions.filter((question) => question._id !== selectedQuestionId)
      );
      navigate("/admin/mealsPrefQuestions");
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate the questions to be displayed on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = mealQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Go to next page
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Header
        title="Questions"
        buttons={[
          {
            text: "Add Question",
            link: "create",
          },
        ]}
      />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Loading />
        </div>
      ) : (
        <div className="row">
          <div className="col-10 mt-4 mx-auto">
            <div className="table-responsive shadow rounded">
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3 col-1">Id</th>
                    <th className="border-bottom p-3 col-9">Question</th>
                    <th className="border-bottom p-3 col-1">Details</th>
                    <th className="border-bottom p-3 col-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentQuestions.length > 0 ? (
                    currentQuestions.map((question, index) => {
                      const capitalizedQuestion =
                        question.question.charAt(0).toUpperCase() +
                        question.question.slice(1);
                      return (
                        <tr key={question._id}>
                          <th className="p-3 col-1">
                            {indexOfFirstQuestion + index + 1}
                          </th>
                          <td className="p-3 col-9">{capitalizedQuestion}</td>
                          <td className="p-3 col-1">
                            <Link
                              to={`${question._id}`}
                              className="title text-dark h5 d-block mb-0"
                            >
                              <button className="btn btn-info">
                                <FaEye className="fs-5" />
                              </button>
                            </Link>
                          </td>
                          <td className="p-3 col-1">
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteClick(question._id)}
                            >
                              <MdAutoDelete className="fs-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center p-3">
                        No questions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Pagination */}
      {mealQuestions.length > questionsPerPage && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button onClick={goToPreviousPage} className="page-link">
                {"<"}
              </button>
            </li>
            {/* Show only current page, previous page, next page, first page, last page, and an ellipsis (...) between the next page and last page */}
            {Array.from(
              { length: Math.ceil(mealQuestions.length / questionsPerPage) },
              (_, i) => i + 1
            ).map((page) => {
              if (
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1 ||
                page === 1 ||
                page === Math.ceil(mealQuestions.length / questionsPerPage)
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
              } else if (page === currentPage + 2 || page === currentPage - 2) {
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
                currentPage ===
                Math.ceil(mealQuestions.length / questionsPerPage)
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
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this meal?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            No
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
