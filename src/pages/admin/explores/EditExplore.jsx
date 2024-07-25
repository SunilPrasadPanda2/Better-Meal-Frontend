import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dalma from "@/assets/images/meals/dalma.jpeg";
import Header from "@/components/common/Header";
import { getExplore, editExplore } from "@/api/admin";
import { toast } from "react-toastify";
import Loading from "@/pages/common/loading";

export default function EditExplore() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [exploreData, setExploreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    advice: "",
    tags: "",
    date: "",
    description: "",
    image: null,
    _id: _id,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        const data = await getExplore(_id);
        if (data && data.data) {
          setExploreData(data.data);
          setFormData({
            name: data.data.name,
            advice: data.data.advice,
            tags: data.data.tags.map((tag) => tag.tagName).join(", "),
            description: data.data.description,
            image: data.data.image,
            date: new Date(data.data.date).toISOString().split("T")[0],
            _id: _id,
          });
        }
      } catch (error) {
        console.error("Error fetching explore data:", error);
        toast.error("Failed to fetch explore data");
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      fetchExploreData();
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
    data.append("name", formData.name);
    data.append("advice", formData.advice);
    data.append("description", formData.description);
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    }
    data.append("_id", formData._id);
    data.append("date", formData.date);

    const tags = formData.tags.split(",").map((tagName) => tagName.trim());
    data.append("tags", JSON.stringify(tags));

    try {
      await editExplore(data);
      toast.success("Explore Updated Successfully");
      navigate(`/admin/explores/${_id}`);
    } catch (error) {
      console.error("Error updating explore data:", error);
      toast.error("Failed to update explore");
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

  if (!exploreData) {
    return <div>Error loading explore data.</div>;
  }

  return (
    <>
      <Header
        title="Edit Explore"
        breadcrumbs={[
          {
            text: "Explores",
            link: `/admin/explores`,
          },
          {
            text: "Explores Detail",
            link: `/admin/explores/${_id}`,
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
                      alt={formData.name}
                    />
                  </div>
                  <div className="col-lg-5 col-md-8 text-center text-md-start mt-4 mt-sm-0">
                    <label className="form-label">
                      Explore Image <span className="text-danger">*</span>
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
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="Explore Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
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
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
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
                      rows="3"
                      className="form-control"
                      placeholder="Advice"
                      value={formData.advice}
                      onChange={handleChange}
                      required
                    ></textarea>
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
                      className="form-control"
                      placeholder="Ex: Low Sugar, High Protein"
                      value={formData.tags}
                      onChange={handleChange}
                      required
                    ></textarea>
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
                      rows="3"
                      className="form-control"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success float-end"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Updating Explore..." : "Update Explore"}
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
