import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import { getMealQuestion, editMealQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Spinner } from "react-bootstrap"; // assuming you have react-bootstrap installed

export default function EditMealQuestion() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // add submitting state
  const {
    register,
    control,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // set loading to true before fetching data
        const data = await getMealQuestion(_id);
        setValue("question", data.data.question);
        setValue(
          "options",
          data.data.options.map((option) => ({
            ...option,
            mealIds: option.mealIds.join(", "),
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch question data:", error);
        toast.error("Failed to fetch question data");
        setLoading(false);
      }
    };

    fetchData();
  }, [_id, setValue]);

  const onSubmit = async (formData) => {
    try {
      setSubmitting(true); // set submitting to true before API call
      // Convert mealIds from a comma-separated string to an array
      const updateData = {
        ...formData,
        _id,
        options: formData.options.map((option) => ({
          ...option,
          mealIds: option.mealIds
            ? option.mealIds.split(",").map((id) => id.trim())
            : [],
        })),
      };

      // Remove _id fields from the options
      updateData.options = updateData.options.map(({ _id, ...rest }) => rest);

      await editMealQuestion(updateData);
      toast.success("Meal question updated successfully");
      navigate("/admin/mealsPrefQuestions");
    } catch (error) {
      console.error(
        "Error updating meal question:",
        error.response ? error.response.data : error
      );
      toast.error("Failed to update meal question");
    } finally {
      setSubmitting(false); // set submitting to false after API call
    }
  };

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
        title="Edit Question"
        breadcrumbs={[
          {
            text: "Questions",
            link: `/admin/mealsPrefQuestions`,
          },
          {
            text: "Question Detail",
            link: `/admin/mealsPrefQuestions/${_id}`,
          },
        ]}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-9 mt-4">
          <div className="card border-0 p-4 rounded shadow">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  {/* Form inputs */}
                  <div className="mb-3">
                    <label className="form-label">Question :<span className="text-danger">*</span></label>
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
                      <label className="form-label">Option {index + 1} :<span className="text-danger">*</span></label>
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
                        <label className="form-label">Meal IDs :</label>
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
                    className="btn btn-primary mt-2"
                    onClick={() => append({ option: "", mealIds: "" })}
                  >
                    <FaPlus className="me-2" />
                    Add Option
                  </button>
                </div>
              </div>
              <hr />
              <button
                className="btn btn-success mt-1 float-end"
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" role="status" />
                    <span className="visually-hidden">Updating...</span>
                  </>
                ) : (
                  "Update Question"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
