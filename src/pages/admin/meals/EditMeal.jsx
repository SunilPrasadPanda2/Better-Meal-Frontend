import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dalma from "@/assets/images/meals/dalma.jpeg";
import Header from "@/components/common/Header";
import { getMeal, editMeal } from "@/api/admin";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

export default function EditMeal() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    mealName: "",
    calories: "",
    nutrientsInfo: "",
    mealTiming: "",
    tags: "",
    description: "",
    image: null,
    quantity: "",
    _id: _id,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const data = await getMeal(_id);
        if (data && data.data) {
          setMealData(data.data);
          setFormData({
            mealName: data.data.mealName,
            calories: data.data.calories,
            nutrientsInfo: data.data.nutrientsInfo,
            mealTiming: data.data.mealTiming.join(", "),
            tags: data.data.tags.map((tag) => tag.tagName).join(", "),
            description: data.data.description,
            image: data.data.image,
            quantity: data.data.quantity,
            _id: _id,
          });
        }
      } catch (error) {
        console.error("Error fetching meal data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      fetchMealData();
    }
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    data.append("mealName", formData.mealName);
    data.append("calories", formData.calories);
    data.append("nutrientsInfo", formData.nutrientsInfo);
    data.append("description", formData.description);
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    }
    data.append("_id", formData._id);
    data.append("quantity", formData.quantity);

    const mealTiming = formData.mealTiming
      .split(", ")
      .map((time) => time.trim())
      .join(", ");
    data.append("mealTiming", mealTiming);

    const tags = formData.tags
      .split(", ")
      .map((tagName) => tagName.trim())
      .join(", ");
    data.append("tags", tags);

    try {
      await editMeal(data);
      toast.success("Meal Updated Successfully");
      navigate(`/admin/meals/${_id}`);
    } catch (error) {
      console.error("Error updating meal data:", error);
      toast.error("Failed to update meal");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!mealData) {
    return <div>Error loading meal data.</div>;
  }

  return (
    <>
      <Header
        title="Edit Meal"
        breadcrumbs={[
          {
            text: "Meals",
            link: `/admin/meals`,
          },
          {
            text: "Meals Detail",
            link: `/admin/meals/${_id}`,
          },
        ]}
      />
      <div className="row">
        <div className="col-lg-10 mt-4 mx-auto">
          <div className="card border-0 p-4 rounded shadow">
            <form className="mt-0" onSubmit={handleSubmit}>
              <div className="row">
                <div className="row align-items-center mb-3">
                  <div className="col-lg-2 col-md-4">
                    <img
                      src={
                        formData.image instanceof File
                          ? URL.createObjectURL(formData.image)
                          : formData.image || dalma
                      }
                      className="avatar avatar-md-md rounded-pill shadow mx-auto d-block"
                      alt={formData.mealName}
                    />
                  </div>
                  <div className="col-lg-5 col-md-8 text-center text-md-start mt-4 mt-sm-0">
                    <label className="form-label">
                      Meal Image :<span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Meal Name :<span className="text-danger">*</span>
                    </label>
                    <input
                      name="mealName"
                      id="mealName"
                      type="text"
                      className="form-control"
                      placeholder="Enter Meal Name"
                      value={formData.mealName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Calories :<span className="text-danger">*</span>
                    </label>
                    <input
                      name="calories"
                      id="calories"
                      type="text"
                      className="form-control"
                      placeholder="Ex: 000k"
                      value={formData.calories}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Nutrients :<span className="text-danger">*</span>
                    </label>
                    <input
                      name="nutrientsInfo"
                      id="nutrientsInfo"
                      type="text"
                      className="form-control"
                      placeholder="Ex: Nutrient1:00g, Nutrient2:00g"
                      value={formData.nutrientsInfo}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Meal Times :<span className="text-danger">*</span>
                    </label>
                    <input
                      name="mealTiming"
                      id="mealTiming"
                      type="text"
                      className="form-control"
                      placeholder="Ex: Morning, Afternoon"
                      value={formData.mealTiming}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Tags :<span className="text-danger">*</span>
                    </label>
                    <input
                      name="tags"
                      id="tags"
                      type="text"
                      className="form-control"
                      placeholder="Ex: Low Sugar, High Protein"
                      value={formData.tags}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Quantity :<span className="text-danger">*</span>
                    </label>
                    <input
                      name="quantity"
                      id="quantity"
                      type="text"
                      className="form-control"
                      placeholder="Ex: Bowl: 200g"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Description :<span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows="2"
                      className="form-control"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success float-end"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Updating Meal..." : "Update Meal"}
              </button>
              {submitting && (
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
}
