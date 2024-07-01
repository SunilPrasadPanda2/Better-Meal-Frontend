import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { getSurvQuestion, editGutSurvQuestion } from "@/api/admin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed
import Loading from "@/pages/common/loading";

export default function EditGutSurvQuestion() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // State for tracking form submission

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before making API call
        const data = await getSurvQuestion(_id);
        setValue("question", data.data.question);
        setValue("gender", data.data.gender);
      } catch (error) {
        console.error("Error fetching question data:", error);
        toast.error("Failed to fetch question data");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [_id, setValue]);

  const onSubmit = async (formData) => {
    try {
      setSubmitting(true); // Set submitting to true when form is being submitted
      // Submit your updated data here
      const updatedQuestion = {
        _id,
        question: formData.question,
        gender: formData.gender,
      };
      await editGutSurvQuestion(updatedQuestion);
      toast.success("Question updated successfully");
      navigate("/admin/gutSurvQuestions");
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question");
    } finally {
      setSubmitting(false); // Set submitting to false after form submission is complete
    }
  };

  return (
    <>
      <Header
        title="Edit Question"
        breadcrumbs={[
          {
            text: "Questions",
            link: "/admin/gutSurvQuestions",
          },
          {
            text: "Question Detail",
            link: `/admin/gutSurvQuestions/${_id}`,
          },
        ]}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 mt-4 ">
          <div className="card border-0 p-4 rounded shadow ">
            {loading ? ( // Show spinner if loading
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <Loading />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-4">
                      <label className="form-label">
                        Gut Survey Question{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        {...register("question")}
                        type="text"
                        className="form-control"
                        placeholder="Question"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        {...register("gender")}
                        className="form-select form-control"
                        id="gender"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="any">Any</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-success mt-1 float-end"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? ( // Show spinner if submitting
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Update Question"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
