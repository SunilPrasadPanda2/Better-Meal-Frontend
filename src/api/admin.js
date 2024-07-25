import { api } from "../utils/services/axios.service";

export const dashboardData = async () => {
  // const authData = JSON.parse(localStorage.getItem("persist:auth"));
  // const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/dashboard"
    //   , {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    throw error;
  }
};

export const addMeal = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  let response;
  try {
    response = await api.post("/admin/add-meal", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response.data;
};

export const getAllMeal = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/get-all-meals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const getMeal = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(`/admin/get-meal/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const deleteMeal = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.delete(`/admin/delete-meal`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data, // Adding data to the request configuration
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting subquestion:", error);
    throw error;
  }
};

export const editMeal = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.post("/admin/edit-meal", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const getMealAllQuestions = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/get-all-meal-questions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const getMealQuestion = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(
      `/admin/get-meal-preference-question/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const addMealQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  let response;
  try {
    response = await api.post("admin/add-meal-preference", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error fetching meal data:", error);
    return error;
  }
  return response.data;
};

export const editMealQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.post("/admin/edit-meal-preference", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating meal question:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const deleteMealQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.delete(`/admin/delete-mealPreference-question`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting subquestion:", error);
    throw error;
  }
};

export const addMealSubQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  let response;
  try {
    response = await api.post("admin/add-meal-preference-subquestion", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error fetching meal data:", error);
    return error;
  }
  return response.data;
};

export const getMealSubQuestions = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(`/admin/get-all-meal-subquestions/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const deleteSubQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.delete(
      `/admin/remove-meal-preference-subquestion`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data, // Adding data to the request configuration
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting subquestion:", error);
    throw error;
  }
};

export const getSubQuestion = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(
      `/admin/get-single-meal-subquestions/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const editSubQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.post(
      "/admin/edit-meal-preference-subquestion",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating meal question:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const addTag = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.post("/admin/add-tag", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

export const getAllTags = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/all-tags", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

export const deleteTag = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.delete(`/admin/delete-tag/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
};

export const getAllFaqs = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/all-faqs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

export const addFaq = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  let response;
  try {
    response = await api.post("/admin/add-faq", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error adding tag:", error);
    return error;
  }
  return response.data;
};

export const getFaq = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(`admin/get-faq/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const deleteFaq = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.delete(`/admin/delete-faq/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    throw error;
  }
};

export const EditFaqs = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.post("/admin/edit-faq", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

export const getAllGutSurvQuestions = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/all-gut-survey-questions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

export const addGutSurveyQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  let response;
  try {
    response = await api.post("/admin/add-gut-survey-questions", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error adding tag:", error);
    return error;
  }
  return response.data;
};

export const getSurvQuestion = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(`admin/get-gut-survey-question/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const editGutSurvQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.post("/admin/edit-gut-survey-question", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

export const deleteGutQuestion = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.delete(`/admin/remove-gut-question`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting subquestion:", error);
    throw error;
  }
};

export const addExplores = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  let response;
  try {
    response = await api.post("/admin/add-explore-survey", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response.data;
};

export const getAllExplore = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/get-all-explore-section", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const getExplore = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(`/admin/get-single-explore-section/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const editExplore = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.post("/admin/edit-explore-survey", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meal data:", error);
    throw error;
  }
};

export const deleteExplore = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.delete(`/admin/remove-explore`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data, // Adding data to the request configuration
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting subquestion:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

export const deleteUser = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).token;
  try {
    const response = await api.get(`/admin/removeUser/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
};