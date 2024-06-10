import React from "react";
import Header from "@/components/common/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTag } from "@/api/admin";

export default function AddTag() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitting data:", data); // Log to verify form data
    try {
      const response = await addTag({ tag: data.tag });
      if (response) {
        toast.success(response.message);
        navigate("/admin/tags");
      }
    } catch (error) {
      console.error("Error:", error.response || error); // Improved error logging
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create tag.");
      }
    }
  };

  return (
    <>
      <Header
        title="Create Tag"
        breadcrumbs={[{ text: "Tags", link: "/admin/tags" }]}
      />
      <div className="row">
        <div className="col-lg-8 mt-4 mx-auto">
          <div className="card border-0 p-4 rounded shadow">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Tag Name</label>
                    <input
                      name="tag"
                      id="tag"
                      type="text"
                      className={`form-control ${
                        errors.tag ? "is-invalid" : ""
                      }`}
                      placeholder="TagName"
                      {...register("tag", { required: true })}
                    />
                    {errors.tag && (
                      <span className="invalid-feedback">
                        Tag name is required...
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-end">
                Add tag
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
