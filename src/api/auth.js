import { api } from "../utils/services/axios.service";

export const login = async (data) => {
  let response;
  try {
    response = await api.post("/admin/login", data);
  } catch (error) {
    return error;
  }

  return response.data.data;
};

export const logout = async () => {
  let response;
  try {
    response = await api.post("/admin/logout", data);
  } catch (error) {
    return error;
  }

  return response.data.data;
};
