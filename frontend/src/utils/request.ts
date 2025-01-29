const BASE_URL = process.env.REACT_APP_BASE_URL;

interface RequestOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  data?: any;
  requiresAuth?: boolean;
  token?: string | null;
  params?: Record<string, string | number>; // Add support for query parameters
}

const sendRequest = async (
  endpoint: string,
  { method, data, requiresAuth = false, token, params }: RequestOptions
): Promise<any> => {
  const queryString = params
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : "";
  const url = `${BASE_URL}${endpoint}${queryString}`;
  console.log(url);
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
      const errorData = await response.json();
      throw { ...errorData, status: response.status };
    }
    return response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export { sendRequest };
