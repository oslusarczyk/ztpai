import { sendRequest } from "../request";

const register = async (email: string, password: string) => {
  try {
    const response = await sendRequest("/user/register", {
      method: "POST",
      data: { email, password },
      requiresAuth: false,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

export { register };
