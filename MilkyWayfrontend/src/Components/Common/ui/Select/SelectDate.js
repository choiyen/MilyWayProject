import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./path-to-your-css-file.css";
import { Label } from "@/SCSS/Fixed";
const RadioBoxContainer = styled.div `
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  width: 500px;
  height: auto;
  width: 100%;
  margin-top: 20px;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const DateInput = styled(DatePicker) `
  width: 45vw;
  height: 50px;
  border: 1px solid black;

  @media screen and (max-width: 800px) {
    width: 270px;
    height: 40px;
  }
`;
export const SelectDate = ({ name, change, setValue, bookedDates = [], }) => {
    const [date, setDate] = useState(null);
    // 예약된 날짜 문자열을 Date 객체 배열로 변환
    const disabledDates = bookedDates.map((dateStr) => {
        const d = new Date(dateStr);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d;
    });
    useEffect(() => {
        if (change) {
            const dateObj = new Date(change);
            dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
            setDate(dateObj);
        }
    }, [change]);
    // ✅ 단일 날짜만 받도록 타입 정의
    const handleDateChange = (date) => {
        if (date && !Array.isArray(date)) {
            setDate(date);
            setValue(date);
        }
    };
    // 날짜의 색상 클래스 이름을 설정하는 함수
    const getDayClassName = (date) => {
        const day = date.getDay();
        // 일요일은 빨강, 토요일은 파랑, 평일은 녹색
        if (day === 0) {
            return "react-datepicker__day--sunday"; // 일요일 빨강
        }
        else if (day === 6) {
            return "react-datepicker__day--saturday"; // 토요일 파랑
        }
        else {
            return "react-datepicker__day--available"; // 평일 녹색
        }
    };
    return (_jsxs(RadioBoxContainer, { children: [_jsx(Label, { children: name }), _jsx(DateInput, { selected: date, onChange: handleDateChange, excludeDates: disabledDates, dateFormat: "yyyy-MM-dd", placeholderText: "\uB0A0\uC9DC\uB97C \uC120\uD0DD\uD558\uC138\uC694", popperPlacement: "bottom-start", portalId: "root-portal", dayClassName: (date) => getDayClassName(date) })] }));
};
