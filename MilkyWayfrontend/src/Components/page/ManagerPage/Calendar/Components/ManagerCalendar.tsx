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
import { GET } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";

export const ManagerCalendar = () => {
  const dispatch = useDispatch();
  const calendar = userCalendar();

  const [change, setChange] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState("");
  const [select, setSelect] = useState<number | null>(null);
  const [admintration, setAdmintration] = useState<AdministrationType[]>([]);
  const [address, setAddress] = useState<AddressType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await GET({
        url: paths.Administration.search.path,
      }).then((res) => {
        setAdmintration(res.data);
      });
      await GET({
        url: paths.Address.search.path,
      }).then((res) => {
        setAddress(res.data);
      });
    };
    fetchData();
  }, []);
  const fetchData = async () => {
    const [adminRes, addressRes] = await Promise.all([
      GET({ url: paths.Administration.search.path }),
      GET({ url: paths.Address.search.path }),
    ]);
    setAdmintration(adminRes.data);
    setAddress(addressRes.data);
  };

  useEffect(() => {
    console.log(admintration); // admintration 값이 업데이트될 때마다 실행됨
    console.log(address); // admintration 값이 업데이트될 때마다 실행됨
  }, [address, admintration]); // admintration이 바뀔 때마다 실행되도록 설정

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
