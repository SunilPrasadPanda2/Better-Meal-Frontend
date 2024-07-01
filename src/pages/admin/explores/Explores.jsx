import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { Link } from "react-router-dom";
import { getAllExplore } from "@/api/admin";
import { toast } from "react-toastify";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Loading from "@/pages/common/loading";

export default function Explore() {
  const [explores, setExplores] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [currentPage, setCurrentPage] = useState(1); // State for pagination

  const exploresPerPage = 25; // Number of meals per page

  useEffect(() => {
    const fetchExplores = async () => {
      try {
        const response = await getAllExplore();
        setExplores(response.data);
      } catch (error) {
        console.error("Error fetching explores:", error);
        toast.error("Failed to fetch explores");
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };
    fetchExplores();
  }, []);

  // Calculate the indices for the current page
  const indexOfLastExplore = currentPage * exploresPerPage;
  const indexOfFirstExplore = indexOfLastExplore - exploresPerPage;
  const currentExplore = explores.slice(
    indexOfFirstExplore,
    indexOfLastExplore
  );

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
        title="Explores"
        buttons={[
          {
            text: "Add Explore",
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
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" style={{ opacity: "0.8" }}>
            {currentExplore.length > 0 ? (
              currentExplore.map((explore) => (
                <div className="col mt-4" key={explore._id}>
                  <div
                    className="card team border-0 rounded shadow overflow-hidden h-100"
                    style={{ transition: "transform 0.2s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <Link to={`${explore._id}`} className="text-dark">
                      <div className="team-img position-relative">
                        <img
                          src={explore.image}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "130px",
                            objectFit: "cover",
                          }}
                          alt={explore.name}
                        />
                        <hr className="mt-0 mb-0" />
                      </div>
                      <div className="card-body content text-center d-flex flex-column justify-content-center">
                        <OverlayTrigger
                          placement="bottom"
                          className="mb-0"
                          overlay={
                            <Tooltip id={`tooltip-${explore._id}`}>
                              {explore.name.charAt(0).toUpperCase() +
                                explore.name.slice(1)}
                            </Tooltip>
                          }
                        >
                          <p
                            className="h5 text-truncate"
                            style={{ width: "100%", whiteSpace: "nowrap" }}
                          >
                            {explore.name.charAt(0).toUpperCase() +
                              explore.name.slice(1)}
                          </p>
                        </OverlayTrigger>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col mt-4">
                <p>No Explores are available</p>
              </div>
            )}
          </div>
          {explores.length > exploresPerPage && (
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
                  { length: Math.ceil(explores.length / exploresPerPage) },
                  (_, i) => i + 1
                ).map((page) => {
                  if (
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    page === 1 ||
                    page === Math.ceil(explores.length / exploresPerPage)
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
                    currentPage === Math.ceil(explores.length / exploresPerPage)
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
}
