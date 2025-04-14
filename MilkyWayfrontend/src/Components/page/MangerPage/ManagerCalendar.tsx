/* eslint-disable @typescript-eslint/no-unused-vars */
import { Footer } from "@/Components/Common/Footer";
import { RadioBox } from "@/Components/Common/RadioBox";
import { SelectDate } from "@/Components/Common/SelectDate";
import { setAdministrationData } from "@/DefaultRedux/ReduxList/AdministrationReducer";
import { adminstrationSelect } from "@/types/adminstrationType";
import { Value, WeekDay } from "@/types/date";
import { AddressDummy, AdministrationDummy } from "@/types/ManagerDummydata";
import { ModelWrapper, Overlay } from "@/types/ModelWapperType";
import { AddressType, AdministrationType } from "@/types/ProjectDataType";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import {
  FixedManagerHeader,
  Fontname,
  LastButton,
  StyledCalendarWrapper,
} from "@/SCSS/Fixed";
import userCalendar from "@/types/useCalendar";
import { subMonths } from "date-fns";
import "@/SCSS/tailwind.scss";

// styled-components 정의
const CalendarWapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

const CalendarsWrapper = styled(StyledCalendarWrapper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0px;
`;

const Label2 = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
  margin-bottom: 50px;
`;

const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ManagerCalendar = () => {
  const [change, setChange] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState("");
  const [admintration, setAdmintration] =
    useState<AdministrationType[]>(AdministrationDummy);
  const [address, setAddress] = useState<AddressType[]>(AddressDummy);
  const dispatch = useDispatch();
  const [select, setSelect] = useState<number | null>(null);
  const calendar = userCalendar();
  const CALENDER_RESULT_LIST: number[][] = calendar.weekCalendarList;

  useEffect(() => {
    setAdmintration(AdministrationDummy);
    setAddress(AddressDummy);

    console.log("관리자 달력 렌더링");
    console.log("관리자 달력 렌더링", AdministrationDummy);
    console.log("관리자 일정 렌더링", AddressDummy);
  }, []);

  const isSameDate = (d1: Date, d2: Date | string) => {
    const targetDate = new Date(d2);
    return (
      d1.getFullYear() === targetDate.getFullYear() &&
      d1.getMonth() === targetDate.getMonth() &&
      d1.getDate() === targetDate.getDate()
    );
  };

  const ChangeClick = () => setChange(!change);

  const handleDateChange = (
    value: Value,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value instanceof Date) {
      setDate(new Date(value));
      setAdmintration(AdministrationDummy);
      setAddress(AddressDummy);
    } else {
      console.error("Invalid date value:", value);
    }
  };

  useEffect(() => {
    if (date) {
      const filteredAdmin = admintration.filter((item) =>
        isSameDate(date, item.administrationDate)
      );
      const filteredAddr = address.filter((item) =>
        isSameDate(date, item.SubmissionDate)
      );
      setAdmintration(filteredAdmin);
      setAddress(filteredAddr);
      console.log("관리자 일정 렌더링", filteredAdmin);
      console.log("관리자 예약 렌더링", filteredAddr);
    }
  }, [date]);

  const ChangeDate = () => {
    if (!date) {
      alert("날짜를 선택해주세요");
      return;
    }
    if (date.getDate() === new Date().getDate()) {
      console.log("오늘 날짜는 선택할 수 없습니다.");
    } else {
      dispatch(
        setAdministrationData({
          administrationType: type,
          administrationDate: date,
        })
      );
      setChange(false);
    }
  };

  return (
    <>
      <FixedManagerHeader />
      <CalendarWapper>
        <Fontname>청소 예약 관리</Fontname>
        <Label2>청소 날짜가 지난 데이터는 자동 삭제됩니다.</Label2>

        <CalendarsWrapper>
          {/* 이전/다음 달 이동 */}
          <Wapper className="flex justify-between items-center w-full px-4 m-10">
            <button
              onClick={() => {
                calendar.setCurrentDate(subMonths(calendar.currentDate, 1));
              }}
              className="px-4 py-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
            >
              {"<"} 이전
            </button>
            <span className="text-2xl font-semibold text-gray-800">
              {calendar.getCurrentYear()}년 {calendar.getCurrentMonth()}월
            </span>
            <button
              onClick={() => {
                calendar.setCurrentDate(subMonths(calendar.currentDate, -1));
              }}
              className="px-4 py-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
            >
              다음 {">"}
            </button>
          </Wapper>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 w-full text-center font-semibold text-gray-700 border border-gray-300">
            {WeekDay.map((item, index) => (
              <div
                key={index}
                className="py-2 border-r border-b border-gray-300 last:border-r-0"
              >
                {item}
              </div>
            ))}
          </div>

          {/* 날짜 셀 */}
          {CALENDER_RESULT_LIST.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className={`grid grid-cols-7 w-full text-center m-0 ${
                weekIndex > 0 ? "border-t border-gray-300" : ""
              }`}
            >
              {week.map((day, dayIndex) => {
                if (day === 0) {
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className="border border-gray-300 h-[48px]"
                    />
                  );
                }

                const isToday =
                  new Date().getFullYear() ===
                    calendar.currentDate.getFullYear() &&
                  new Date().getMonth() === calendar.currentDate.getMonth() &&
                  new Date().getDate() === day;

                const isSelected = select === day;
                const isSaturday = dayIndex === 6;
                const isSunday = dayIndex === 0;

                return (
                  <button
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={() => {
                      setSelect(day);
                      handleDateChange(
                        new Date(
                          calendar.currentDate.getFullYear(),
                          calendar.currentDate.getMonth(),
                          day
                        ),
                        undefined as unknown as React.MouseEvent<HTMLButtonElement>
                      );
                    }}
                    className={`
                      h-[48px] border border-gray-300 w-full
                      ${isSelected ? "bg-blue-600 text-white font-bold" : ""}
                      ${isToday && !isSelected ? "bg-yellow-200" : ""}
                      ${
                        !isSelected && !isToday
                          ? "bg-white hover:bg-gray-100"
                          : ""
                      }
                      ${isSunday ? "text-red-500" : ""}
                      ${isSaturday ? "text-blue-500" : ""}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          ))}
        </CalendarsWrapper>
        <div className="flex flex-col items-center mt-4">
          {/* 선택된 날짜에 대한 정보 표시 */}
          {address.length > 0 && address[0].SubmissionDate === date ? (
            <div className="text-gray-700 text-lg font-semibold">
              {address.map((item, index) => (
                <div key={index}>
                  {item.customer} 고객님{" "}
                  {new Date(item.SubmissionDate).toLocaleDateString()}{" "}
                  {item.Address} {item.phoneNumber} {item.acreage}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-lg font-semibold">
              {"선택된 날짜에 대한 정보가 없습니다."}
            </div>
          )}
        </div>

        <LastButton onClick={ChangeClick} className="mt-120">
          일정 추가
        </LastButton>
      </CalendarWapper>
      <Footer />
      {/* 모달 */}
      {change && <Overlay />}
      <ModelWrapper $istrue={`${change}`}>
        <SelectDate name={"선택 날짜"} change={date?.toString() || ""} />
        <br />
        <RadioBox
          name={"선택 유형"}
          append={[...adminstrationSelect]}
          setValue={setType}
        />
        <br />
        <LastButton onClick={ChangeDate} className="gap-4">
          일정 확정
        </LastButton>
        <LastButton onClick={ChangeClick}>취소</LastButton>
      </ModelWrapper>
    </>
  );
};
