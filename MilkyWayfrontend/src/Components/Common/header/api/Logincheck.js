import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
export const LoginCheck = async () => {
    const response = await POST({
        url: paths.Certification.basic.path + "/check",
    });
    return response;
};
