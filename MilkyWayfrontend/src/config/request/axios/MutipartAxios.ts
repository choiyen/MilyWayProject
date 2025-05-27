import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
    toast.error("파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    Swal.fire({
      icon: "error",
      title: "파일 업로드 실패",
      text: "파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.",
      confirmButtonText: "확인",
    });
    throw error;
  }
};
