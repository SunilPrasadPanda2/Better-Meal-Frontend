import React, { useState } from "react";
import dalma from "@/assets/images/meals/dalma.jpeg";
import Header from "@/components/common/Header";
import { addExplores } from "@/api/admin";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddExplore() {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(dalma);
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("advice", data.advice);
    formData.append("tags", data.tags);
    formData.append("description", data.description);
    formData.append("date", data.date);
    try {
      const response = await addExplores(formData);
      if (response.data) {
        toast.success("Explore created successfully");
        navigate("/admin/explores");
      } else if (response.response.status === 409) {
        toast.error("This explore already exists");
        navigate("/admin/explores");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);
  };

  return (
    <>
      <Header
        title="Create Explore"
        breadcrumbs={[
          {
            text: "Explores",
            link: "/admin/explores",
          },
        ]}
      />
      <div className="row">
        <div className="col-lg-12 mt-4">
          <div className="card border-0 p-4 rounded shadow">
            <form className="mt-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="row align-items-center mb-3">
                  <div className="col-lg-2 col-md-4">
                    <img
                      src={imageURL}
                      className="avatar avatar-md-md rounded-pill shadow mx-auto d-block"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-5 col-md-8 text-center text-md-start mt-4 mt-sm-0">
                    <label className="form-label">
                      Explore Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className={`form-control ${
                        errors.image ? "is-invalid" : ""
                      }`}
                      {...register("image", { required: "Image is required" })}
                      onChange={(e) => {
                        handleImageChange(e);
                        // Update React Hook Form with the selected file
                        register("image").onChange(e);
                      }}
                    />
                    {errors.image && (
                      <p className="text-danger">Image is required</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Explore Name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="invalid-feedback">Name is required</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Date <span className="text-danger">*</span>
                    </label>
                    <input
                      name="date"
                      id="date"
                      type="date"
                      className={`form-control ${
                        errors.date ? "is-invalid" : ""
                      }`}
                      {...register("date", { required: true })}
                    />
                    {errors.date && (
                      <span className="invalid-feedback">Date is required</span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Advice <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="advice"
                      id="advice"
                      rows="2"
                      className={`form-control ${
                        errors.advice ? "is-invalid" : ""
                      }`}
                      placeholder="Advice"
                      {...register("advice", { required: true })}
                    ></textarea>
                    {errors.advice && (
                      <span className="invalid-feedback">
                        Advice is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Tags <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="tags"
                      id="tags"
                      rows="2"
                      className={`form-control ${
                        errors.tags ? "is-invalid" : ""
                      }`}
                      placeholder="Ex: Low Sugar, High Protein"
                      {...register("tags", { required: true })}
                    ></textarea>
                    {errors.tags && (
                      <span className="invalid-feedback">
                        Tags are required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows="2"
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      placeholder="Description"
                      {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && (
                      <span className="invalid-feedback">
                        Description is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button className="btn btn-success float-end">Add Explore</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
