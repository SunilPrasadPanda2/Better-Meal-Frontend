import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import { getMealAllQuestions } from "@/api/admin";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { Spinner, Pagination } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function MealsQuestions() {
  const [mealQuestions, setMealQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const questionsPerPage = 10; // Number of questions per page

  useEffect(() => {
    const fetchMealQuestions = async () => {
      try {
        const response = await getMealAllQuestions();
        if (response && response.data && Array.isArray(response.data)) {
          setMealQuestions(response.data);
        } else {
          toast.error("No meals questions are available");
        }
      } catch (error) {
        console.error("Error fetching meals questions:", error);
        toast.error("Failed to fetch meal questions");
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };
    fetchMealQuestions();
  }, []);

  // Calculate the questions to be displayed on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = mealQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render pagination items
  const renderPaginationItems = () => {
    const totalPages = Math.ceil(mealQuestions.length / questionsPerPage);
    let items = [];

    if (totalPages <= 1) return null;

    items.push(
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
      >
        &lt;
      </Pagination.Prev>
    );

    if (currentPage > 2) {
      items.push(
        <Pagination.Item key="first" onClick={() => paginate(1)}>
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    if (currentPage > 1) {
      items.push(
        <Pagination.Item
          key={currentPage - 1}
          onClick={() => paginate(currentPage - 1)}
        >
          {currentPage - 1}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Item key={currentPage} active>
        {currentPage}
      </Pagination.Item>
    );

    if (currentPage < totalPages) {
      items.push(
        <Pagination.Item
          key={currentPage + 1}
          onClick={() => paginate(currentPage + 1)}
        >
          {currentPage + 1}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis2" />);
    }

    if (currentPage < totalPages - 1) {
      items.push(
        <Pagination.Item key="last" onClick={() => paginate(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
      >
        &gt;
      </Pagination.Next>
    );

    return items;
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
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
      ) : (
        <div className="row">
          <div className="col-10 mt-4 mx-auto">
            <div className="table-responsive shadow rounded">
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3 col-1">Id</th>
                    <th className="border-bottom p-3 col-7">Question</th>
                    <th className="border-bottom p-3 col-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {currentQuestions.length > 0 ? (
                    currentQuestions.map((question, index) => (
                      <tr key={question._id}>
                        <th className="p-3 col-1">{indexOfFirstQuestion + index + 1}</th>
                        <td className="p-3 col-7">{question.question}</td>
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
                    ))
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
            {mealQuestions.length > questionsPerPage && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>{renderPaginationItems()}</Pagination>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
