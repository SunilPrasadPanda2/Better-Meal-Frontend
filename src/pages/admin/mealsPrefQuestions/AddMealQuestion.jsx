import React from "react";
import Header from "@/components/common/Header";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addMealQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function AddMealQuestion() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      options: [{ option: "", mealIds: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data) => {
    // Convert mealIds from a comma-separated string to an array
    const formattedData = {
      ...data,
      options: data.options.map((option) => ({
        ...option,
        mealIds: option.mealIds
          ? option.mealIds.split(",").map((mealId) => mealId.trim())
          : [],
      })),
    };

    try {
      await addMealQuestion(formattedData);
      toast.success("Question added successfully");
      navigate("/admin/mealsPrefQuestions");
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add meal questions");
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
        <div className="col-lg-10 mt-4 ">
          <div className="card border-0 p-4 rounded shadow ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Meal Preference Question:
                    </label>
                    <input
                      name="question"
                      id="question"
                      type="text"
                      className={`form-control ${
                        errors.question ? "is-invalid" : ""
                      }`}
                      placeholder="Question"
                      {...register("question", { required: true })}
                    />
                    {errors.question && (
                      <span className="invalid-feedback">
                        Meal Preference Question is required
                      </span>
                    )}
                  </div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="mb-3">
                      <label className="form-label">Option {index + 1}:</label>
                      <div className="d-flex">
                        <input
                          name={`options[${index}].option`}
                          id={`option-${index}`}
                          type="text"
                          className={`form-control ${
                            errors.options?.[index]?.option ? "is-invalid" : ""
                          }`}
                          placeholder="Option"
                          {...register(`options[${index}].option`, {
                            required: true,
                          })}
                        />
                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          onClick={() => remove(index)}
                        >
                          <FaMinus />
                        </button>
                      </div>
                      {errors.options?.[index]?.option && (
                        <span className="invalid-feedback">
                          Option is required
                        </span>
                      )}
                      <div className="mt-2">
                        <label className="form-label">
                          Meal IDs for Option {index + 1}
                        </label>
                        <input
                          name={`options[${index}].mealIds`}
                          id={`mealIds-${index}`}
                          type="text"
                          className={`form-control ${
                            errors.options?.[index]?.mealIds ? "is-invalid" : ""
                          }`}
                          placeholder="Meal ID1, Meal ID2"
                          {...register(`options[${index}].mealIds`)}
                        />
                        {errors.options?.[index]?.mealIds && (
                          <span className="invalid-feedback">
                            Meal IDs are required
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => append({ option: "", mealIds: "" })}
                  >
                    <FaPlus className="me-2" /> Add Option
                  </button>
                </div>
              </div>
              <hr />
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
