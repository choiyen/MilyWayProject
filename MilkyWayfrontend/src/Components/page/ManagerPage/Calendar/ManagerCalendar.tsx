/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectDate } from "@/Components/Common/ui/Select/SelectDate";
import { adminstrationSelect } from "@/types/appointment/adminstrationType";
import { Value, WeekDay } from "@/types/Date/date";
import { ModelWrapper, Overlay } from "@/types/Conmon/ModelWapperType";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { Fontname, LastButton, StyledCalendarWrapper } from "@/SCSS/Fixed";
import userCalendar from "@/types/hooks/useCalendar";
import { subMonths } from "date-fns";
import "@/SCSS/tailwind.scss";
import {
  AdministrationDummy,
  AdministrationType,
} from "@/types/Feature/Address/Adminstration";
import { AddressDummy, AddressType } from "@/types/Feature/Address/AddressType";
import { setAdministrationData } from "@/config/request/ReduxList/AdministrationReducer";
import { RadioBox } from "@/Components/Common/ui/Radio/RadioBox";
import { POST } from "@/config/request/axios/axiosInstance";
import path from "path";
import { paths } from "@/config/paths/paths";
import { error } from "console";

// styled-components 정의
const CalendarWapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
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
  @media screen and (max-width: 1044px) {
    font-size: 15px;
    line-height: 16px;
  }
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
  const todate: Date[] = [];

  useEffect(() => {
    setAdmintration(AdministrationDummy);
    setAddress(AddressDummy);
    address.forEach((item) => {
      console.log("관리자 예약 렌더링", item.SubmissionDate);
      todate.push(new Date(item.SubmissionDate));
    });
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

  const ChangeDate = async () => {
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
      await POST({
        url: paths.Administration.basic.path,
        data: {
          administrationType: type,
          administrationDate: date,
        },
      })
        .then((res) => {
          if (res.data === "전송 완료") {
            alert("전송 처리 완료!");
            setChange(false);
          }
        })
        .catch((error) => {
          console.error("일정 저장 실패:", error);
          alert("일정 저장에 실패했습니다.");
        });
    }
  };

  return (
    <>
      <CalendarWapper>
        <Fontname>청소 예약 관리</Fontname>
        <Label2>청소 날짜가 지난 데이터는 자동 삭제됩니다.</Label2>

        <CalendarsWrapper>
          {/* 이전/다음 달 이동 */}
          <Wapper className="flex justify-between items-center w-3/4 px-4 m-[45px]">
            <button
              onClick={() => {
                calendar.setCurrentDate(subMonths(calendar.currentDate, 1));
                // setSelect(null);
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
                setSelect(null);
              }}
              className="px-4 py-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
            >
              다음 {">"}
            </button>
          </Wapper>
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 w-3/4 text-center font-semibold text-gray-700 border border-gray-300">
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
              className={`grid grid-cols-7 w-3/4 text-center m-0 ${
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

                const buttonDate = new Date(
                  calendar.currentDate.getFullYear(),
                  calendar.currentDate.getMonth(),
                  day
                );

                const isToday =
                  new Date().getFullYear() === buttonDate.getFullYear() &&
                  new Date().getMonth() === buttonDate.getMonth() &&
                  new Date().getDate() === buttonDate.getDate();

                const isSelected = select === day;
                const isSaturday = dayIndex === 6;
                const isSunday = dayIndex === 0;

                const isAddressMatched = AddressDummy.some((item) => {
                  return (
                    new Date(item.SubmissionDate).toDateString() ===
                    buttonDate.toDateString()
                  );
                });

                const getBgColor = () => {
                  if (isSelected) return "bg-blue-600 text-white font-bold";
                  if (isAddressMatched) return "bg-green-200";
                  if (isToday) return "bg-yellow-200";
                  return "bg-white hover:bg-gray-100";
                };

                return (
                  <button
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={() => {
                      setSelect(day);
                      handleDateChange(buttonDate, undefined as never);
                    }}
                    className={`h-[48px] border border-gray-300 w-full
            ${getBgColor()}
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
        <div className="flex flex-col justify-center items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-md w-3/4 h-40">
          {/* 선택된 날짜에 대한 정보 표시 */}
          {date != null &&
          address.length > 0 &&
          new Date(address[0].SubmissionDate).toDateString() ===
            date.toDateString() ? (
            <div className="text-gray-700 text-lg font-semibold text-xl">
              {address.map((item, index) => (
                <div key={index} className="bg-blue-100">
                  {/* 데스크탑 테이블 (md 이상에서만 보이게) */}
                  <table className="hidden md:table table-auto border-2 border-black border-collapse w-70">
                    <thead className="bg-blue-200">
                      <tr>
                        <th className="p-2 text-left border-2 border-black">
                          청소유형
                        </th>
                        <th className="p-2 text-left border-2 border-black">
                          예약자
                        </th>
                        <th className="p-2 text-left border-2 border-black">
                          주소
                        </th>
                        <th className="p-2 text-left border-2 border-black">
                          전화번호
                        </th>
                        <th className="p-2 text-left border-2 border-black">
                          신청일
                        </th>
                        <th className="p-2 text-left border-2 border-black">
                          면적
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={index}>
                        <td className="p-2 border-2 border-black">
                          {item.cleanType}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {item.customer}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {item.Address}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {item.phoneNumber}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {new Date(item.SubmissionDate).toLocaleDateString()}
                        </td>
                        <td className="p-2 border-2 border-black">
                          {item.acreage}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* 모바일 카드뷰 (md 미만에서만 보이게) */}
                  <div className="md:hidden border-2 border-black rounded-md p-4 mb-4">
                    <div className="mb-2">
                      <strong>청소유형:</strong> {item.cleanType}
                    </div>
                    <div className="mb-2">
                      <strong>예약자:</strong> {item.customer}
                    </div>
                    <div className="mb-2">
                      <strong>주소:</strong> {item.Address}
                    </div>
                    <div className="mb-2">
                      <strong>전화번호:</strong> {item.phoneNumber}
                    </div>
                    <div className="mb-2">
                      <strong>신청일:</strong>{" "}
                      {new Date(item.SubmissionDate).toLocaleDateString()}
                    </div>
                    <div className="mb-2">
                      <strong>면적:</strong> {item.acreage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-lg font-semibold">
              {"선택된 날짜에 대한 정보가 없습니다."}
            </div>
          )}
        </div>

        <LastButton onClick={ChangeClick}>일정 추가</LastButton>
      </CalendarWapper>
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
