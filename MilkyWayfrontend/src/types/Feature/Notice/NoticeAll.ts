import { cleanType } from "@/types/cleanspace/cleanType";
import { RoomType } from "@/types/Room/RoomType";

export type NoticeType = {
  noticeId?: string;
  title: string;
  titleimg: string;
  type: (typeof RoomType)[number];
  greeting: string;
};

export type NoticeDetailType = {
  noticeDetailId?: number;
  NoticeId?: string;
  direction: (typeof cleanType)[number];
  beforeURL: string[];
  afterURL: string[];
  comment: string;
};

export type NoticeDetailFileType = {
  noticeDetailId?: number;
  NoticeId?: string;
  direction: (typeof cleanType)[number];
  beforeURL: File[];
  afterURL: File[];
  comment: string;
};
