import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";

export const PostQuestionALL = async () => {
  const response = await POST({
    url: paths.Question.serach.path,
  });

  return response;
};
