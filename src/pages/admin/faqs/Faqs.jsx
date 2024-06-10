import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import { getAllFaqs, deleteFaq } from "@/api/admin";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getAllFaqs();
        setFaqs(response.data);
      } catch (error) {
        toast.error("Failed to fetch FAQs");
      }
    };

    fetchFaqs();
  }, [reload]);

  const handleDelete = async (_id) => {
    const confirmDelete = () => {
      return new Promise((resolve) => {
        toast.info(
          <div>
            <p>Are you sure you want to delete this FAQ?</p>
            <button className="btn btn-danger" onClick={() => resolve(true)}>
              Yes
            </button>
            <button className="btn btn-secondary" onClick={() => resolve(false)}>
              No
            </button>
          </div>,
          {
            autoClose: false,
            closeOnClick: true,
            draggable: false,
          }
        );
      });
    };

    const result = await confirmDelete();

    if (result) {
      try {
        await deleteFaq(_id);
        toast.success("FAQ deleted successfully");
        setReload(!reload);
      } catch (error) {
        toast.error("Failed to delete FAQ");
      }
    }
  };

  return (
    <>
      <Header
        title="Faqs"
        buttons={[
          {
            text: "Add Faq",
            link: "create",
          },
        ]}
      />
      <div className="row">
        <div className="col-10 mt-4 mx-auto">
          <div className="table-responsive shadow rounded">
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3 col-1">Id</th>
                  <th className="border-bottom p-3 col-6">Question</th>
                  <th className="border-bottom p-3 col-3">Details</th>
                  <th className="border-bottom p-3 col-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, index) => (
                  <tr key={faq._id}>
                    <th className="p-3 col-1">{index + 1}</th>
                    <td className="p-3 col-6">{faq.question}</td>
                    <td className="p-3 col-3">
                      <Link to={`${faq._id}`} className="title text-dark h5 d-block mb-0">
                        <button className="btn btn-info"><FaEye /></button>
                      </Link>
                    </td>
                    <td className="p-3 col-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(faq._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
