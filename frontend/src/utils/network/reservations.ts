import { sendRequest } from "../request";
import { getToken } from "./auth";

// const getCarDetails = async (id: string) => {
//   try {
//     const token = getToken();
//     const response = await sendRequest(`/cars/${id}`, {
//       method: "GET",
//       requiresAuth: true,
//       token,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

const getReservationsByUserId = async (
  userId: string,
  status: "pending" | "cancelled" | "confirmed"
) => {
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
