import { NoticeDetailType, NoticeType } from "./NoticeAll";

export type NoticeFullType = {
  Notice: NoticeType;
  NoticeDetail: NoticeDetailType[];
};

export const NoticeFulldummy: NoticeFullType[] = [
  {
    Notice: {
      noticeId: "1",
      type: "이사청소",
      title: "한보아파트 이사청소",
      titleimg: "/userID",
      greeting:
        "저희는 이사청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 이사청소는 저희에게 맡겨주세요! 이번엔 한보아파트 이사청소를 다녀왔습니다.",
    },
    NoticeDetail: [
      {
        noticeDetailId: 1,
        NoticeId: "1",
        direction: "부엌",
        beforeURL: [],
        afterURL: [],
        comment:
          "부엌은 식기가 들어있는 공간이므로 청결이 중요합니다. 그래서 저희는 부엌 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 2,
        NoticeId: "1",
        direction: "욕실",
        beforeURL: [],
        afterURL: [],
        comment:
          "욕실은 물이 많이 사용되는 공간이므로 청결이 중요합니다. 그래서 저희는 욕실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 3,
        NoticeId: "1",
        direction: "거실",
        beforeURL: [],
        afterURL: [],
        comment:
          "거실은 집안의 중심이므로 청결이 중요합니다. 그래서 저희는 거실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
    ],
  },
  {
    Notice: {
      noticeId: "2",
      title: "청주아파트 정기청소",
      titleimg: "titleimg",
      type: "정기청소",
      greeting:
        "저희는 정기청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 정기청소는 저희에게 맡겨주세요! 이번엔 청주아파트 정기청소를 다녀왔습니다.",
    },
    NoticeDetail: [
      {
        noticeDetailId: 1,
        NoticeId: "2",
        direction: "부엌",
        beforeURL: [],
        afterURL: [],
        comment:
          "부엌은 식기가 들어있는 공간이므로 청결이 중요합니다. 그래서 저희는 부엌 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 2,
        NoticeId: "2",
        direction: "욕실",
        beforeURL: [],
        afterURL: [],
        comment:
          "욕실은 물이 많이 사용되는 공간이므로 청결이 중요합니다. 그래서 저희는 욕실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 3,
        NoticeId: "2",
        direction: "거실",
        beforeURL: [],
        afterURL: [],
        comment:
          "거실은 집안의 중심이므로 청결이 중요합니다. 그래서 저희는 거실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 4,
        NoticeId: "2",
        direction: "침실",
        beforeURL: [],
        afterURL: [],
        comment:
          "침실은 잠을 자는 공간이므로 청결이 중요합니다. 그래서 저희는 침실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 5,
        NoticeId: "2",
        direction: "베란다",
        beforeURL: [],
        afterURL: [],
        comment:
          "발코니는 외부와 연결된 공간이므로 청결이 중요합니다. 그래서 저희는 발코니 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 6,
        NoticeId: "2",
        direction: "창문",
        beforeURL: [],
        afterURL: [],
        comment:
          "창문은 외부와 연결된 공간이므로 청결이 중요합니다. 그래서 저희는 창문 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
    ],
  },
  {
    Notice: {
      title: "평거동 입주청소",
      titleimg: "titleimg",
      type: "입주청소",
      greeting:
        "저희는 입주청소를 전문으로 하는 업체로써, 고객님들의 소중한 공간을 깨끗하게 청소해 드립니다. 입주청소는 저희에게 맡겨주세요! 이번엔 평거동 입주청소를 다녀왔습니다.",
    },
    NoticeDetail: [
      {
        noticeDetailId: 1,
        NoticeId: "3",
        direction: "부엌",
        beforeURL: [],
        afterURL: [],
        comment:
          "부엌은 식기가 들어있는 공간이므로 청결이 중요합니다. 그래서 저희는 부엌 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },

      {
        noticeDetailId: 2,
        NoticeId: "3",
        direction: "욕실",
        beforeURL: [],
        afterURL: [],
        comment:
          "욕실은 물이 많이 사용되는 공간이므로 청결이 중요합니다. 그래서 저희는 욕실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
      {
        noticeDetailId: 3,
        NoticeId: "3",
        direction: "거실",
        beforeURL: [],
        afterURL: [],
        comment:
          "거실은 집안의 중심이므로 청결이 중요합니다. 그래서 저희는 거실 청소를 할 때에는 좀더 신경써서 진행을 하는 편입니다.",
      },
    ],
  },
];
