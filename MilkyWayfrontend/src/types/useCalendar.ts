import { getDaysInMonth } from "date-fns";
import { useState } from "react";

const CALENDER_LENGTH = 35; // 달력의 행 수
const DEFAULT_TRASH_VALUE = 0; // 기본 쓰레기 값
const DAY_OF_WEEK = 7; // 주의 일 수

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태
  const totalMonthDays = getDaysInMonth(currentDate); // 현재 월의 총 일 수

  const prevDayList = Array.from({
    length: Math.max(0, currentDate.getDay() - 1),
  }).map(() => DEFAULT_TRASH_VALUE); // 이전 달의 요일 리스트

  const currentDayList = Array.from(
    { length: totalMonthDays },
    (_, i) => i + 1
  ); // 현재 달의 요일 리스트
  const nextDayList = Array.from({
    length: CALENDER_LENGTH - prevDayList.length - currentDayList.length,
    // 다음 달의 요일 리스트
  }).map(() => DEFAULT_TRASH_VALUE); // 다음 달의 요일 리스트

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList); // 전체 달력 리스트

  const weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, index) => {
      const chunkIndex = Math.floor(index / DAY_OF_WEEK); // 주 단위로 나누기 위한 인덱스 계산
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []; // 새로운 주 생성
      }
      acc[chunkIndex].push(cur); // 현재 날짜 추가
      return acc; // 누적값 반환
    },
    [] // 초기값 설정
  );
  return {
    weekCalendarList: weekCalendarList, // 주 단위 달력 리스트
    currentDate: currentDate, // 현재 날짜
    setCurrentDate: setCurrentDate, // 날짜 설정 함수
  };
};

export default useCalendar; // userCalendar 훅 내보내기
