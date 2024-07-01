import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import { useForm, useFieldArray } from "react-hook-form";
import { addMealSubQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function AddSubQuestion() {
  const location = useLocation();
  const { questionLinkedTo, connectedOption, questionId } =
    location.state || {};
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      options: [{ option: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        questionLinkedTo,
        connectedOption,
        question: data.question,
        options: data.options,
      };
      const response = await addMealSubQuestion(payload);
      if (response.data) {
        toast.success("Meal sub-question created successfully!");
        navigate(`/admin/mealsPrefQuestions/${questionId}`);
      } else if (response.response.status === 409) {
        toast.error(response.response.data.message);
        navigate(`/admin/mealsPrefQuestions/${questionId}`);
      }
    } catch (error) {
      toast.error("Error adding sub-question");
      console.error("Error adding sub-question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Add Sub Question"
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
      <div className="card rounded shadow overflow-hidden mt-4 border-0 col-md-9 mx-auto">
        <div className="avatar-profile d-flex margin-negative mt-n5 position-relative ps-3 pt-2">
          <div className="mt-4 ms-3 pt-3">
            <h6 className="mb-0 me-2">Question :</h6>
            <p className="mt-1 mb-1 ms-4">{questionLinkedTo}</p>
            <h6 className="mb-0 me-2">Option :</h6>
            <p className="mt-1 mb-1 ms-4">{connectedOption}</p>
            <h6 className="mt-4 mb-0 me-2">Add Sub Question :</h6>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9 mt-4 ">
            <div className="card border-0 p-4 rounded shadow ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Sub Question <span className="text-danger">*</span>
                      </label>
                      <input
                        name="question"
                        id="question"
                        type="text"
                        className={`form-control ${
                          errors.question ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Question"
                        {...register("question", { required: true })}
                        disabled={isLoading} // Disable input when loading
                      />
                      {errors.question && (
                        <span className="invalid-feedback">
                          Meal Preference Question is required
                        </span>
                      )}
                    </div>
                    {fields.map((field, index) => (
                      <div key={field.id} className="mb-3">
                        <label className="form-label">
                          Option {index + 1}{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="d-flex">
                          <input
                            name={`options[${index}].option`}
                            id={`option-${index}`}
                            type="text"
                            className={`form-control ${
                              errors.options?.[index]?.option
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter Option"
                            {...register(`options[${index}].option`, {
                              required: true,
                            })}
                            disabled={isLoading} // Disable input when loading
                          />
                          <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() => remove(index)}
                            disabled={isLoading} // Disable button when loading
                          >
                            <FaMinus />
                          </button>
                        </div>
                        {errors.options?.[index]?.option && (
                          <span className="invalid-feedback">
                            Option is required
                          </span>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={() => append({ option: "" })}
                      disabled={isLoading} // Disable button when loading
                    >
                      <FaPlus className="me-2" /> Add Option
                    </button>
                  </div>
                </div>
                <hr />
                <button
                  className="btn btn-success mt-1 float-end"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Adding...
                    </>
                  ) : (
                    "Add Question"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
