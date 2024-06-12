import React, { useState } from "react";
import Header from "@/components/common/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addGutSurveyQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function AddGutQuestion() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when form is submitted
    try {
      await addGutSurveyQuestion(data);
      toast.success("Question added successfully!");
      reset(); // Reset the form fields
      navigate("/admin/gutSurvQuestions"); // Redirect to questions list
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question.");
    } finally {
      setLoading(false); // Set loading to false after form submission
    }
  };

  return (
    <>
      <Header
        title="Add Gut Question"
        breadcrumbs={[
          {
            text: "Questions",
            link: "/admin/gutSurvQuestions",
          },
        ]}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 mt-4 ">
          <div className="card border-0 p-4 rounded shadow ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Gut Survey Question :<span className="text-danger">*</span></label>
                    <input
                      name="question"
                      id="question"
                      type="text"
                      className="form-control"
                      placeholder="Question"
                      {...register("question", { required: true })}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender :<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-control"
                      name="gender"
                      id="gender"
                      {...register("gender", { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose option
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="any">Any</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="btn btn-success mt-1 float-end" type="submit">
                {loading ? (
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Add Question"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
