import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import { getAllGutSurvQuestions } from "@/api/admin";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function GutSurvQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllGutSurvQuestions();
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to fetch questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Calculate index of the first and last question of the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
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

  if (loading) {
    return (
      <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
    );
  }

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
      <div className="row">
        <div className="col-12 mt-4">
          <div className="table-responsive shadow rounded">
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3 col-1">Id</th>
                  <th className="border-bottom p-3 col-9">Question</th>
                  <th className="border-bottom p-3 col-2">Get Detail</th>
                </tr>
              </thead>
              <tbody>
                {currentQuestions.map((question, index) => (
                  <tr key={question._id}>
                    <th className="p-3 col-1">
                      {indexOfFirstQuestion + index + 1}
                    </th>
                    <td className="p-3 col-9">{question.question}</td>
                    <td className="p-3 col-2">
                      <Link
                        to={`${question._id}`}
                        className="title text-dark h5 d-block mb-0"
                      >
                        <button className="btn btn-info">
                          <FaEye />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {questions.length > questionsPerPage && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button onClick={goToPreviousPage} className="page-link">
                {"<"}
              </button>
            </li>
            {/* Show only current page, previous page, next page, first page, last page, and an ellipsis (...) between the next page and last page */}
            {Array.from(
              { length: Math.ceil(questions.length / questionsPerPage) },
              (_, i) => i + 1
            ).map((page) => {
              if (
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1 ||
                page === 1 ||
                page === Math.ceil(questions.length / questionsPerPage)
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
                currentPage === Math.ceil(questions.length / questionsPerPage)
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
    </>
  );
}
