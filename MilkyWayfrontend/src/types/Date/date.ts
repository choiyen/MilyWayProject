export const WeekDay = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export enum adminstrationType {
  "휴일",
  "업무",
  "연가",
}
