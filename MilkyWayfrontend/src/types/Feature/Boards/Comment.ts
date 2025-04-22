export const commentType = ["관리자", "고객"];

export type CommentValueType = {
  commentId?: string;
  boardId: string;
  type: (typeof commentType)[number];
  comment: string;
};
export const CommentDummy: CommentValueType[] = [
  {
    commentId: "1",
    boardId: "1",
    type: "질문",
    comment: "전화 말고 카카오톡으로도 예약 가능한가요?",
  },
  {
    commentId: "2",
    boardId: "2",
    type: "질문",
    comment: "신규 가입 시 할인 쿠폰은 언제까지 사용할 수 있나요?",
  },
  {
    commentId: "3",
    boardId: "3",
    type: "질문",
    comment: "청소 물품은 어떤 것들이 있나요?",
  },
  {
    commentId: "4",
    boardId: "1",
    type: "질문",
    comment: "이메일이나 네이버 톡톡으로도 예약이나 문의를 받는 건가요?",
  },
  {
    commentId: "5",
    boardId: "2",
    type: "질문",
    comment:
      "기존 회원을 위한 이벤트는 진행하실 생각이 없나요? 저희는 1년 이상 청소를 이용하고 있습니다.",
  },
  {
    commentId: "6",
    boardId: "3",
    type: "질문",
    comment: "청소 물품을 가정용으로 구매할 수 있나요?",
  },
  {
    commentId: "7",
    boardId: "1",
    type: "질문",
    comment: "전화로 예약할 때 어떤 정보를 알려줘야 하나요?",
  },
  {
    commentId: "8",
    boardId: "2",
    type: "질문",
    comment: "받아놓은 할인 쿠폰의 유효기간은 어떻게 되나요?",
  },
  {
    commentId: "9",
    boardId: "3",
    type: "질문",
    comment: "청소 물품은 어떤 브랜드인가요?",
  },
];
