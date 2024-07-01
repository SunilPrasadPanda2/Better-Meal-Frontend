import React, { useState } from "react";
import Header from "@/components/common/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTag } from "@/api/admin";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function AddTag() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitting data:", data); // Log to verify form data
    try {
      setLoading(true); // Set loading to true when submitting
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
    } finally {
      setLoading(false); // Set loading to false after API request completes
    }
  };

  return (
    <>
      <Header
        title="Create Tag"
        breadcrumbs={[{ text: "Tags", link: "/admin/tags" }]}
      />
      <div className="row">
        <div className="col-lg-7 mt-4 mx-auto">
          <div className="card border-0 p-4 rounded shadow">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Tag Name <span className="text-danger">*</span></label>
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
              <button type="submit" className="btn btn-success mt-2 float-end" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" role="status" />
                    <span className="visually-hidden">Loading...</span>
                  </>
                ) : (
                  "Add tag"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
