import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import { getMeal, deleteMeal } from "@/api/admin";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap"; // Assuming you have react-bootstrap installed
import { MdAutoDelete } from "react-icons/md";
import Loading from "@/pages/common/loading";

const MealDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await getMeal(_id);
        setMeal(response.data); // Set meal directly from response data
      } catch (error) {
        console.error("Error fetching meal data:", error);
        toast.error("Failed to fetch meal");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchMeal();
  }, [_id]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Loading />
      </div>
    );
  }

  if (!meal) {
    return <div>No meal data available.</div>;
  }

  const {
    mealName,
    calories,
    description,
    nutrientsInfo,
    mealTiming,
    tags,
    image,
    quantity,
  } = meal;

  const handleDeleteClick = (mealId) => {
    setSelectedMealId(mealId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      setIsLoading(true);
      await deleteMeal({ _id }); // Call deleteMeal function with the meal ID
      navigate("/admin/meals");
      toast.success("Meal deleted successfully");
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Failed to delete meal");
    } finally {
      setIsLoading(false);
    }
  };

  const safeMealTiming = mealTiming
    ? mealTiming
        .map((time) => time.charAt(0).toUpperCase() + time.slice(1))
        .join(", ")
    : "";

  const safeTags = tags
    ? tags
        .map(
          (tag) => tag.tagName.charAt(0).toUpperCase() + tag.tagName.slice(1)
        )
        .join(", ")
    : "";

  return (
    <>
      <Header
        title={mealName}
        breadcrumbs={[
          {
            text: "Meals",
            link: "/admin/meals",
          },
        ]}
        buttons={[
          {
            text: "Edit Meal",
            link: `/admin/meals/edit/${_id}`,
          },
        ]}
      />
      <div className="card rounded shadow overflow-hidden mt-4 border-0 col-lg-8 mx-auto">
        <div className="p-2 bg-primary bg-gradient"></div>
        <div className="avatar-profile d-flex margin-negative mt-n5 position-relative ps-3 pt-2">
          <img
            src={image}
            className="rounded-circle shadow-md avatar avatar-medium"
            alt={mealName}
          />
          <div className="mt-4 ms-3 pt-3">
            <h5 className="mt-3 mb-1">
              {mealName.charAt(0).toUpperCase() + mealName.slice(1)}
            </h5>
          </div>
          <button
            className="btn btn-danger me-2"
            style={{ marginInlineStart: "350px", height: "40px" }}
            onClick={() => handleDeleteClick(_id)}
          >
            <MdAutoDelete className="fs-4" />
          </button>
        </div>

        <div className="row">
          <div className="col-12 mt-1">
            <div className="card border-0 rounded-0 p-4">
              <div className="tab-content mt-0" id="pills-tabContent">
                <div className="tab-pane fade show active">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Calories: </h6>
                        <p className="text-muted mb-0">{calories}</p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Quantity: </h6>
                        <p className="text-muted mb-0">{quantity}</p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3 d-flex ">
                        <h6 className="mb-0 me-2">Timings:</h6>
                        <p className="text-muted mb-0">{safeMealTiming}</p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Ratings: </h6>
                        <p className="text-muted mb-0">5 Star</p>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Tags: </h6>
                        <p className="text-muted mb-0 text-wrap text-break">{safeTags}</p>
                      </div>
                    </div>

                    {/* <div className="col-md-12">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Nutrients: </h6>
                        <p className="text-muted mb-0">{nutrientsInfo}</p>
                      </div>
                    </div> */}
                    
                    <div className="col-md-12">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Nutrients: </h6>
                        <p className="text-muted mb-0 text-wrap text-break">
                          {nutrientsInfo}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3 d-flex ">
                        <h6 className="mb-0 me-2">Description: </h6>
                        <p className="text-muted mb-0 text-wrap text-break">
                          {description &&
                            description.charAt(0).toUpperCase() +
                              description.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
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
};

export default MealDetail;
