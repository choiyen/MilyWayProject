import { adminstrationSelect, commentType } from "./adminstrationType";
import { cleanType } from "./cleanType";
import { RoomType } from "./RoomType";

export type AddressType = {
  AddressId?: string;
  customer: string;
  Address: string;
  phoneNumber: string;
  SubmissionDate: Date;
  acreage?: string;
};

export type QuestionType = {
  questionId?: string;
  ExpectionQnA: string;
  ExpectedComment: string;
};

export type AdministrationType = {
  administrationId?: string;
  administrationDate: Date;
  administrationType: (typeof adminstrationSelect)[number];
};

export type BoardType = {
  boardId?: string;
  title: string;
  content: string;
};

export type CommentValueType = {
  commentId?: string;
  boardId: string;
  type: (typeof commentType)[number];
  comment: string;
};

export type InqurieType = {
  InqurieId?: string;
  Address: string;
  PhoneNumber: string;
  Inqurie: string;
  SubmissionDate: string;
};

export type NoticeDetailType = {
  NoticeDetailId?: string;
  NoticeId?: string;
  direction: (typeof cleanType)[number];
  beforeURL: File[];
  afterURL: File[];
  Advice: string;
};

export type NoticeType = {
  NoticeId?: string;
  type: (typeof RoomType)[number];
  greeting: string;
};

export type ReservationType = {
  reservationId?: string;
  acreage: string;
  name: string;
  phone: string;
  Address: string;
  SubssionDate: string;
};

export type loginType = {
  userID: string;
  Password: string;
};

export type signupType = {
  userID: string;
  Password: string;
  email: string;
};
