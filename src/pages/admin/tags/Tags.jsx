import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import { getAllTags } from "@/api/admin";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const tagsPerPage = 10; // Display only 5 tags per page

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getAllTags();
        setTags(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        toast.error("Error fetching tags");
        console.error("Error fetching tags:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTags();
  }, []);

  // Calculate the index of the first and last tag on the current page
  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

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
    if (currentPage < Math.ceil(tags.length / tagsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Header
        title="Tags"
        buttons={[
          {
            text: "Add Tag",
            link: "create",
          },
        ]}
      />
      <div className="row">
        <div className="col-8 mt-4 mx-auto">
          {loading ? ( // Render spinner if loading is true
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="table-responsive shadow rounded">
              <table className="table table-center mx-auto bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3 col-2">Sl No.</th>
                    <th className="border-bottom p-3 col-4">Name</th>
                    <th className="border-bottom p-3 col-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTags.map((tag, index) => {
                    // Calculate the continuous index across all pages
                    const continuousIndex = indexOfFirstTag + index + 1;
                    return (
                      <tr key={tag._id}>
                        <th className="p-3 col-2">{continuousIndex}</th>
                        <td className="p-3 col-4">{tag.tagName}</td>
                        <td className="p-3 col-2">
                          <button className="btn btn-danger">
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
          {tags.length > tagsPerPage && (
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
                  { length: Math.ceil(tags.length / tagsPerPage) },
                  (_, i) => i + 1
                ).map((page) => {
                  if (
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    page === 1 ||
                    page === Math.ceil(tags.length / tagsPerPage)
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
                    currentPage === Math.ceil(tags.length / tagsPerPage)
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
    </>
  );
}
