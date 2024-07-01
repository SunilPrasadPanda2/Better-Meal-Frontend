import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import { getExplore, deleteExplore } from "@/api/admin";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { MdAutoDelete } from "react-icons/md";
import Loading from "@/pages/common/loading";

export default function ExploreDetail() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [explore, setExplore] = useState(null);
  const [selectedExploreId, setSelectedExploreId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchExplore = async () => {
      try {
        const data = await getExplore(_id);
        setExplore(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching explore data:", error);
        toast.error("Failed to fetch explore data");
        setIsLoading(false);
      }
    };

    fetchExplore();
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

  if (!explore) {
    return <div>Error loading explore data</div>;
  }
  const handleDeleteClick = (exploreId) => {
    setSelectedExploreId(exploreId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      setIsLoading(true);
      await deleteExplore({ _id }); // Call deleteMeal function with the explore ID
      navigate("/admin/explores");
      toast.success("Explore deleted successfully");
    } catch (error) {
      console.error("Error deleting explore:", error);
      toast.error("Failed to delete explore");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header
        title={explore.name}
        breadcrumbs={[
          {
            text: "Explores",
            link: "/admin/explores",
          },
        ]}
        buttons={[
          {
            text: "Edit Explore",
            link: `/admin/explores/edit/${_id}`,
          },
        ]}
      />
      <div className="card rounded shadow overflow-hidden mt-4 border-0 col-lg-8 mx-auto">
        <div className="p-2 bg-primary bg-gradient"></div>
        <div className="avatar-profile d-flex margin-negative mt-n5 position-relative ps-3 pt-2">
          <img
            src={explore.image}
            className="rounded-circle shadow-md avatar avatar-medium"
            alt={explore.name}
          />
          <div className="mt-4 ms-3 pt-3">
            <h5 className="mt-3 mb-1">
              {explore.name.charAt(0).toUpperCase() + explore.name.slice(1)}
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
                        <h6 className="mb-0 me-2">Advice: </h6>
                        <p className="text-muted mb-0">
                          {explore.advice &&
                            explore.advice.charAt(0).toUpperCase() +
                              explore.advice.slice(1)}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Date: </h6>
                        <p className="text-muted mb-0">
                          {new Date(explore.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3 d-flex">
                        <h6 className="mb-0 me-2">Tags: </h6>
                        <p className="text-muted mb-0">
                          {explore.tags
                            .map(
                              (tag) =>
                                tag.tagName.charAt(0).toUpperCase() +
                                tag.tagName.slice(1)
                            )
                            .join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3 d-flex ">
                        <h6 className="mb-0 me-2">Description: </h6>
                        <p className="text-muted mb-0">
                          {explore.description &&
                            explore.description.charAt(0).toUpperCase() +
                              explore.description.slice(1)}
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
        <Modal.Body>Are you sure you want to delete this explore?</Modal.Body>
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
