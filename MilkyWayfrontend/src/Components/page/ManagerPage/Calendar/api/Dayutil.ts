import { paths } from "@/config/paths/paths";
import { DELETE } from "@/config/request/axios/axiosInstance";

export const administrationDeletefetchData = async (
  administrationId: string
) => {
  return await DELETE({
    url: `${paths.Administration.basic.path}?administrationId=${administrationId}`, // 주소 ID를 쿼리 파라미터로 전달
  });
};
