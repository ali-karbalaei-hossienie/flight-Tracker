import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  [key: string]: unknown;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>): Promise<never> => {
    let errorMessage = "An error occurred. Please try again.";

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as ApiErrorResponse | undefined;

      const backendMessage = data?.message || data?.error;

      switch (status) {
        case 400:
          errorMessage = backendMessage || "Invalid request (Bad Request).";
          break;
        case 403:
          errorMessage = "You do not have permission to access this resource.";
          break;
        case 404:
          errorMessage = "Resource not found (404).";
          break;
        case 422:
          errorMessage = backendMessage || "Data validation failed.";
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = "Server error! Please try again later.";
          break;
        default:
          errorMessage = backendMessage || errorMessage;
      }
    } else if (error.request) {
      errorMessage =
        "Unable to connect to the server. Please check your internet connection.";
    } else {
      errorMessage = error.message;
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  },
);

export default apiClient;
