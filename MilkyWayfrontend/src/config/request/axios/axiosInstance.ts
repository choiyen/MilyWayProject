import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from "axios";
import { baseURL, timeout } from "./util";

// 환경 변수 사용
const TIMEOUT = timeout ? parseInt(timeout, 10) : undefined;

//요청 인터셉터
const requestInterceptor = {
  onFulfilled: (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    config.withCredentials = true;

    // config를 InternalAxiosRequestConfig으로 캐스팅
    const internalConfig = config as InternalAxiosRequestConfig;

    return internalConfig;
  },
  onRejected: (error: AxiosError) => Promise.reject(error),
};

const ResponseInterceptor = {
  ouFulfilled: (response: AxiosResponse) => {
    const contentType = response.headers["content-type"]?.toString();
    const isJson = contentType?.includes("application/json");

    if (isJson) {
      try {
        if (response.data === "목표 생성 성공") return response;

        if (typeof response.data === "string") {
          response.data = JSON.parse(response.data);
        } else if (typeof response.data !== "object") {
          throw new Error("Invalid JSON response");
        }
      } catch {
        throw new Error("AXIOS Parse ERROR");
      }
    }

    if (
      typeof response.data === "string" &&
      response.data.includes("<!doctype html>")
    ) {
      throw new AxiosError("Not Found", "404", undefined, undefined, response);
    }

    if (response.status >= 400) {
      const code = response.data?.code || response.statusText;
      const messageInConfig =
        response.data.message || response.data?.error?.message;

      const message =
        typeof messageInConfig === "string"
          ? messageInConfig
          : Array.isArray(messageInConfig)
          ? messageInConfig.find((v) => v) || response.statusText
          : response.statusText || messageInConfig;

      throw new AxiosError(message, code, undefined, undefined, response);
    }

    return response;
  },
  onRejected: async (error: AxiosError) => {
    const { response } = error;

    // response가 없을 경우 네트워크 오류나 CORS 문제 등으로 처리
    if (!response) {
      console.error("No response received:", error);
      alert("서버와의 연결에 문제가 발생했습니다. 인터넷 연결을 확인해주세요.");
      return Promise.reject(error);
    }

    // 401 에러 처리 (세션 만료 시)
    if (response.status === 401) {
      window.location.href =
        GateWayNumber.Manager + "/" + ManagerGateWayType.Main; // 세션 만료되면 로그인 페이지로 리디렉션
      return;
    }

    return Promise.reject(error);
  },
};

//Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: TIMEOUT,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);

axiosInstance.interceptors.response.use(
  ResponseInterceptor.ouFulfilled,
  ResponseInterceptor.onRejected
);

const curringMethod =
  (method: Method) =>
  async (requestConfig: Omit<AxiosRequestConfig, "method">) => {
    console.log(requestConfig);
    return axiosInstance
      .request({ ...requestConfig, method })
      .then((response) => response.data);
  };

export const GET = curringMethod("get");
export const POST = curringMethod("post");
export const PUT = curringMethod("put");
export const DELETE = curringMethod("delete");
export const OPTIONS = curringMethod("options");
export const PATCH = curringMethod("patch");

export default axiosInstance;

/***
 * 
 * import { GET } from "@/api/axiosInstance";

const fetchUserData = async () => {
  try {
    const data = await GET({
      url: "/user/info", // 실제 API 경로
      params: { userId: "1234" },
    });

    console.log("User Info:", data);
  } catch (error) {
    console.error("GET 요청 실패:", error);
  }
};
 */
