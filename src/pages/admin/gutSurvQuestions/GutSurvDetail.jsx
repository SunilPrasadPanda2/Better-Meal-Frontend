import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { useParams } from "react-router-dom";
import { getSurvQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function GutSurvDetail() {
  const { _id } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSurvQuestion(_id);
        setQuestionData(data.data);
      } catch (error) {
        console.error("Error fetching question data:", error);
        toast.error("Failed to fetch question data");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [_id]);

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
        title="Question Detail"
        breadcrumbs={[
          {
            text: "Questions",
            link: "/admin/gutSurvQuestions",
          },
        ]}
        buttons={[
          {
            text: "Edit Question",
            link: `/admin/gutSurvQuestions/edit/${_id}`,
          },
        ]}
      />
      
      <div className="card rounded shadow overflow-hidden mt-4 border-0 col-md-8 mx-auto">
        <div className="p-2 bg-primary bg-gradient"></div>
        <div className="avatar-profile d-flex margin-negative mt-n5 position-relative ps-3 pt-2">
          <div className="mt-4 ms-3 pt-3">
            <h6 className="mb-0 me-2">Question :</h6>
            <p className="mt-3 mb-1 ms-4">{questionData?.question}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-1">
            <div className="card border-0 rounded-0 p-4">
              <div className="tab-content mt-0" id="pills-tabContent">
                <div className="tab-pane fade show active">
                  <div className="row">
                    <div className="col-md-6 ms-2">
                      <div className="mb-3">
                        <h6 className="mb-0 me-2">Gender</h6>
                        <div className="ms-4">
                          <p className="text-muted mb-0">{questionData?.gender}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
