import { getDaysInMonth } from "date-fns";
import { useState } from "react";

const CALENDAR_LENGTH = 35; // 5주 × 7일 = 35칸 달력
const DEFAULT_TRASH_VALUE = 0; // 빈 칸을 의미
const DAY_OF_WEEK = 7; // 한 주 = 7일

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 기준 날짜 상태
  const totalMonthDays = getDaysInMonth(currentDate); // 이번 달의 총 날짜 수

  /**
   * ✅ 1일의 요일을 기준으로 앞에 몇 칸을 비워야 하는지 계산
   * Date.getDay()는 일요일이 0이기 때문에
   * (day + 6) % 7 하면 월요일을 0으로 보정할 수 있음
   */
  const getStartDayIndex = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return (day + 6) % 7; // 월요일 기준으로 정렬
  };

  const startDayIndex = getStartDayIndex(currentDate);

  // 💡 이전 달 자리 채우기 (빈 칸)
  const prevDayList = Array.from({ length: startDayIndex }).map(
    () => DEFAULT_TRASH_VALUE
  );

  // 💡 이번 달 실제 날짜 리스트
  const currentDayList = Array.from(
    { length: totalMonthDays },
    (_, i) => i + 1
  );

  // 💡 남은 칸은 다음 달로 채움 (빈 칸)
  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - prevDayList.length - currentDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  // ✅ 전체 달력 리스트 구성
  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

  // ✅ 7일씩 끊어서 2차원 배열로 주 단위 나누기
  const weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, index) => {
      const chunkIndex = Math.floor(index / DAY_OF_WEEK);
      if (!acc[chunkIndex]) acc[chunkIndex] = [];
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  // 📅 현재 연도 반환
  const getCurrentYear = () => currentDate.getFullYear();

  // 📅 현재 월 반환 (1~12)
  const getCurrentMonth = () => currentDate.getMonth() + 1;

  return {
    weekCalendarList, // 주 단위 달력 데이터
    currentDate, // 현재 기준 날짜
    setCurrentDate, // 기준 날짜 변경
    getCurrentYear, // 연도 추출 함수
    getCurrentMonth, // 월 추출 함수
  };
};

export default useCalendar;
