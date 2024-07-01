import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import { getAllFaqs, deleteFaq } from "@/api/admin";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "@/pages/common/loading";
import { Modal, Button } from "react-bootstrap";

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null); // State to hold the ID of the FAQ to delete
  const faqsPerPage = 10; // Number of FAQs per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getAllFaqs();
        setFaqs(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch FAQs");
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Calculate the index of the first and last FAQ on the current page
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

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
    if (currentPage < Math.ceil(faqs.length / faqsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Show delete confirmation modal
  const showDeleteConfirm = (faqId) => {
    setFaqToDelete(faqId);
    setShowConfirm(true);
  };

  // Handle the actual deletion of the FAQ
  const handleDelete = async () => {
    setShowConfirm(false);
    if (!faqToDelete) return;

    try {
      setLoading(true);
      await deleteFaq(faqToDelete);
      setFaqs(faqs.filter((faq) => faq._id !== faqToDelete));
      toast.success("FAQ deleted successfully");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="FAQS"
        buttons={[
          {
            text: "Add FAQ",
            link: "create",
          },
        ]}
      />
      <div className="row">
        <div className="col-10 mt-4 mx-auto">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "70vh" }}
            >
              <Loading />
            </div>
          ) : (
            <div className="table-responsive shadow rounded">
              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3 col-1">Id</th>
                    <th className="border-bottom p-3 col-6">Question</th>
                    <th className="border-bottom p-3 col-3">Details</th>
                    <th className="border-bottom p-3 col-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFaqs.map((faq, index) => (
                    <tr key={faq._id}>
                      <th className="p-3 col-1">
                        {indexOfFirstFaq + index + 1}
                      </th>
                      <td className="p-3 col-6">
                        {faq.question.charAt(0).toUpperCase() +
                          faq.question.slice(1)}
                      </td>

                      <td className="p-3 col-3">
                        <Link
                          to={`${faq._id}`}
                          className="title text-dark h5 d-block mb-0"
                        >
                          <button className="btn btn-info">
                            <FaEye />
                          </button>
                        </Link>
                      </td>
                      <td className="p-3 col-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => showDeleteConfirm(faq._id)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination */}
          {faqs.length > faqsPerPage && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button onClick={goToPreviousPage} className="page-link">
                    {"<"}
                  </button>
                </li>
                {Array.from(
                  { length: Math.ceil(faqs.length / faqsPerPage) },
                  (_, i) => i + 1
                ).map((page) => {
                  if (
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    page === 1 ||
                    page === Math.ceil(faqs.length / faqsPerPage)
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
                    currentPage === Math.ceil(faqs.length / faqsPerPage)
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
        <Modal.Body>Are you sure you want to delete this FAQ?</Modal.Body>
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
