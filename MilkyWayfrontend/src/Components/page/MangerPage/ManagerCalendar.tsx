import { Footer } from "@/Components/Common/Footer";
import { RadioBox } from "@/Components/Common/RadioBox";
import { SelectDate } from "@/Components/Common/SelectDate";
import { setAdministrationData } from "@/DefaultRedux/ReduxList/AdministrationReducer";
import {
  FixedManagerHeader,
  Fontname,
  LastButton,
  StyledCalendar,
  StyledCalendarWrapper,
} from "@/SCSS/Fixed";
import { adminstrationSelect } from "@/types/adminstrationType";
import { Value } from "@/types/date";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
  z-index: 999; /* 모달보다 더 위에 놓이도록 */
`;

const SmallWrapper = styled.div<{ $istrue?: string | undefined }>`
  position: absolute;
  display: ${(props) =>
    props.$istrue === "true"
      ? "block"
      : "none"}; /* istrue가 true일 때 보이도록 */
  top: 50%;
  left: 50%; /* 화면의 왼쪽 50%로 이동 */
  transform: translate(
    -50%,
    -50%
  ); /* 가로, 세로 모두 50%만큼 이동하여 중앙 정렬 */
  width: auto;
  padding: 40px;
  text-align: center;
  background-color: beige;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rebeccapurple;
  align-items: center;
  z-index: 1000; /* 오버레이 위에 모달이 위치하도록 */
`;

const MainBox = styled.div`
  width: 100%;
  height: calc(60vh - 30px); /* Increased height to make space */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px; /* Space at the top */
  padding-bottom: 50px; /* Space at the bottom */
  overflow-y: auto; /* Scroll only within the MainBox */
`;

const Label = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
  margin-bottom: 50px;
`;

export const ManagerCalendar = () => {
  const [change, setChange] = useState(false); //모달창 활성화를 담당당
  const today = new Date();
  const [date, setDate] = useState<Date | null>(today);
  const [type, setType] = useState(""); // 예약 타입
  const dispatch = useDispatch(); // Redux dispatch 함수

  useEffect(() => {
    // This effect will run whenever `date` is updated
    console.log("Updated date:", date);
  }, [date]);

  function ChangeClick(): void {
    setChange(!change);
  }

  const handleDateChange = (
    value: Value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value instanceof Date) {
      console.log("Selected Date:", value);
      const result = new Date(value);
      if (value !== null) {
        setDate(result); // Date 객체나 null일 경우 그대로 상태 설정
      } // Convert newDate to a Date object
    } else console.error("Invalid date value:", value);
  };

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
    <div>
      <FixedManagerHeader />
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리</Fontname>
          <Label>청소 날짜가 지난 데이터는 자동 삭제 됩니다.</Label>
          <MainWapper>
            <StyledCalendarWrapper>
              <StyledCalendar
                onChange={handleDateChange}
                value={date} // Pass `date` directly, no need to call .toString()
                calendarType="gregory" // 일요일 부터 시작
                showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                minDetail="year" // 10년단위 년도 숨기기
              />
              {/* //기존 캘린더로는 부족해서 업그레이드할 예정 - 클릭 시 클릭한
              날짜에 해당하는 배열이 출력되어야 함. */}
            </StyledCalendarWrapper>
          </MainWapper>
        </MainBox>
        <LastButton onClick={() => ChangeClick()}>정보 추가</LastButton>
      </MainWapper>

      {/* 모달과 오버레이가 활성화된 경우에만 보여짐 */}
      {change && <Overlay />}
      <SmallWrapper $istrue={`${change}`}>
        <SelectDate name={"선택 날짜"} change={date?.toString() || ""} />
        <br />
        <RadioBox
          name={"선택 유형"}
          append={[...adminstrationSelect]}
          setValue={setType}
        />
        <br />
        <LastButton onClick={() => ChangeDate()}>일정 확정</LastButton>
        <LastButton onClick={() => ChangeDate()}>취소</LastButton>
      </SmallWrapper>

      <Footer />
    </div>
  );
};
