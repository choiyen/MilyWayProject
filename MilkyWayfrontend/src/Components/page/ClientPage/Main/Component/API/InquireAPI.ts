import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { setIqurieData } from "@/config/request/ReduxList/InqurieReducer";
import { InqurieType } from "@/types/Feature/Inqurie/Inqurie";
import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function handleServerError(response: {
  message: string;
  resultType: "error" | "success";
}) {
  const { message, resultType } = response;

  if (resultType === "error" && message) {
    // 문장 분리: 마침표 또는 줄바꿈 기준
    const errors = message
      .split(/[.\n]/) // 마침표나 줄바꿈 기준으로 나눔
      .map((msg: string) => msg.trim())
      .filter((msg: string) => msg.length > 0); // 빈 항목 제거

    if (errors.length > 0) {
      toast.error(errors[0], {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
}

export const InqurieInsert = async (
  Selector: InqurieType,
  dispatch: Dispatch
) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const curDate = new Date(Date.now() - timezoneOffset);
  dispatch(
    setIqurieData({ ...Selector, SubmissionDate: curDate.toISOString() })
  );

  await POST({
    url: paths.Inqurie.basic.path,
    data: {
      address: Selector.Address,
      phoneNumber: Selector.PhoneNumber,
      inquire: Selector.Inqurie,
      inquirename: Selector.InquireName,
      dateOfInquiry: Selector.SubmissionDate,
      inquireBool: false, // 문의 상태 초기값
    },
  })
    .then((res) => {
      if (res.resultType === "success") {
        Swal.fire({
          icon: "success",
          title: "신청 완료",
          text: `${res.message}`,
          confirmButtonText: "확인",
        });
        dispatch(
          setIqurieData({
            InquireName: "",
            Address: "",
            PhoneNumber: "",
            Inqurie: "",
            SubmissionDate: "",
            inquireBool: false,
          })
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "삭제",
          text: `${res.message}`,
          confirmButtonText: "확인",
        });
      }
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        handleServerError(
          err.response.data as {
            message: string;
            resultType: "error" | "success";
          }
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "오류",
          text: "서버와의 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.",
          confirmButtonText: "확인",
        });
      }
    });
};
