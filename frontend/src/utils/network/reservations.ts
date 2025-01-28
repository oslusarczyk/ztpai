import { sendRequest } from "../request";
import { getToken } from "./auth";

const getReservationsByUserId = async (
  userId: string,
  status: "pending" | "cancelled" | "confirmed"
): Promise<[]> => {
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

export { getReservationsByUserId };
