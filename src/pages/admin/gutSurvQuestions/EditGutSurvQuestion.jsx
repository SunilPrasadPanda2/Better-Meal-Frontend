import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { getSurvQuestion, editGutSurvQuestion } from "@/api/admin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGutSurvQuestion() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSurvQuestion(_id);
        setValue("question", data.data.question);
        setValue("gender", data.data.gender);
      } catch (error) {
        console.error("Error fetching question data:", error);
        toast.error("Failed to fetch question data");
      }
    };

    fetchData();
  }, [_id, setValue]);

  const onSubmit = async (formData) => {
    try {
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-4">
                    <label className="form-label">Gut Survey Question:</label>
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
                      Gender
                    </label>
                    <select
                      {...register("gender")}
                      className="form-select form-control"
                      id="gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                      <option value="any">Any</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="btn btn-success mt-1 float-end" type="submit">
                Update Question
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
