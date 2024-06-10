import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Header from "@/components/common/Header";
import { getAllGutSurvQuestions } from "@/api/admin";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";

export default function GutSurvQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllGutSurvQuestions();
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to fetch questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header
        title="Questions"
        buttons={[
          {
            text: "Add Question",
            link: "create",
          },
        ]}
      />
      <div className="row">
        <div className="col-12 mt-4">
          <div className="table-responsive shadow rounded">
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3 col-1">Id</th>
                  <th className="border-bottom p-3 col-9">Question</th>
                  <th className="border-bottom p-3 col-2">Get Detail</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={question._id}>
                    <th className="p-3 col-1">{index + 1}</th>
                    <td className="p-3 col-9">{question.question}</td>
                    <td className="p-3 col-2">
                      <Link
                        to={`${question._id}`}
                        className="title text-dark h5 d-block mb-0"
                      >
                        <button className="btn btn-info"><FaEye /></button>
                      </Link>
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
