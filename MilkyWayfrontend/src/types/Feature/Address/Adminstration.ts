import { adminstrationSelect } from "@/types/appointment/adminstrationType";

export type AdministrationType = {
  administrationId?: string;
  administrationDate: string;
  adminstrationType: (typeof adminstrationSelect)[number];
};

export const AdministrationDummy: AdministrationType[] = [
  {
    administrationDate: new Date("2025-02-11").toString(),
    adminstrationType: "휴일",
  },
  {
    administrationDate: new Date("2025-03-21").toString(),
    adminstrationType: "업무",
  },
  {
    administrationDate: new Date("2025-05-07").toString(),
    adminstrationType: "연가",
  },
];
