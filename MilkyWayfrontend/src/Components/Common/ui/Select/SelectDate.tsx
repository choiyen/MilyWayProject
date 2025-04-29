import { useEffect, useState } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  change: string; // Date string format passed as prop (e.g., "2025-03-09")
  setValue: (date: Date) => void;
}

const RadioBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center; /* 수직 정렬 */
  width: 500px;
  height: auto;
  margin-top: 20px;
`;

const Label = styled.span`
  font-size: 20px; /* 글씨 크기 조정 */
  line-height: 16px;
  font-weight: bolder;
  margin-right: 80px;
`;

const DateInput = styled.input`
  width: 200px;
  height: 50px;
`;

export const SelectDate = ({ name, change, setValue }: SelectBoxProps) => {
  const [date, setDate] = useState<Date>(new Date()); // 초기 상태를 현재 날짜로 설정

  useEffect(() => {
    if (change) {
      const dateObj = new Date(change);

      // 날짜가 로컬 시간대로 설정되도록 시간대 차이를 조정
      dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset()); // 로컬 시간대로 맞추기

      setDate(dateObj); // 변경된 날짜를 state로 설정
    }
  }, [change]); // 'change' prop이 변경될 때마다 effect 실행

  // 날짜를 YYYY-MM-DD 형식으로 변환
  const dateString = date.toISOString().split("T")[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value)); // 날짜가 변경되면 상태 업데이트
    setValue(new Date(e.target.value));
  };

  return (
    <RadioBoxContainer>
      <Label>{name}</Label>
      <DateInput type="date" value={dateString} onChange={handleDateChange} />
    </RadioBoxContainer>
  );
};
