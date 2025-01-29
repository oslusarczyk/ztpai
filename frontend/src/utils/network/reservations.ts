import { sendRequest } from "../request";
import { getToken } from "./auth";

export enum Status {
  PENDING = "pending",
  CANCELLED = "cancelled",
  CONFIRMED = "confirmed",
}

const getReservationsByUserId = async (userId: string, status: Status) => {
  try {
    const token = getToken();
    const response = await sendRequest(`/reservations`, {
      method: "GET",
      requiresAuth: true,
      token,
      params: {
        user_id: userId,
        status,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getPendingReservations = async () => {
  try {
    const token = getToken();
    const response = await sendRequest(`/reservations/pending`, {
      method: "GET",
      requiresAuth: true,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const updateReservationStatus = async (id: string, status: Status) => {
  try {
    const token = getToken();
    const response = await sendRequest(`/reservations/${id}`, {
      method: "PUT",
      requiresAuth: true,
      token,
      data: { status },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  getReservationsByUserId,
  getPendingReservations,
  updateReservationStatus,
};
