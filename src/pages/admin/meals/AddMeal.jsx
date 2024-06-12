import React, { useState } from "react";
import meal from "@/assets/images/meals/mealimage.jpg";
import Header from "@/components/common/Header";
import { addMeal } from "@/api/admin";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddMeal = () => {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(meal);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("mealName", data.mealName);
    formData.append("calories", data.calories);
    formData.append("nutrientsInfo", data.nutrientsInfo);
    formData.append("mealTiming", data.mealTiming);
    formData.append("tags", data.tags);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    try {
      const response = await addMeal(formData);
      if (response) {
        console.log(response);
        toast.success(response.message);
        navigate("/admin/meals");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
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
        title="Create Meal"
        breadcrumbs={[
          {
            text: "Meals",
            link: "/admin/meals",
          },
        ]}
      />
      <div className="row">
        <div className="col-lg-10 mt-4 mx-auto">
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
                    <label className="form-label">Meal Image :<span className="text-danger">*</span></label>
                    <input
                      type="file"
                      name="image"
                      className={`form-control ${
                        errors.image ? "is-invalid" : ""
                      }`}
                      {...register("image", { required: "Image is required" })}
                      onChange={(e) => {
                        handleImageChange(e);
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
                    <label className="form-label">Meal Name :<span className="text-danger">*</span></label>
                    <input
                      name="mealName"
                      id="mealName"
                      type="text"
                      className={`form-control ${
                        errors.mealName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Meal Name"
                      {...register("mealName", { required: true })}
                    />
                    {errors.mealName && (
                      <span className="invalid-feedback">
                        Meal Name is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Calories :<span className="text-danger">*</span></label>
                    <input
                      name="calories"
                      id="calories"
                      type="text"
                      className={`form-control ${
                        errors.calories ? "is-invalid" : ""
                      }`}
                      placeholder="Ex: 000k"
                      {...register("calories", { required: true })}
                    />
                    {errors.calories && (
                      <span className="invalid-feedback">
                        Calories are required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Nutrients :<span className="text-danger">*</span></label>
                    <input
                      name="nutrientsInfo"
                      id="nutrientsInfo"
                      type="text"
                      className={`form-control ${
                        errors.nutrientsInfo ? "is-invalid" : ""
                      }`}
                      placeholder="Ex: Nutrient1:00g, Nutrient2:00g"
                      {...register("nutrientsInfo", { required: true })}
                    />
                    {errors.nutrientsInfo && (
                      <span className="invalid-feedback">
                        Nutrients are required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Meal Times :<span className="text-danger">*</span></label>
                    <input
                      name="mealTiming"
                      id="mealTiming"
                      type="text"
                      className={`form-control ${
                        errors.mealTiming ? "is-invalid" : ""
                      }`}
                      placeholder="Ex: Morning, Afternoon"
                      {...register("mealTiming", { required: true })}
                    />
                    {errors.mealTiming && (
                      <span className="invalid-feedback">
                        Meal timings are required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Tags :<span className="text-danger">*</span></label>
                    <input
                      name="tags"
                      id="tags"
                      type="text"
                      className={`form-control ${
                        errors.tags ? "is-invalid" : ""
                      }`}
                      placeholder="Ex: Low Sugar, High Protein"
                      {...register("tags", { required: true })}
                    />
                    {errors.tags && (
                      <span className="invalid-feedback">
                        Tags are required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Quantity :<span className="text-danger">*</span></label>
                    <input
                      name="quantity"
                      id="quantity"
                      type="text"
                      className={`form-control ${
                        errors.quantity ? "is-invalid" : ""
                      }`}
                      placeholder="Ex: Bowl:200g"
                      {...register("quantity", { required: true })}
                    />
                    {errors.quantity && (
                      <span className="invalid-feedback">
                        quantity is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Description :<span className="text-danger">*</span></label>
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
              <button
                className="btn btn-success float-end mt-3"
                disabled={loading}
              >
                {loading ? "Adding Meal..." : "Add Meal"}
              </button>
              {loading && (
                <div className="text-center mt-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMeal;
