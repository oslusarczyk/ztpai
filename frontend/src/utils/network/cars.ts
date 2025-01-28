import { sendRequest } from "../request";
import { getToken } from "./auth";

const getMostPopularCars = async () => {
  try {
    const token = getToken();
    const response = await sendRequest("/cars/most-popular", {
      method: "GET",
      requiresAuth: true,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getCarDetails = async (id: string) => {
  try {
    const token = getToken();
    const response = await sendRequest(`/cars/${id}`, {
      method: "GET",
      requiresAuth: true,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { getMostPopularCars, getCarDetails };
