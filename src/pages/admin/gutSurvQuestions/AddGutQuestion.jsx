import React from "react";
import Header from "@/components/common/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addGutSurveyQuestion } from "@/api/admin";
import { toast } from "react-toastify";

export default function AddGutQuestion() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await addGutSurveyQuestion(data);
      toast.success("Question added successfully!");
      reset(); // Reset the form fields
      navigate("/admin/gutSurvQuestions"); // Redirect to questions list
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question.");
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
                    <label className="form-label">Gut Survey Question:</label>
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
                      Gender
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
                      <option value="others">Others</option>
                      <option value="any">Any</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-1 float-end" type="submit">
                Add Question
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
