import React from "react";
import Header from "@/components/common/Header";
import { addFaq } from "@/api/admin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AddFaq() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addFaq(data);
      if (response.message === "Faq created") {
        toast.success("Faq added successfully");
        navigate("/admin/faqs");
      } else if (response.response.status === 409) {
        toast.error(response.response.data.message);
        navigate("/admin/faqs");
      }
    } catch (error) {
      toast.error("Failed to add Faq");
    }
  };

  return (
    <>
      <Header
        title="Create FAQ"
        breadcrumbs={[
          {
            text: "Faqs",
            link: "/admin/faqs",
          },
        ]}
      />
      <div className="row">
        <div className="col-lg-9 mt-4 mx-auto">
          <div className="card border-0 p-4 rounded shadow">
            <form className="mt-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      FAQ <span className="text-danger">*</span>
                    </label>
                    <input
                      name="question"
                      id="question"
                      type="text"
                      className={`form-control ${
                        errors.question ? "is-invalid" : ""
                      }`}
                      placeholder="FAQ"
                      {...register("question", { required: true })}
                    />
                    {errors.question && (
                      <span className="invalid-feedback">
                        FAQ is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Answer <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="answer"
                      id="answer"
                      rows="2"
                      className={`form-control ${
                        errors.answer ? "is-invalid" : ""
                      }`}
                      placeholder="Answer"
                      {...register("answer", { required: true })}
                    ></textarea>
                    {errors.answer && (
                      <span className="invalid-feedback">
                        Answer is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success float-end">
                Add Faq
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
