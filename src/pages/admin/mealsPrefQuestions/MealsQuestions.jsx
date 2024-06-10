import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import { getMealAllQuestions } from "@/api/admin";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";

export default function MealsQuestions() {
  const [mealQuestions, setMealQuestions] = useState([]);

  useEffect(() => {
    const fetchMealQuestions = async () => {
      try {
        const response = await getMealAllQuestions();
        if (response && response.data && Array.isArray(response.data)) {
          setMealQuestions(response.data);
        } else {
          toast.error("No meals questions are available");
        }
      } catch (error) {
        console.error("Error fetching meals questions:", error);
        toast.error("Failed to fetch meal questions");
      }
    };
    fetchMealQuestions();
  }, []);

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
        <div className="col-10 mt-4 mx-auto">
          <div className="table-responsive shadow rounded">
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3 col-1">Id</th>
                  <th className="border-bottom p-3 col-7">Question</th>
                  <th className="border-bottom p-3 col-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {mealQuestions.length > 0 ? (
                  mealQuestions.map((question, index) => (
                    <tr key={question._id}>
                      <th className="p-3 col-1">{index + 1}</th>
                      <td className="p-3 col-7">{question.question}</td>
                      <td className="p-3 col-2">
                        <Link
                          to={`${question._id}`}
                          className="title text-dark h5 d-block mb-0"
                        >
                          <button className="btn btn-info">
                            {/* Get Details */}
                            <FaEye />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="col mt-4">
                    <p>No questions available</p>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
