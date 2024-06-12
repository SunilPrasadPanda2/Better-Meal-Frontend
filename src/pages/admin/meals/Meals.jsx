import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import { getAllMeal } from "@/api/admin";
import { toast } from "react-toastify";
import { Spinner, Tooltip, OverlayTrigger, Pagination } from "react-bootstrap"; // Assuming you have react-bootstrap installed

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [currentPage, setCurrentPage] = useState(1); // State for pagination

  const mealsPerPage = 25; // Number of meals per page

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await getAllMeal();
        if (response && response.data && Array.isArray(response.data)) {
          setMeals(response.data);
        } else {
          toast.error("No meals data available");
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to fetch meals");
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };
    fetchMeals();
  }, []);

  // Calculate the indices for the current page
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

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
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Header
        title="Meals"
        buttons={[
          {
            text: "Add Meal",
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
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {currentMeals.length > 0 ? (
              currentMeals.map((meal) => (
                <div className="col mt-4" key={meal._id}>
                  <div className="card team border-0 rounded shadow overflow-hidden h-100">
                    <Link to={`${meal._id}`} className="text-dark">
                      <div className="team-img position-relative">
                        <img
                          src={meal.image}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "130px",
                            objectFit: "cover",
                          }}
                          alt={meal.mealName}
                        />
                        <hr className="mt-0 mb-0" />
                      </div>
                      <div className="card-body content text-center d-flex flex-column justify-content-center">
                        <OverlayTrigger
                          placement="bottom"
                          className="mb-0"
                          overlay={
                            <Tooltip id={`tooltip-${meal._id}`}>
                              {meal.mealName}
                            </Tooltip>
                          }
                        >
                          <p
                            className="h5 text-truncate"
                            style={{ width: "100%", whiteSpace: "nowrap" }}
                          >
                            {meal.mealName}
                          </p>
                        </OverlayTrigger>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col mt-4">
                <p>No meals available</p>
              </div>
            )}
          </div>
          {meals.length > mealsPerPage && (
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
                  { length: Math.ceil(meals.length / mealsPerPage) },
                  (_, i) => i + 1
                ).map((page) => {
                  if (
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    page === 1 ||
                    page === Math.ceil(meals.length / mealsPerPage)
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
                    currentPage === Math.ceil(meals.length / mealsPerPage)
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
      )}
    </>
  );
};

export default Meals;
