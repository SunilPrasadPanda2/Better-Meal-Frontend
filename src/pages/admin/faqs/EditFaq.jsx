import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { getFaq, EditFaqs } from "@/api/admin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function EditFaq() {
  const { _id } = useParams(); // Assuming you're using react-router to get the FAQ id from the URL
  const { register, setValue, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
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
      const updatedData = { ...data, _id }; // Include the _id in the data being sent
      await EditFaqs(updatedData);
      toast.success("FAQ updated successfully!");
      navigate("/admin/faqs"); // Redirect to FAQ list after success
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Failed to update FAQ.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header
        title="Edit Faq"
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
                    <label className="form-label">Faq Question :</label>
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
                    <label className="form-label">Answer :</label>
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
              <button type="submit" className="btn btn-success float-end">
                Update Faq
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
