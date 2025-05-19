import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

/**
 * FormData POST 요청
 */
export const POST_FORM = async (
  url: string,
  formData: FormData,
  config?: AxiosRequestConfig
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.post(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST_FORM error:", error);
    throw error;
  }
};

/**
 * FormData PUT 요청
 */
export const PUT_FORM = async (
  url: string,
  formData: FormData,
  config?: AxiosRequestConfig
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axiosInstance.put(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST_FORM error:", error);
    throw error;
  }
};
