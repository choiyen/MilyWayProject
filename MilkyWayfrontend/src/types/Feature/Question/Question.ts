export type QuestionType = {
  id?: number;
  exceptionQA: string;
  expectedComment: string;
};

export const QuestionDummy: QuestionType[] = [
  {
    id: 1,
    exceptionQA: "청소는 언제 하나요?",
    expectedComment: "매일 청소합니다.",
  },
  {
    id: 2,
    exceptionQA: "예약은 어떻게 하나요?",
    expectedComment: "전화로 예약 가능합니다.",
  },
  {
    id: 3,
    exceptionQA: "예약은 언제까지 가능한가요?",
    expectedComment: "예약은 청소 하루 전까지 가능합니다.",
  },
];
