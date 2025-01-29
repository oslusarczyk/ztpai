import { sendRequest } from "../request";
import { getToken } from "./auth";

const getLocations = async () => {
  try {
    const token = getToken();
    const response = await sendRequest("/locations", {
      method: "GET",
      requiresAuth: true,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getBrands = async () => {
  try {
    const token = getToken();
    const response = await sendRequest("/brands", {
      method: "GET",
      requiresAuth: true,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { getLocations, getBrands };
