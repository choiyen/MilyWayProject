import { StyledCalendar, StyledCalendarWrapper } from "@/SCSS/Fixed";
import { Value } from "@/types/Date/date";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  Value: Value;
  setValue: Dispatch<SetStateAction<Value>>; // 수정된 부분
}

const TextAreaContainer = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬 */
  width: 500px;
  height: auto;
  margin-top: 20px;
`;

const Label = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
`;

export const NewCalendar = ({ name, Value, setValue }: SelectBoxProps) => {
  const handleDateChange = (newDate: Value) => {
    setValue(newDate);
  };
  return (
    <div>
      <TextAreaContainer>
        <StyledCalendarWrapper>
          <Label>{name}</Label>
          <StyledCalendar
            onChange={handleDateChange}
            value={Value}
            // formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
            // formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
            // formatMonthYear={(locale, date) =>
            //   moment(date).format("YYYY. MM")
            // } // 네비게이션에서 2023. 12 이렇게 보이도록 설정
            calendarType="gregory" // 일요일 부터 시작
            showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
          />
        </StyledCalendarWrapper>
      </TextAreaContainer>
    </div>
  );
};
