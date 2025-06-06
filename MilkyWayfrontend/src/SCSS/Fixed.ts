import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ClientHeader } from "@/Components/Common/header/ClientHeader";
import { MangerHeader } from "@/Components/Common/header/MangerHeader";
import { theme } from "./typecss";

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
  color: ${theme.colors.charcoalBlack}; /* 세련된 다크 퍼플 */
  font-size: 40px;
  margin-bottom: 30px; /* Add space below the title to separate from the next content */
  margin-top: 30px;
  font-weight: bolder;

  @media screen and (max-width: 600px) {
    font-size: 25px; /* Adjust font size for smaller screens */
  }
`;

export const StyledCalendarWrapper = styled.div`
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
export const Wapper = styled.div`
  background-color: gainsboro;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  gap: 30px;

  @media screen and (max-width: 600px) {
    padding: 12px;
    width: 100%;
    border-radius: 0px;
    gap: 12px;
    box-shadow: none;
  }
`;

export const ImgTag = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 50px;

  @media screen and (max-width: 600px) {
    width: 50px;
    height: 50px;
    margin-top: 30px; /* 모바일에서 위 여백 조정 */
  }
`;

export const SmallButton = styled.button`
  width: auto;
  min-width: 100px;
  height: 36px;
  padding: 0 16px;
  margin-top: 50px;
  border: none;
  border-radius: 6px;
  background-color: ${theme.colors.auroraBlue};
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

  @media screen and (max-width: 600px) {
    width: 70px;
  }
`;

export const LastButton = styled.button`
  width: 100%;
  max-width: 400px; /* ✅ 최대 너비 설정 */
  height: 38px;
  padding: 30px; /* ✅ 패딩 제거 */
  border: none;
  border-radius: 8px;
  background-color: #84cc16;
  color: #fff;
  margin-top: 50px;
  margin-bottom: 60px; /* ✅ 아래 여백 추가 */
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex; /* ✅ 중앙 정렬 */
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #574fd6;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  @media screen and (max-width: 600px) {
    max-width: 250px;
    padding: 20px; /* ✅ 모바일에서 패딩 조정 */
    height: 20px;
    margin-top: 25px;
    color: black;
    font-weight: 600;
    font-size: 14px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)`
  width: 400px;
  height: auto;
  padding: 20px;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

export const Label = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;

  @media screen and (max-width: 600px) {
    font-size: 15px; /* 모바일에서 폰트 크기 조정 */
  }
`;
