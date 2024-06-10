import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { useParams } from "react-router-dom";
import { getFaq } from "@/api/admin";
import { toast } from "react-toastify";

export default function FaqDetail() {
  const { _id } = useParams();
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await getFaq(_id);
        setFaq(response.data);
      } catch (error) {
        toast.error("Failed to fetch FAQ details");
      }
    };

    fetchFaq();
  }, [_id]);

  if (!faq) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header
        title="Faqs Detail"
        breadcrumbs={[
          {
            text: "Faqs",
            link: "/admin/faqs",
          },
        ]}
        buttons={[
          {
            text: "Edit Faq",
            link: `/admin/Faqs/edit/${_id}`,
          },
        ]}
      />
      <div className="card rounded shadow overflow-hidden mt-4 border-0 col-md-8 mx-auto">
        <div className="p-2 bg-primary bg-gradient"></div>
        <div className="avatar-profile d-flex margin-negative mt-n5 position-relative ps-3 pt-2">
          <div className="mt-4 ms-3 pt-3">
            <h6 className="mb-0 me-2">Question :</h6>
            <p className="mt-3 mb-1 ms-4">{faq.question}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-1">
            <div className="card border-0 rounded-0 p-4">
              <div className="tab-content mt-0" id="pills-tabContent">
                <div className="tab-pane fade show active">
                  <div className="row">
                    <div className="col-md-6 ms-2">
                      <div className="mb-3">
                        <h6 className="mb-0 me-2">Answer :</h6>
                        <div className="ms-4">
                          <p className="text-muted mb-0">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
