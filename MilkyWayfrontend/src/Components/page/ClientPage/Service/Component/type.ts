import { cleanType } from "@/types/cleanspace/cleanType";

// 📁 components/ServiceProfile/types.ts
export type SelectType = "전체보기" | (typeof cleanType)[number];

export interface Notice {
  greeting?: string;
  noticeId: string;
  title: string;
  titleimg: string;
  type: string;
}
