import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/common/Header";
import { getSubQuestion, editSubQuestion } from "@/api/admin";
import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import Loading from "@/pages/common/loading";

export default function EditSubQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionId, optionId } = location.state || {};

  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSubQuestion(_id);
        const data = response.data[0]; // Ensure you are accessing the first element of the data array
        if (data) {
          reset({
            question: data.question,
            options: data.options.map((option) => ({ option: option.option })),
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch question data:", error);
        toast.error("Failed to fetch question data");
        setLoading(false);
      }
    };

    fetchData();
  }, [_id, reset]);

  const onSubmit = async (formData) => {
    try {
      setSubmitting(true);
      const updateData = {
        ...formData,
        _id,
        options: formData.options.map((option) => ({
          option: option.option,
        })),
      };

      console.log("Update Data: ", updateData); // Log the payload

      await editSubQuestion(updateData);
      toast.success("Sub question updated successfully");
      navigate(`/admin/subQuestionDetail/${questionId}`, {
        state: {
          questionId: questionId,
          optionId: optionId,
        },
      });
    } catch (error) {
      console.error(
        "Error updating meal question:",
        error.response ? error.response.data : error
      );
      toast.error("Failed to update meal question");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header
        title="Edit Sub Question"
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
      <div className="row d-flex justify-content-center">
        <div className="col-lg-9 mt-4">
          <div className="card border-0 p-4 rounded shadow">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Question :<span className="text-danger">*</span>
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
                      <label className="form-label">
                        Option {index + 1} :
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
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => append({ option: "" })}
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
