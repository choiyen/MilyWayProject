import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CalendarWapper, CalendarsWrapper } from "../style/CalendarStyle";
import { CalendarHeader } from "../ui/CalendarHeader";
import userCalendar from "@/types/hooks/useCalendar";
import { AdministrationType } from "@/types/Feature/Address/Adminstration";
import { AddressType } from "@/types/Feature/Address/AddressType";
import { CalendarGrid } from "../ui/CalendarGrid";
import { ScheduleInfo } from "../ui/ScheduleInfo";
import { ScheduleModal } from "../ui/ScheduleModal";
import { LastButton } from "@/SCSS/Fixed";
import { GET, POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { ScheduleType } from "@/types/appointment/adminstrationType";

export const ManagerCalendar = () => {
  const dispatch = useDispatch();
  const calendar = userCalendar();

  const [change, setChange] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState<ScheduleType>("휴일");
  const [select, setSelect] = useState<number | null>(null);
  const [admintration, setAdmintration] = useState<AdministrationType[]>([]);
  const [address, setAddress] = useState<AddressType[]>([]);
  // const [FirstDate, setFirstDate] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      calendar.currentDate = new Date(
        calendar.currentDate.getFullYear(),
        calendar.currentDate.getMonth(),
        2
      );
      await POST({
        url:
          paths.Administration.search.path +
          `/${calendar.currentDate.toISOString().slice(0, 10)}`,
      }).then((res) => {
        setAdmintration(res.data);
      });
    };
    fetchData();
  }, [calendar.currentDate, date]);

  useEffect(() => {
    const fetchData = async () => {
      await GET({
        url: paths.Address.search.Date.path,
        params: {
          AdminstrationDate:
            date?.toLocaleDateString("sv-SE").split("T")[0] ||
            new Date().toISOString().split("T")[0],
        },
      })
        .then((res) => {
          setAddress(res.data);
        })
        .catch(() => {
          setAddress([]);
        });
    };
    fetchData();
  }, [date]);

  const fetchData = async () => {
    const [adminRes, addressRes] = await Promise.all([
      GET({ url: paths.Administration.search.path }),
      GET({ url: paths.Address.search.defaul.path }),
    ]);
    setAdmintration(adminRes.data);
    setAddress(addressRes.data);
  };

  return (
    <>
      <CalendarWapper>
        <CalendarHeader calendar={calendar} setSelect={setSelect} />
        <CalendarsWrapper>
          <CalendarGrid
            calendar={calendar}
            select={select}
            setSelect={setSelect}
            setDate={setDate}
            admintration={admintration}
          />
        </CalendarsWrapper>
        <ScheduleInfo
          date={date}
          address={address}
          admintration={admintration}
          fetchData={fetchData}
        />
        <LastButton onClick={() => setChange(true)}>일정 추가</LastButton>
      </CalendarWapper>
      {change && (
        <ScheduleModal
          setChange={setChange}
          date={date}
          setType={setType}
          type={type}
          dispatch={dispatch}
          setDate={setDate}
          fetchData={fetchData}
        />
      )}
    </>
  );
};
