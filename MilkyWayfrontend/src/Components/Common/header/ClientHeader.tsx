import React, { useState } from "react";
import styled from "styled-components";
import "../../SCSS/header.scss";

// Header styles
const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  color: #000000;
  background-color: #fffeee;
  display: flex;
  justify-content: space-between; /* Ensure space between left and right */
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 1044px) {
    height: 60px;
    padding: 0 10px;
  }
`;

const HeaderButton = styled.div`
  @font-face {
    font-family: "PartialSansKR-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/PartialSansKR-Regular.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "PartialSansKR-Regular";

  align-items: left;
  color: #000000;
  background-color: #fffeee;
  margin-top: 20px;

  @media (max-width: 1044px) {
    font-size: 12px;
  }
`;

const HeaderButton1 = styled.div`
  @font-face {
    font-family: "BMkkubulimTTF-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/BMkkubulimTTF-Regular.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "BMkkubulimTTF-Regular";
  align-items: left;
  color: #000000;
  background-color: #fffeee;
  font-size: 20px;
  text-align: center;
  padding-top: 4px;
  color: #e195ab;
  padding: 0px;
  margin: 0px;

  @media (max-width: 1044px) {
    font-size: 8px;
  }
`;

const ChangeButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  border: none;
  background-color: #fffeee;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  margin-left: 10px;
  font-size: 16px;
  font-family: "EliceDigitalBaeum-Bd";

  @font-face {
    font-family: "EliceDigitalBaeum-Bd";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  ${({ isActive }) =>
    isActive &&
    `
    color : #f6f6fa;
    background-color: rgb(60, 32, 143); /* Add a background color to the active button */
    font-weight: bold;
  `}

  /* Mouse hover effect */
  &:hover {
    background-color: #f1f1f1; /* Change the background color on hover */
    cursor: pointer; /* Change the cursor to a pointer */
    border-bottom: 2px double #000000;
    color: black;
  }
`;

const HomeButton = styled.img`
  align-items: right;
  color: #000000;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  padding-top: 4vw;
  width: 50px;
  height: 50px;
  padding: 10px;
  display: none;

  @media (max-width: 1044px) {
    width: 40px;
    height: 40px;
    display: block;
    margin-left: auto; /* Push the hamburger icon to the far right */
    margin-right: 0; /* Ensure no extra margin on the right */
  }
`;

const MangerButton = styled.img`
  align-items: right;
  color: #000000;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  padding-top: 4vw;
  width: 50px;
  height: 50px;
  padding: 10px;
  display: none;
  display: block;

  @media (max-width: 1044px) {
    width: 40px;
    height: 40px;
    display: none;
  }
`;

const ListBox = styled.div`
  width: 15vw;
  height: 100vh;
  background-color: #fffeee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;

  @media (max-width: 1044px) {
    width: 100%;
    height: auto;
  }
`;

const HeaderSmall = styled.div`
  display: none; /* Default state: hidden on large screens */

  @media (max-width: 1044px) {
    display: flex;
    justify-content: flex-end; /* Align elements to the right on small screens */
  }
`;

const HeaderLarge = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  @media (max-width: 1044px) {
    display: none; /* Hide on small screens */
  }
`;

export const ClientHeader = () => {
  const [isListVisible, setListVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("");

  const handleImageClick = () => {
    setListVisible(!isListVisible);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (buttonName == "관리자 로그인") {
      handleManagerButtonClick();
    }
  };

  const handleManagerButtonClick = () => {
    const isConfirmed = window.confirm("관리자 페이지로 이동하시겠습니까?");
    if (isConfirmed) {
      window.location.href = "/admin"; // 관리자 페이지 URL로 이동
    }
  };

  return (
    <div>
      <HeaderBox>
        <div>
          <HeaderButton>경상도 청소 전문업체</HeaderButton>
          <HeaderButton1>은하수 홈케어</HeaderButton1>
        </div>
        <HeaderLarge>
          <ChangeButton
            isActive={activeButton === "Main"}
            onClick={() => handleButtonClick("Main")}
          >
            Main
          </ChangeButton>
          <ChangeButton
            isActive={activeButton === "서비스 소개"}
            onClick={() => handleButtonClick("서비스 소개")}
          >
            서비스 소개
          </ChangeButton>
          <ChangeButton
            isActive={activeButton === "서비스 가격"}
            onClick={() => handleButtonClick("서비스 가격")}
          >
            서비스 가격
          </ChangeButton>
          <ChangeButton
            isActive={activeButton === "Q&A"}
            onClick={() => handleButtonClick("Q&A")}
          >
            Q&A
          </ChangeButton>
          <ChangeButton
            isActive={activeButton === "고객센터"}
            onClick={() => handleButtonClick("고객센터")}
          >
            고객센터
          </ChangeButton>
        </HeaderLarge>
        <div style={{ backgroundColor: "#F4DFB6" }}>
          <HomeButton
            src="src/Componments/img/hamburger.png"
            onClick={handleImageClick}
          />
          <MangerButton
            src="src/Componments/img/administrator.png"
            onClick={handleManagerButtonClick} // 관리자 버튼 클릭 시 확인
          />
        </div>
      </HeaderBox>

      {/* Conditional rendering based on screen size */}
      <HeaderSmall>
        {isListVisible && (
          <ListBox>
            <ul style={{ width: "100%" }}>
              <li>
                <ChangeButton
                  isActive={activeButton === "관리자 로그인"}
                  onClick={() => handleButtonClick("관리자 로그인")}
                >
                  관리자 로그인
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  isActive={activeButton === "Main"}
                  onClick={() => handleButtonClick("Main")}
                >
                  Main
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  isActive={activeButton === "서비스 소개"}
                  onClick={() => handleButtonClick("서비스 소개")}
                >
                  서비스 소개
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  isActive={activeButton === "서비스 가격"}
                  onClick={() => handleButtonClick("서비스 가격")}
                >
                  서비스 가격
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  isActive={activeButton === "Q&A"}
                  onClick={() => handleButtonClick("Q&A")}
                >
                  Q&A
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  isActive={activeButton === "고객센터"}
                  onClick={() => handleButtonClick("고객센터")}
                >
                  고객센터
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  isActive={activeButton === "온라인 예약하기"}
                  onClick={() => handleButtonClick("온라인 예약하기")}
                >
                  온라인 예약하기
                </ChangeButton>
              </li>
            </ul>
          </ListBox>
        )}
      </HeaderSmall>
    </div>
  );
};
