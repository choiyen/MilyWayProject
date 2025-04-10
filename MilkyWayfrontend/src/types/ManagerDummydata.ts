import * as ProjectDataType from "./ProjectDataType";

export const AddressDummy: ProjectDataType.AddressType[] = [
  {
    customer: "홍길동",
    Address: "경상남도 진주시 평거동 한보아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    SubmissionDate: new Date("2025-02-11"),
    acreage: "34평",
  },
  {
    customer: "박신명우",
    Address: "경상남도 진주시 망경동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5648",
    SubmissionDate: new Date("2025-03-21"),
    acreage: "25평",
  },
  {
    customer: "이훈",
    Address: "경상남도 진주시 신사동 청주아파트 XXX동 XXX호",
    phoneNumber: "010-1234-5678",
    SubmissionDate: new Date("2025-05-07"),
    acreage: "40평",
  },
]; //이미 적용된 더미데이터

export const AdministrationDummy: ProjectDataType.AdministrationType[] = [
  {
    administrationDate: new Date("2025-02-11"),
    administrationType: "청소",
  },
  {
    administrationDate: new Date("2025-03-21"),
    administrationType: "청소",
  },
  {
    administrationDate: new Date("2025-05-07"),
    administrationType: "청소",
  },
];

export const InqurieDummy: ProjectDataType.InqurieType[] = [
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

export const NoticeDummy: ProjectDataType.NoticeType[] = [
  {
    NoticeId: "1",
    type: "이사청소",
    greeting:
      "저희는 이사청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 이사청소는 저희에게 맡겨주세요! 이번엔 한보아파트 이사청소를 다녀왔습니다.",
  },
  {
    NoticeId: "2",
    type: "정기청소",
    greeting:
      "저희는 정기청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 정기청소는 저희에게 맡겨주세요! 이번엔 청주아파트 정기청소를 다녀왔습니다.",
  },
  {
    NoticeId: "3",
    type: "입주청소",
    greeting:
      "저희는 입주청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 입주청소는 저희에게 맡겨주세요! 이번엔 평거동 입주청소를 다녀왔습니다.",
  },
];

export const QuestionDummy: ProjectDataType.QuestionType[] = [
  {
    ExpectionQnA: "청소는 언제 하나요?",
    ExpectedComment: "매일 청소합니다.",
  },
  {
    ExpectionQnA: "예약은 어떻게 하나요?",
    ExpectedComment: "전화로 예약 가능합니다.",
  },
  {
    ExpectionQnA: "예약은 언제까지 가능한가요?",
    ExpectedComment: "예약은 청소 하루 전까지 가능합니다.",
  },
];
