import {
  ClientGateWayType,
  GateWayNumber,
  ManagerGateWayType,
} from "@/types/GateWay/GateWayType";

interface PathsType {
  activename: string;
  paths: string;
  buttonname: string;
}

export const ClientPath: PathsType[] = [
  {
    activename: "Main",
    buttonname: "About",
    paths: `${GateWayNumber.Client}/${ClientGateWayType.home}`,
  },
  {
    activename: "Jobfeedback",
    buttonname: "서비스 소개",
    paths: `${GateWayNumber.Client}/${ClientGateWayType.Service}`,
  },
  {
    activename: "Question",
    buttonname: "Q&A",
    paths: `${GateWayNumber.Client}/${ClientGateWayType.Question}`,
  },
  {
    activename: "Reservation",
    buttonname: "예약하기",
    paths: `${GateWayNumber.Client}/${ClientGateWayType.Reservation}`,
  },
];

export const ManagerPath: PathsType[] = [
  {
    activename: "Reservation",
    buttonname: "예약관리",
    paths: `${GateWayNumber.Manager}/${ManagerGateWayType.Join}`,
  },
  {
    activename: "QuestionMangeMent",
    buttonname: "Q & A 관리",
    paths: `${GateWayNumber.Manager}/${ManagerGateWayType.QuestionSelect}`,
  },
  {
    activename: "ReviewMangeMent",
    buttonname: "후기 관리",
    paths: `${GateWayNumber.Manager}/${ManagerGateWayType.AdviceSelect}`,
  },
  {
    activename: "ScheduleMangeMent",
    buttonname: "예약 관리",
    paths: `${GateWayNumber.Manager}/${ManagerGateWayType.Calendar}`,
  },
];

export const ManagerLoginPath: PathsType = {
  activename: "Login",
  buttonname: "로그인",
  paths: `${GateWayNumber.Manager}/${ManagerGateWayType.Main}`,
};
