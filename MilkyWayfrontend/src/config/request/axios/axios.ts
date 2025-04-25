import store from "@/config/reduxstore";
import axios, {
  AxiosError,
  AxiosResponse,
  Method,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import { handleTokenExpiration } from "./handleTokenExpiration";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";

// 환경설정
const AUTH_MODE: "JWT" | "SESSION" = process.env.REACT_APP_AUTH_MODE as
  | "JWT"
  | "SESSION";
const MEDIUM_REQUEST_TIMEOUT = 5000;

// 요청 인터셉터
const requestInterceptor = {
  onFulfilled: (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    if (AUTH_MODE === "JWT") {
      const { accessToken } = store.getState().auth;
      if (accessToken) {
        config.headers?.set("Authorization", `Bearer ${accessToken}`);
      }
    }
    return config;
  },

  onRejected: (error: AxiosError) => Promise.reject(error),
};

// 응답 인터셉터
const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
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
        throw new Error("Axios Parse Error");
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
    const { response, config } = error;

    if (!response) {
      console.error("No response received:", error);
      alert("서버와의 연결에 문제가 발생했습니다. 인터넷 연결을 확인해주세요.");
      return Promise.reject(error);
    }

    // 401 에러 처리
    if (response.status === 401) {
      if (AUTH_MODE === "JWT") {
        // 응답 데이터 구조 점검 후 'error' 속성이 존재하는지 확인
        const tokenExpired =
          (response.data as { error?: { error?: string } })?.error?.error ===
          "TOKEN_EXPIRED";
        const { refreshToken } = store.getState().auth;

        if (tokenExpired) {
          if (!refreshToken) {
            window.location.href =
              GateWayNumber.Manager + "/" + ManagerGateWayType.Main;
            return;
          }

          return handleTokenExpiration(refreshToken, config!);
        }
      }

      if (AUTH_MODE === "SESSION") {
        window.location.href =
          GateWayNumber.Manager + "/" + ManagerGateWayType.Main;
        return;
      }
    }

    return Promise.reject(error);
  },
};

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "/api", // 기본 API 경로
  timeout: MEDIUM_REQUEST_TIMEOUT, // 타임아웃 설정
  withCredentials: AUTH_MODE === "SESSION", // 세션 인증 방식 시 쿠키 포함
});

// 인터셉터 연결
axiosInstance.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);

axiosInstance.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

// 메서드 헬퍼
const curringMethod =
  (method: Method) =>
  async ({
    timeout = MEDIUM_REQUEST_TIMEOUT,
    ...requestConfig
  }: Omit<AxiosRequestConfig, "method">) => {
    return axiosInstance
      .request({ ...requestConfig, timeout, method })
      .then((response) => response.data);
  };

// 요청 메서드 별로 export
export const GET = curringMethod("get");
export const POST = curringMethod("post");
export const PUT = curringMethod("put");
export const DELETE = curringMethod("delete");
export const OPTIONS = curringMethod("options");
export const PATCH = curringMethod("patch");

export default axiosInstance;
