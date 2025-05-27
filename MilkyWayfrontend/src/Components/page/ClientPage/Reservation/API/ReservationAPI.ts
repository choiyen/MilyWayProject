import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { ReservationType } from "@/types/Feature/Address/Reservation";
import Swal from "sweetalert2";

export const ReservationPOST = async (reservationData: ReservationType) => {
  return await POST({
    url: paths.reserve.basic.path,
    data: {
      name: reservationData.name,
      phone: reservationData.phone,
      address: reservationData.Address,
      subissionDate: reservationData.SubssionDate,
      acreage: reservationData.acreage,
      type: reservationData.type,
    },
  });
};
export type ConsentState = { [key: string]: boolean };

export const handleClickReservation = (
  consent: ConsentState,
  reservationData: ReservationType,
  Address: string,
  AddressDetail: string
) => {
  for (const [, value] of Object.entries(consent)) {
    if (!value) {
      Swal.fire({
        icon: "error",
        title: "개인정보 수집 및 이용 동의",
        text: "개인정보 수집 및 이용 동의를 해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }
  }

  if (
    !reservationData.name ||
    !reservationData.phone ||
    !Address ||
    !AddressDetail ||
    !reservationData.SubssionDate ||
    !reservationData.type ||
    !reservationData.acreage
  ) {
    Swal.fire({
      icon: "error",
      title: "입력되지 않은 데이터가 존재합니다.",
      text: "모든 필드를 입력해주세요.",
      confirmButtonText: "확인",
    });
    return;
  }
};
