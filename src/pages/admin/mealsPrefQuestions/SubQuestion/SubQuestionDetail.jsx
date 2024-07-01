import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import { getMealSubQuestions, deleteSubQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { MdOutlineEditNote, MdAutoDelete } from "react-icons/md";
import Loading from "@/pages/common/loading";

export default function SubQuestionDetail() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [subQuestions, setSubQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSubQuestionId, setSelectedSubQuestionId] = useState(null);
  const location = useLocation();
  // const { questionLinkedTo, questionId, connectedOption, optionId } =
  //   location.state || {};
  const { questionId, optionId } = location.state || {};
  useEffect(() => {
    const fetchSubQuestions = async () => {
      try {
        const response = await getMealSubQuestions(_id);
        const filteredSubQuestions = response.data.filter(
          (subQuestion) =>
            subQuestion.questionLinkedTo === questionId &&
            subQuestion.connectedOption === optionId
        );
        setSubQuestions(filteredSubQuestions);
      } catch (error) {
        console.error("Error fetching sub-questions:", error);
        toast.error("Failed to fetch sub-questions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubQuestions();
  }, [_id, questionId, optionId]);

  const handleDeleteClick = (subQuestionId) => {
    setSelectedSubQuestionId(subQuestionId);
    setShowConfirm(true);
  };

  const handleEditClick = (_id) => {
    navigate(`/admin/subQuestionDetail/edit/${_id}`, {
      state: {
        questionId: questionId,
        optionId: optionId,
      },
    });
  };
  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      setLoading(true);
      await deleteSubQuestion({ _id: selectedSubQuestionId });
      setSubQuestions(
        subQuestions.filter((sq) => sq._id !== selectedSubQuestionId)
      );
      toast.success("Subquestion deleted successfully");
    } catch (error) {
      console.error("Error deleting subquestion:", error);
      toast.error("Failed to delete subquestion");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Loading />
      </div>
    );
  }

  if (!subQuestions || subQuestions.length === 0) {
    return <div>No sub-questions found for this question.</div>;
  }

  return (
    <>
      <Header
        title="Sub Questions"
        breadcrumbs={[
          {
            text: "Questions",
            link: `/admin/mealsPrefQuestions`,
          },
          {
            text: "Question Detail",
            link: `/admin/mealsPrefQuestions/${questionId}`,
          },
        ]}
      />
      <div className="row">
        <div className="col-12 mt-1">
          <div className="tab-content mt-0" id="pills-tabContent">
            <div className="tab-pane fade show active">
              <div className="row">
                <div className="col-md-12">
                  {subQuestions.map((subQuestion, qIndex) => (
                    <div
                      key={subQuestion._id}
                      className="card rounded shadow overflow-hidden mt-4 border-0 mx-auto"
                      style={{ width: "700px" }}
                    >
                      <div className="p-1 bg-primary bg-gradient"></div>
                      <div className="mb-4 ms-5 mt-3">
                        <div className="mt-2 ms-3 pt-3">
                          <div className="d-flex align-items-center">
                            <h6 className="mb-0 me-2">
                              Sub Question {qIndex + 1} :
                            </h6>
                            <button
                              className="btn btn-primary me-2"
                              style={{ marginInlineStart: "300px" }}
                              onClick={() => handleEditClick(subQuestion._id)}
                            >
                              <MdOutlineEditNote className="fs-4" />
                            </button>
                            <button
                              className="btn btn-primary me-2"
                              onClick={() => handleDeleteClick(subQuestion._id)}
                            >
                              <MdAutoDelete className="fs-4" />
                            </button>
                          </div>
                          <p className="mt-1 mb-1 ms-4">
                            {subQuestion.question.charAt(0).toUpperCase() +
                              subQuestion.question.slice(1)}
                          </p>
                        </div>

                        <h6 className="mb-0 me-2 ms-3 mt-3">Options :</h6>
                        <div className="ms-5">
                          {subQuestion.options.map((option, index) => (
                            <div
                              key={option._id}
                              className="mb-3 d-flex align-items-center"
                            >
                              <p className="text-muted mb-0 me-auto">
                                {index + 1}. {option.option}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this subquestion?
        </Modal.Body>
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
