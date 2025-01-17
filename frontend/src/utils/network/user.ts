import { sendRequest } from "../request";

const register = async (email: string, password: string) => {
  try {
    const response = await sendRequest("/user/register", {
      method: "POST",
      data: { email, password },
      requiresAuth: false,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { register };
