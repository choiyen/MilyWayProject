export type signDummyType = {
  address: string;
  phoneNumber: string;
  signdate: string;
  signname: string;
};

export const signDummy: signDummyType[] = [
  {
    address: "경상남도 진주시 평거동 한보아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    signdate: "2025년-02월-11일",
    signname: "홍길동",
  },
  {
    address: "경상남도 진주시 망경동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5648",
    signdate: "2025년-03월-21일",
    signname: "박신명우",
  },
  {
    address: "경상남도 진주시 신사동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    signdate: "2025년-05월-7일",
    signname: "이훈",
  },
];
