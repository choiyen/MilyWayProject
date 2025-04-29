import { cleanType } from "@/types/cleanspace/cleanType";

export type AddressType = {
  addressId: string;
  customer: string;
  address: string;
  phoneNumber: string;
  submissionDate: string;
  acreage?: string;
  cleanType?: (typeof cleanType)[number];
};

export const AddressDummy: AddressType[] = [
  {
    customer: "홍길동",
    address: "경상남도 진주시 평거동 한보아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    submissionDate: new Date("2025-02-11").toString(),
    acreage: "34평",
    cleanType: "이사청소",
    addressId: "",
  },
  {
    customer: "박신명우",
    address: "경상남도 진주시 망경동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5648",
    submissionDate: new Date("2025-03-21").toString(),
    acreage: "25평",
    cleanType: "정기청소",
    addressId: "",
  },
  {
    customer: "이훈",
    address: "경상남도 진주시 신사동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    submissionDate: new Date("2025-05-07").toString(),
    acreage: "40평",
    cleanType: "입주청소",
    addressId: "",
  },
]; //이미 적용된 더미데이터
