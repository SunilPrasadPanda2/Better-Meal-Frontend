import React, { useState } from "react";
import Header from "@/components/common/Header";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addMealQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function AddMealQuestion() {
  const navigate = useNavigate();
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

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    try {
      const result = await addMealQuestion(data);
      if (result.data) {
        toast.success("Question added successfully");
        navigate("/admin/mealsPrefQuestions");
      } else if (result.response.status === 409) {
        toast.error(result.response.data.message);
        navigate("/admin/mealsPrefQuestions");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add meal questions");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Header
        title="Add Meal Question"
        breadcrumbs={[
          {
            text: "Questions",
            link: "/admin/mealsPrefQuestions",
          },
        ]}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-9 mt-4 ">
          <div className="card border-0 p-4 rounded shadow ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Meal Preference Question{" "}
                      <span className="text-danger">*</span>
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
                            errors.options?.[index]?.option ? "is-invalid" : ""
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
    </>
  );
}
