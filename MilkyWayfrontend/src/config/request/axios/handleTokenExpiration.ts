import store from "@/config/reduxstore";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { setjwtTokens } from "../ReduxList/useauthSlice";
import { logout } from "../ReduxList/userlogin";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";

const refreshAxios = axios.create();

export const handleTokenExpiration = async (
  refreshToken: string,
  originalConfig: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await refreshAxios.post("/api/auth/refresh-Token", {
      refreshToken,
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    if (!newAccessToken) {
      throw new Error("No access token returned");
    }

    store.dispatch(
      setjwtTokens({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        userId: response.data.userId,
      })
    );

    originalConfig.headers = {
      ...originalConfig.headers,
      Authorization: `Bearer ${newAccessToken}`,
    };

    return axios(originalConfig);
  } catch (error) {
    store.dispatch(logout());
    window.location.href =
      GateWayNumber.Manager + "/" + ManagerGateWayType.Main;
    return Promise.reject(error);
  }
};
