import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dashboardData } from "@/api/admin";
import meals from "../../../assets/images/icons/meals.jpg";
import mealPreference from "../../../assets/images/icons/meal_preference.jpg";
import tags from "../../../assets/images/icons/tags.jpg";
import faqs from "../../../assets/images/icons/faqs.jpg";
import explore from "../../../assets/images/icons/explore.jpg";
import groupImage from "../../../assets/images/icons/groupImage.jpeg";
import gut from "../../../assets/images/icons/gut.jpg";
import Loading from "@/pages/common/loading";

const Index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await dashboardData();
        // console.log("dashboard response",responseData);
        setData(responseData.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h5 className="mb-0">Dashboard</h5>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Loading />
        </div>
      ) : (
        <div className="row">
          {data && (
            <>
              <div className="col-xl-4 col-md-6 mt-4">
                <Link
                  to={`/admin/meals`}
                  className="d-flex align-items-center my-auto"
                >
                  <div
                    className="card features feature-primary rounded border-0 p-4"
                    style={{
                      height: "170px",
                      width: "300px",
                      boxShadow: "none",
                      transition:
                        "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="d-flex align-items-center my-auto">
                      <div className="icon text-center rounded-md">
                        <img
                          src={meals}
                          style={{ width: "65px", height: "65px" }}
                          className="h3 mb-0"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 ms-3 d-flex align-items-center">
                        <h5 className="mb-0">
                          Meals :{" "}
                          <span className="text-primary fw-bold">
                            {data.mealsCount}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-xl-4 col-md-6 mt-4">
                <Link
                  to={`/admin/mealsPrefQuestions`}
                  className="d-flex align-items-center my-auto"
                >
                  <div
                    className="card features feature-primary rounded border-0 p-4"
                    style={{
                      height: "170px",
                      width: "300px",
                      boxShadow: "none",
                      transition:
                        "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="d-flex align-items-center my-auto">
                      <div className="icon text-center rounded-md">
                        <img
                          src={mealPreference}
                          style={{ width: "65px", height: "65px" }}
                          className="h3 mb-0"
                          alt=""
                        />
                        {/* <MdOutlineQuestionMark className="h3 mb-0" /> */}
                      </div>
                      <div className="flex-1 ms-3 d-flex align-items-center">
                        <h5 className="mb-0">
                          Meal Preference Questions :{" "}
                          <span className="text-primary fw-bold">
                            {data.mealPreferenceQuestionsCount}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-xl-4 col-md-6 mt-4">
                <Link
                  to={`/admin/tags`}
                  className="d-flex align-items-center my-auto"
                >
                  <div
                    className="card features feature-primary rounded border-0 p-4"
                    style={{
                      height: "170px",
                      width: "300px",
                      boxShadow: "none",
                      transition:
                        "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="d-flex align-items-center my-auto">
                      <div className="icon text-center rounded-md">
                        {/* <FaTags className="h3 mb-0" /> */}
                        <img
                          src={tags}
                          style={{ width: "65px", height: "65px" }}
                          className="h3 mb-0"
                          alt=""
                        />
                      </div>

                      <div className="flex-1 ms-3 d-flex align-items-center">
                        <h5 className="mb-0">
                          Tags :{" "}
                          <span className="text-primary fw-bold">
                            {data.tagsCount}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-xl-4 col-md-6 mt-4">
                <Link
                  to={`/admin/faqs`}
                  className="d-flex align-items-center my-auto"
                >
                  <div
                    className="card features feature-primary rounded border-0 p-4"
                    style={{
                      height: "170px",
                      width: "300px",
                      boxShadow: "none",
                      transition:
                        "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="d-flex align-items-center my-auto">
                      <div className="icon text-center rounded-md">
                        {/* <FaQuora className="h3 mb-0" /> */}
                        <img
                          src={faqs}
                          style={{ width: "65px", height: "65px" }}
                          className="h3 mb-0"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 ms-3 d-flex align-items-center">
                        <h5 className="mb-0">
                          Faqs :{" "}
                          <span className="text-primary fw-bold">
                            {data.faqsCount}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-xl-4 col-md-6 mt-4">
                <Link
                  to={`/admin/gutSurvQuestions`}
                  className="d-flex align-items-center my-auto"
                >
                  <div
                    className="card features feature-primary rounded border-0 p-4"
                    style={{
                      height: "170px",
                      width: "300px",
                      boxShadow: "none",
                      transition:
                        "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="d-flex align-items-center my-auto">
                      <div className="icon text-center rounded-md">
                        {/* <RiSurveyLine className="h3 mb-0" /> */}
                        <img
                          src={gut}
                          style={{ width: "65px", height: "65px" }}
                          className="h3 mb-0"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 ms-3 d-flex align-items-center">
                        <h5 className="mb-0">
                          Gut Survey Questions :{" "}
                          <span className="text-primary fw-bold">
                            {data.gutSurveyQuestionsCount}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xl-4 col-md-6 mt-4">
                <Link
                  to={`/admin/users`}
                  className="d-flex align-items-center my-auto"
                >
                  <div
                    className="card features feature-primary rounded border-0 p-4"
                    style={{
                      height: "170px",
                      width: "300px",
                      boxShadow: "none",
                      transition:
                        "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="d-flex align-items-center my-auto">
                      <div className="icon text-center rounded-md">
                        {/* <VscRemoteExplorer className="h3 mb-0" /> */}
                        <img
                          src={groupImage}
                          style={{ width: "65px", height: "65px" }}
                          className="h3 mb-0"
                          alt=""
                        />
                      </div>

                      <div className="flex-1 ms-3 d-flex align-items-center">
                        <h5 className="mb-0">
                          Users :{" "}
                          <span className="text-primary fw-bold">
                            {data.userCount}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
