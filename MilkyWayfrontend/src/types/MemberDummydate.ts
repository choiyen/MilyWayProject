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

export const NoticeFulldummy: ProjectDataType.NoticeFullType[] = [
  {
    Notice: {
      NoticeId: "1",
      type: "이사청소",
      title: "한보아파트 이사청소",
      titleimg: new File([], "titleimg"),
      greeting:
        "저희는 이사청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 이사청소는 저희에게 맡겨주세요! 이번엔 한보아파트 이사청소를 다녀왔습니다.",
    },
    NoticeDetail: [
      {
        NoticeDetailId: "1",
        NoticeId: "1",
        direction: "부엌",
        beforeURL: [],
        afterURL: [],
        Advice:
          "부엌은 식기가 들어있는 공간이므로 청결이 중요합니다. 그래서 저희는 부엌 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "2",
        NoticeId: "1",
        direction: "욕실",
        beforeURL: [],
        afterURL: [],
        Advice:
          "욕실은 물이 많이 사용되는 공간이므로 청결이 중요합니다. 그래서 저희는 욕실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "3",
        NoticeId: "1",
        direction: "거실",
        beforeURL: [],
        afterURL: [],
        Advice:
          "거실은 집안의 중심이므로 청결이 중요합니다. 그래서 저희는 거실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
    ],
  },
  {
    Notice: {
      NoticeId: "2",
      title: "청주아파트 정기청소",
      titleimg: new File([], "titleimg"),
      type: "정기청소",
      greeting:
        "저희는 정기청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 정기청소는 저희에게 맡겨주세요! 이번엔 청주아파트 정기청소를 다녀왔습니다.",
    },
    NoticeDetail: [
      {
        NoticeDetailId: "1",
        NoticeId: "2",
        direction: "부엌",
        beforeURL: [],
        afterURL: [],
        Advice:
          "부엌은 식기가 들어있는 공간이므로 청결이 중요합니다. 그래서 저희는 부엌 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "2",
        NoticeId: "2",
        direction: "욕실",
        beforeURL: [],
        afterURL: [],
        Advice:
          "욕실은 물이 많이 사용되는 공간이므로 청결이 중요합니다. 그래서 저희는 욕실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "3",
        NoticeId: "2",
        direction: "거실",
        beforeURL: [],
        afterURL: [],
        Advice:
          "거실은 집안의 중심이므로 청결이 중요합니다. 그래서 저희는 거실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "4",
        NoticeId: "2",
        direction: "침실",
        beforeURL: [],
        afterURL: [],
        Advice:
          "침실은 잠을 자는 공간이므로 청결이 중요합니다. 그래서 저희는 침실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "5",
        NoticeId: "2",
        direction: "베란다",
        beforeURL: [],
        afterURL: [],
        Advice:
          "발코니는 외부와 연결된 공간이므로 청결이 중요합니다. 그래서 저희는 발코니 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "6",
        NoticeId: "2",
        direction: "창문",
        beforeURL: [],
        afterURL: [],
        Advice:
          "창문은 외부와 연결된 공간이므로 청결이 중요합니다. 그래서 저희는 창문 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
    ],
  },
  {
    Notice: {
      NoticeId: "3",
      title: "평거동 입주청소",
      titleimg: new File([], "titleimg"),
      type: "입주청소",
      greeting:
        "저희는 입주청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 입주청소는 저희에게 맡겨주세요! 이번엔 평거동 입주청소를 다녀왔습니다.",
    },
    NoticeDetail: [
      {
        NoticeDetailId: "1",
        NoticeId: "3",
        direction: "부엌",
        beforeURL: [],
        afterURL: [],
        Advice:
          "부엌은 식기가 들어있는 공간이므로 청결이 중요합니다. 그래서 저희는 부엌 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },

      {
        NoticeDetailId: "2",
        NoticeId: "3",
        direction: "욕실",
        beforeURL: [],
        afterURL: [],
        Advice:
          "욕실은 물이 많이 사용되는 공간이므로 청결이 중요합니다. 그래서 저희는 욕실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        NoticeDetailId: "3",
        NoticeId: "3",
        direction: "거실",
        beforeURL: [],
        afterURL: [],
        Advice:
          "거실은 집안의 중심이므로 청결이 중요합니다. 그래서 저희는 거실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
    ],
  },
];
