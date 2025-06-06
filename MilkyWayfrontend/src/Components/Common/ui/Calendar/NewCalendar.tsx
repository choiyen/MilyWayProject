import { StyledCalendar } from "@/SCSS/Fixed";
import { Value } from "@/types/Date/date";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  Value: Value;
  setValue: Dispatch<SetStateAction<Value>>; // 수정된 부분
}

const Label2 = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: center;
  padding: 30px;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  background-color: #a7badf; /* 밝고 청결한 느낌의 민트 배경 */

  @media screen and (max-width: 600px) {
    font-size: 15px; /* 모바일에서 폰트 크기 조정 */
  }
`;

const StyledCalendarWrapper = styled.div`
  width: 100%;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f3f4f6; /* 밝고 청결한 느낌의 민트 배경 */
  padding: 40px;

  @media screen and (max-width: 600px) {
    margin-bottom: 20px; /* 모바일에서 아래 여백 조정 */
    padding: 20px; /* 모바일에서 패딩 조정 */
    box-shadow: none;
    background-color: transparent; /* 모바일에서 배경색 제거 */
    padding: 0px;
  }
`;

export const NewCalendar = ({ name, Value, setValue }: SelectBoxProps) => {
  const handleDateChange = (newDate: Value) => {
    setValue(newDate);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600); // 모바일 기준
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const width = useWindowWidth();
  const isMobileView = width <= 600;
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <StyledCalendarWrapper>
        {!isMobileView && <Label2>{name}</Label2>}
        <StyledCalendarWrapper>
          <StyledCalendar
            onChange={handleDateChange}
            value={Value}
            calendarType="gregory"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
            formatDay={(locale: string, date: Date) => {
              if (isMobile) {
                return date.getDate().toString(); // 숫자만
              } else {
                return `${date.getDate()}일`; // 숫자 + "일"
              }
            }}
          />
        </StyledCalendarWrapper>
      </StyledCalendarWrapper>
    </div>
  );
};
