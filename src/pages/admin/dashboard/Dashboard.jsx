import React from "react";
import { Link } from "react-router-dom";

import {
  GiMeal,
  MdOutlineQuestionMark,
  FaTags,
  VscRemoteExplorer,
  FaQuora,
  RiSurveyLine,
} from "../../../assets/icons/vander";

const Index = () => {
  return (
    <>
      <h5 className="mb-0">Dashboard</h5>
      <div className="row">
        <div className="col-xl-4 col-md-8 mt-4">
          <Link
            to={`/admin/meals`}
            className="d-flex align-items-center my-auto"
          >
            <div
              className="card features feature-primary rounded border-0 shadow p-4"
              style={{ height: "170px", width: "300px" }}
            >
              <div className="d-flex align-items-center my-auto">
                <div className="icon text-center rounded-md">
                  <GiMeal className="h3 mb-0" />
                </div>
                <div className="flex-1 ms-3">
                  <h5 className="mb-0">Meals</h5>
                  <p className="text-muted mb-0">684</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-8 mt-4">
          <Link
            to={`/admin/mealsPrefQuestions`}
            className="d-flex align-items-center my-auto"
          >
            <div
              className="card features feature-primary rounded border-0 shadow p-4"
              style={{ height: "170px", width: "300px" }}
            >
              <div className="d-flex align-items-center my-auto">
                <div className="icon text-center rounded-md">
                  <MdOutlineQuestionMark className="h3 mb-0" />
                </div>
                <div className="flex-1 ms-3">
                  <h5 className="mb-0">Meal Preference Questions</h5>
                  <p className="text-muted mb-0">67</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-4 col-md-8 mt-4">
          <Link
            to={`/admin/tags`}
            className="d-flex align-items-center my-auto"
          >
            <div
              className="card features feature-primary rounded border-0 shadow p-4"
              style={{ height: "170px", width: "300px" }}
            >
              <div className="d-flex align-items-center my-auto">
                <div className="icon text-center rounded-md">
                  <FaTags className="h3 mb-0" />
                </div>
                <div className="flex-1 ms-3">
                  <h5 className="mb-0">Tags</h5>
                  <p className="text-muted mb-0">35</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-4 col-md-8 mt-4">
          <Link
            to={`/admin/faqs`}
            className="d-flex align-items-center my-auto"
          >
            <div
              className="card features feature-primary rounded border-0 shadow p-4"
              style={{ height: "170px", width: "300px" }}
            >
              <div className="d-flex align-items-center my-auto">
                <div className="icon text-center rounded-md">
                  <FaQuora className="h3 mb-0" />
                </div>
                <div className="flex-1 ms-3">
                  <h5 className="mb-0">Faqs</h5>
                  <p className="text-muted mb-0">20</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-4 col-md-8 mt-4">
          <Link
            to={`/admin/explores`}
            className="d-flex align-items-center my-auto"
          >
            <div
              className="card features feature-primary rounded border-0 shadow p-4"
              style={{ height: "170px", width: "300px" }}
            >
              <div className="d-flex align-items-center my-auto">
                <div className="icon text-center rounded-md">
                  <VscRemoteExplorer className="h3 mb-0" />
                </div>
                <div className="flex-1 ms-3">
                  <h5 className="mb-0">Explore</h5>
                  <p className="text-muted mb-0">125</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-4 col-md-8 mt-4">
          <Link
            to={`/admin/gutSurvQuestions`}
            className="d-flex align-items-center my-auto"
          >
            <div
              className="card features feature-primary rounded border-0 shadow p-4"
              style={{ height: "170px", width: "300px" }}
            >
              <div className="d-flex align-items-center my-auto">
                <div className="icon text-center rounded-md">
                  <RiSurveyLine className="h3 mb-0" />
                </div>
                <div className="flex-1 ms-3">
                  <h5 className="mb-0">Gut Survey Questions</h5>
                  <p className="text-muted mb-0">123</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
