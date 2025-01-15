// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:3000";
//localhost:3001
console.log(BASE_URL);

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
  console.log(BASE_URL);
  const url = `${BASE_URL}${endpoint}`;
  console.log(url);
  const headers: HeadersInit =
    data instanceof FormData ? {} : { "Content-Type": "application/json" };
  if (requiresAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const body =
    method !== "GET"
      ? data instanceof FormData
        ? data
        : JSON.stringify(data)
      : undefined;

  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  return response.json().then(
    (error) => {
      throw error;
    },
    () => {
      throw `Client failed to send request to "${url}". Returned status: ${response.status}`;
    }
  );
};

export { sendRequest };
