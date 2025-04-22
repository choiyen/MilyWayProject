import { cleanType } from "@/types/cleanspace/cleanType";

export type AddressType = {
  AddressId?: string;
  customer: string;
  Address: string;
  phoneNumber: string;
  SubmissionDate: Date;
  acreage?: string;
  cleanType?: (typeof cleanType)[number];
};

export const AddressDummy: AddressType[] = [
  {
    customer: "홍길동",
    Address: "경상남도 진주시 평거동 한보아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    SubmissionDate: new Date("2025-02-11"),
    acreage: "34평",
    cleanType: "이사청소",
  },
  {
    customer: "박신명우",
    Address: "경상남도 진주시 망경동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5648",
    SubmissionDate: new Date("2025-03-21"),
    acreage: "25평",
    cleanType: "정기청소",
  },
  {
    customer: "이훈",
    Address: "경상남도 진주시 신사동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    SubmissionDate: new Date("2025-05-07"),
    acreage: "40평",
    cleanType: "입주청소",
  },
]; //이미 적용된 더미데이터
