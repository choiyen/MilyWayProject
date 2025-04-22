import { adminstrationSelect } from "@/types/appointment/adminstrationType";

export type AdministrationType = {
  administrationId?: string;
  administrationDate: Date;
  administrationType: (typeof adminstrationSelect)[number];
};

export const AdministrationDummy: AdministrationType[] = [
  {
    administrationDate: new Date("2025-02-11"),
    administrationType: "청소",
  },
  {
    administrationDate: new Date("2025-03-21"),
    administrationType: "청소",
  },
  {
    administrationDate: new Date("2025-05-07"),
    administrationType: "청소",
  },
];
