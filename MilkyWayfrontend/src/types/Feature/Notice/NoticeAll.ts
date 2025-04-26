import { cleanType } from "@/types/cleanspace/cleanType";
import { RoomType } from "@/types/Room/RoomType";

export type NoticeType = {
  NoticeId?: string;
  title: string;
  titleimg: File;
  type: (typeof RoomType)[number];
  greeting: string;
};

export type NoticeDetailType = {
  NoticeDetailId?: string;
  NoticeId?: string;
  direction: (typeof cleanType)[number];
  beforeURL: File[];
  afterURL: File[];
  Advice: string;
};
