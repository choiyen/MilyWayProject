export type QuestionType = {
  questionId?: string;
  ExpectionQnA: string;
  ExpectedComment: string;
};

export const QuestionDummy: QuestionType[] = [
  {
    questionId: "dfddfdsf",
    ExpectionQnA: "청소는 언제 하나요?",
    ExpectedComment: "매일 청소합니다.",
  },
  {
    questionId: "dfddfddsf",
    ExpectionQnA: "예약은 어떻게 하나요?",
    ExpectedComment: "전화로 예약 가능합니다.",
  },
  {
    questionId: "dfddfdsfe",
    ExpectionQnA: "예약은 언제까지 가능한가요?",
    ExpectedComment: "예약은 청소 하루 전까지 가능합니다.",
  },
];
