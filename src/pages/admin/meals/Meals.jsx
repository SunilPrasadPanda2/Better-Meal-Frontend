import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import { getAllMeal } from "@/api/admin";
import { toast } from "react-toastify";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await getAllMeal();
        if (response && response.data && Array.isArray(response.data)) {
          setMeals(response.data);
        }
        // else {
        //   toast.error("No meals data available");
        // }
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to fetch meals");
      }
    };
    fetchMeals();
  }, []);

  return (
    <>
      <Header
        title="Meals"
        buttons={[
          {
            text: "Add Meal",
            link: "create",
          },
        ]}
      />
      <div className="row row-cols-md-2 row-cols-lg-5">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div className="col mt-4" key={meal._id}>
              <div
                className="card team border-0 rounded shadow overflow-hidden"
                style={{ height: "190px", width: "170px" }}
              >
                <Link
                  to={`${meal._id}`}
                  className="title text-dark h5 d-block"
                >
                  <div className="team-img position-relative">
                    <img
                      src={meal.image}
                      className="img-fluid"
                      style={{ width: "100%", height: "130px" }}
                      alt={meal.mealName}
                    />
                    <hr className="mt-0 mb-0"/>
                  </div>
                  <div className="card-body content text-center">
                    <p className="my-auto"> {meal.mealName}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col mt-4">
            <p>No meals available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Meals;
