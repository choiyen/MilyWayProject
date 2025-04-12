/* eslint-disable @typescript-eslint/no-unused-vars */
import { Footer } from "@/Components/Common/Footer";
import { RadioBox } from "@/Components/Common/RadioBox";
import { SelectDate } from "@/Components/Common/SelectDate";
import { setAdministrationData } from "@/DefaultRedux/ReduxList/AdministrationReducer";
import { adminstrationSelect } from "@/types/adminstrationType";
import { Value } from "@/types/date";
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

const CalendarWapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  align-items: space-around;
  width: 100%;
  height: calc(70vh - 30px); /* Increased height to make space */
  background-color: white;
`;
const CalendarsWrapper = styled(StyledCalendarWrapper)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 50%;
  gap: 20px;
`;
const Label2 = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
  margin-bottom: 50px;
`;

const AddressWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: skyblue;
  width: 50%;
`;

export const ManagerCalendar = () => {
  const [change, setChange] = useState(false); //모달창 활성화를 담당당
  const [date, setDate] = useState<Date | null>(null); // 예약 날짜
  const [type, setType] = useState(""); // 예약 타입
  const [admintration, setAdmintration] =
    useState<AdministrationType[]>(AdministrationDummy); // 예약 타입
  const [address, setAddress] = useState<AddressType[]>(AddressDummy); // 주소 타입
  const dispatch = useDispatch(); // Redux dispatch 함수
  const [select, setSelect] = useState<number[]>([]);
  const calendar = userCalendar(); // userCalendar에서 가져온 데이터
  const CALENDER_RESULT_LIST: number[][] = calendar.weekCalendarList; // 캘린더 결과를 저장할 배열

  useEffect(() => {
    // This effect will run once whenw the component mounts
    setAdmintration(AdministrationDummy); // 초기 데이터 설정
    console.log("Initial data:", AdministrationDummy);
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  const isSameDate = (d1: Date, d2: Date) => {
    console.log("Comparing:", d1, d2); // 비교되는 날짜를 출력해서 확인
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  function ChangeClick(): void {
    setChange(!change);
  }

  const handleDateChange = (
    value: Value,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log("Selected date:", value);

    // 기본 데이터로 초기화
    setAdmintration(AdministrationDummy);
    setAddress(AddressDummy);
    if (value instanceof Date) {
      const result = new Date(value);
      if (result !== null) {
        setDate(result); // 새로운 날짜로 상태 설정
      }
    } else {
      console.error("Invalid date value:", value);
    }
  };

  // admintration이 변경될 때마다 필터링 로직 실행
  useEffect(() => {
    if (date) {
      const date2 = admintration.filter((item) => {
        const itemDate = new Date(item.administrationDate);
        console.log(`==> Same date?`, isSameDate(itemDate, date));
        return isSameDate(itemDate, date); // 조건에 맞는 항목만 반환
      });
      const filteredData = address.filter((item) => {
        const itemDate = new Date(item.SubmissionDate); // 날짜 형식 변환
        console.log(
          `==> Same date?`,
          isSameDate(itemDate, admintration[0].administrationDate)
        );
        return isSameDate(itemDate, date); // 조건에 맞는 항목만 반환
      });
      console.log("Filtered data:", filteredData); // 필터링된 데이터 출력
      setAdmintration(date2); // 필터링된 배열을 상태에 설정
      setAddress(filteredData); // 필터링된 배열을 상태에 설정
    }
  }, [date]); // `date`나 `admintration`이 변경될 때마다 실행

  function ChangeDate(): void {
    // 예약 타입과 날짜를 서버에 전송하는 로직을 여기에 추가합니다.
    console.log("예약 타입:", type);
    console.log("예약 날짜:", date);
    if (date) {
      dispatch(
        setAdministrationData({
          administrationType: type,
          administrationDate: date,
        })
      ); // Redux action dispatch
    } else {
      throw new Error("Invalid date selected.");
    }
    // 예시: 서버에 예약 요청 보내기
    // 모달창 닫기
    setChange(false);
  }
  return (
    <>
      <FixedManagerHeader />
      <CalendarWapper>
        <Fontname>청소 예약 관리</Fontname>
        <Label2>청소 날짜가 지난 데이터는 자동 삭제 됩니다.</Label2>
        <CalendarsWrapper>
          <button
            onClick={() => {
              calendar.setCurrentDate(subMonths(calendar.currentDate, -1));
            }}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              calendar.setCurrentDate(subMonths(calendar.currentDate, 1));
            }}
          >
            {">"}
          </button>
          {CALENDER_RESULT_LIST.map((item) => (
            <div className=" flex px-20 w-full" key={Math.random()}>
              {item.map((day) => (
                <button
                  onClick={() => {
                    const findItem = select.find((item) => item === day);
                    if (findItem) {
                      setSelect((state) =>
                        state.filter((item) => item !== day)
                      );
                    } else {
                      setSelect((state) => [...state, day]);
                    }
                  }}
                  className={`flex justify-between min-w-[calc(100%/7)] active:bg-blue-500 hover:bg-blue-400 items-center text-center ${
                    day === 0 ? " invisible" : ""
                  }
                  ${select.find((item) => item === day) ? " bg-blue-600" : ""}
                  `}
                  key={Math.random()}
                >
                  <div className=" mx-auto">{day}</div>
                </button>
              ))}
            </div>
          ))}
        </CalendarsWrapper>
        <LastButton onClick={() => ChangeClick()}> 일정 추가 </LastButton>
      </CalendarWapper>
      {/* 모달과 오버레이가 활성화된 경우에만 보여짐 */}
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
        <LastButton onClick={() => ChangeDate()}>일정 확정</LastButton>
        <LastButton onClick={() => ChangeClick()}>취소</LastButton>
      </ModelWrapper>

      <Footer />
    </>
  );
};
