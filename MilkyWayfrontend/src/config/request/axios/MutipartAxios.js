import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
/**
 * FormData POST 요청
 */
export const POST_FORM = async (url, formData, config) => {
    try {
        const response = await axiosInstance.post(url, formData, {
            ...config,
            headers: {
                "Content-Type": "multipart/form-data",
                ...config?.headers,
            },
            timeout: 60000, // 1분 또는 그 이상으로 설정
        });
        return response.data;
    }
    catch (error) {
        toast.error("파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.", {
            position: "top-center",
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
export const PUT_FORM = async (url, formData, config) => {
    try {
        const response = await axiosInstance.put(url, formData, {
            ...config,
            timeout: config?.timeout ?? 80000, // 기본 20초로 설정, 필요에 따라 조절 가능
            headers: {
                "Content-Type": "multipart/form-data",
                ...config?.headers,
            },
        });
        return response.data;
    }
    catch (error) {
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
