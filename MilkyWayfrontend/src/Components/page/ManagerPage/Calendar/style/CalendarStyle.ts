import { StyledCalendarWrapper } from "@/SCSS/Fixed";
import styled from "styled-components";

// styled-components 정의
export const CalendarWapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const CalendarsWrapper = styled(StyledCalendarWrapper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0px;
`;

export const Label2 = styled.span`
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

export const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const isSameDate = (d1: Date, d2: Date | string) => {
  const targetDate = new Date(d2);
  return (
    d1.getFullYear() === targetDate.getFullYear() &&
    d1.getMonth() === targetDate.getMonth() &&
    d1.getDate() === targetDate.getDate()
  );
};
