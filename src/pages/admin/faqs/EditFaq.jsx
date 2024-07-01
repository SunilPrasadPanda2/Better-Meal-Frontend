import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { getFaq, EditFaqs } from "@/api/admin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed
import Loading from "@/pages/common/loading";

export default function EditFaq() {
  const { _id } = useParams(); // Assuming you're using react-router to get the FAQ id from the URL
  const { register, setValue, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const faqData = await getFaq(_id);
        setValue("question", faqData.data.question);
        setValue("answer", faqData.data.answer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        toast.error("Failed to fetch FAQ data.");
        setLoading(false);
      }
    };

    fetchFaq();
  }, [_id, setValue]);

  const onSubmit = async (data) => {
    try {
      setUpdating(true); // Set updating state to true while API request is being made
      const updatedData = { ...data, _id }; // Include the _id in the data being sent
      await EditFaqs(updatedData);
      toast.success("FAQ updated successfully!");
      navigate("/admin/faqs"); // Redirect to FAQ list after success
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Failed to update FAQ.");
    } finally {
      setUpdating(false); // Reset updating state when API request is completed
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
        title="Edit FAQ"
        breadcrumbs={[
          {
            text: "Faqs",
            link: "/admin/faqs",
          },
          {
            text: "Faqs Detail",
            link: `/admin/faqs/${_id}`,
          },
        ]}
      />
      <div className="row">
        <div className="col-lg-8 mt-4 mx-auto">
          <div className="card border-0 p-4 rounded shadow">
            <form className="mt-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Faq Question <span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("question")}
                      id="question"
                      type="text"
                      className="form-control"
                      placeholder="Faq Question"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Answer <span className="text-danger">*</span>
                    </label>
                    <textarea
                      {...register("answer")}
                      id="answer"
                      rows="2"
                      className="form-control"
                      placeholder="Answer"
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success float-end"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Spinner animation="border" size="sm" role="status" />
                    <span className="visually-hidden">Updating...</span>
                  </>
                ) : (
                  "Update Faq"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
