const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Use env variable or fallback to backend URL

interface RequestOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: any;
  requiresAuth?: boolean;
  token?: string | null;
}

const sendRequest = async (
  endpoint: string,
  { method, data, requiresAuth = false, token }: RequestOptions
): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;
  console.log("Request URL:", url);

  // Prepare headers
  const headers: HeadersInit = {
    ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const body =
    method !== "GET"
      ? data instanceof FormData
        ? data
        : JSON.stringify(data)
      : undefined;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      // Handle non-2xx responses
      const error = await response.json().catch(() => null);
      throw error || `Error ${response.status}: ${response.statusText}`;
    }

    return response.json(); // Return parsed JSON for successful responses
  } catch (error) {
    console.error("Request failed:", error);
    throw error; // Propagate error to the caller
  }
};

export { sendRequest };
