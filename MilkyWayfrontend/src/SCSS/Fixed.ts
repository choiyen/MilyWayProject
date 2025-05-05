import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ClientHeader } from "@/Components/Common/header/ClientHeader";
import { MangerHeader } from "@/Components/Common/header/MangerHeader";

export const FixedManagerHeader = styled(MangerHeader)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000; /* Make sure it stays on top */
`;

export const FixedClientHeader = styled(ClientHeader)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000; /* Make sure it stays on top */
`;
export const Fontname = styled.div`
  color: darkviolet; /* 세련된 다크 퍼플 */
  font-size: 40px;
  margin-bottom: 30px; /* Add space below the title to separate from the next content */
  margin-top: 30px;
  font-weight: bolder;
`;

export const Wapper = styled.div`
  width: 60%;
  height: auto; /* Allow Wapper to grow dynamically */
  background-color: gainsboro;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensure all elements are top-aligned */
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 1; /* Allow Wapper to take remaining space */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

export const ImgTag = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 50px;
`;

export const SmallButton = styled.button`
  width: auto;
  min-width: 100px;
  height: 36px;
  padding: 0 16px;
  margin-top: 50px;
  border: none;
  border-radius: 6px;
  background-color: #6c63ff;
  color: #fff;

  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #574fd6;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const LastButton = styled.button`
  width: 100%;
  max-width: 240px;
  height: 48px;
  padding: 0 20px;
  margin: 48px auto 40px auto;

  border: none;
  border-radius: 8px;
  background-color: #6c63ff; /* 세련된 보라톤 */
  color: #fff;

  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #574fd6;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

// 캘린더를 감싸주는 스타일
export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
`;
// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)`
  width: 300px;
`;
