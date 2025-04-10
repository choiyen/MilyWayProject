import * as ProjectDataType from "./ProjectDataType";

export const BoardDummy: ProjectDataType.BoardType[] = [
  {
    boardId: "1",
    title: "공지사항",
    content: "청소 예약은 전화로 가능합니다.",
  },
  {
    boardId: "2",
    title: "이벤트",
    content: "신규 가입 시 10% 할인 쿠폰을 드립니다.",
  },
  {
    boardId: "3",
    title: "저희가 쓰는 청소 물품은 안전합니다.",
    content: "저희는 친환경 청소 물품을 사용합니다.",
  },
];
export const CommentDummy: ProjectDataType.CommentValueType[] = [
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
export const NoticeDetailDummy: ProjectDataType.NoticeDetailType[] = [
  {
    NoticeDetailId: "1",
    NoticeId: "1",
    direction:
      "청소를 시작하기 전에, 고객님께서 청소할 공간을 미리 정리해 주시기 바랍니다.",
    beforeURL: [new File([""], "dfdff.png"), new File([""], "dfdff.png")],
    afterURL: [new File([""], "dfdff.png"), new File([""], "dfdff.png")],
    Advice:
      "청소 후에는 고객님께서 확인하시고, 이상이 없으시면 결제를 진행해 주시기 바랍니다.",
  },
  {
    NoticeDetailId: "2",
    NoticeId: "2",
    direction:
      "청소를 시작하기 전에, 고객님께서 청소할 공간을 미리 정리해 주시기 바랍니다.",
    beforeURL: [new File([""], "dfdff.png"), new File([""], "dfdff.png")],
    afterURL: [new File([""], "dfdff.png"), new File([""], "dfdff.png")],
    Advice:
      "청소 후에는 고객님께서 확인하시고, 이상이 없으시면 결제를 진행해 주시기 바랍니다.",
  },
  {
    NoticeDetailId: "3",
    NoticeId: "3",
    direction:
      "청소를 시작하기 전에, 고객님께서 청소할 공간을 미리 정리해 주시기 바랍니다.",
    beforeURL: [new File([""], "dfdff.png"), new File([""], "dfdff.png")],
    afterURL: [new File([""], "dfdff.png"), new File([""], "dfdff.png")],
    Advice:
      "청소 후에는 고객님께서 확인하시고, 이상이 없으시면 결제를 진행해 주시기 바랍니다.",
  },
];
