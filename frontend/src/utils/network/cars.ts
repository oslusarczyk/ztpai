import { sendRequest } from "../request";
import { FilterParams } from "../../components/searchForm/searchForm";
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

const getCars = async (filters: FilterParams) => {
  try {
    const token = getToken();
    const response = await sendRequest(`/cars`, {
      method: "GET",
      requiresAuth: true,
      params: { ...filters },
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

const addCar = async (formData: FormData) => {
  try {
    const token = getToken();
    const response = await sendRequest(`/cars`, {
      method: "POST",
      requiresAuth: true,
      token,
      data: formData,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export { getMostPopularCars, getCarDetails, getCars, addCar };
