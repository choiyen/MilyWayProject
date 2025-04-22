export type InqurieType = {
  InqurieId?: string;
  Address: string;
  PhoneNumber: string;
  Inqurie: string;
  SubmissionDate: string;
};
export const InqurieDummy: InqurieType[] = [
  {
    InqurieId: "1",
    Address: "경상남도 진주시 평거동 한보아파트 XXX동 XXX호",
    PhoneNumber: "010-1234-5678",
    Inqurie: "청소 예약은 어떻게 하나요?",
    SubmissionDate: "2025년-02월-11일",
  },
  {
    InqurieId: "2",
    Address: "경상남도 진주시 망경동 청주아파트 XXX동 XXX호",
    PhoneNumber: "010-1234-5648",
    Inqurie: "예약은 언제까지 가능한가요?",
    SubmissionDate: "2025년-03월-21일",
  },
  {
    InqurieId: "3",
    Address: "경상남도 진주시 신사동 청주아파트 XXX동 XXX호",
    PhoneNumber: "010-1234-5678",
    Inqurie: "청소는 언제 하나요?",
    SubmissionDate: "2025년-05월-7일",
  },
];
