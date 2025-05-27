import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { setIqurieData } from "@/config/request/ReduxList/InqurieReducer";
import { InqurieType } from "@/types/Feature/Inqurie/Inqurie";
import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: errors[0], // 첫 오류만 표시
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "my-toast", // 커스텀 클래스 지정
        },
      });
    }
  }
}

export const InqurieInsert = async (
  Selector: InqurieType,
  dispatch: Dispatch
) => {
  dispatch(
    setIqurieData({ ...Selector, SubmissionDate: new Date().toISOString() })
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
