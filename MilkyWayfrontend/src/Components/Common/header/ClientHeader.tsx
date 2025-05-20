import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "@/SCSS/header.scss";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import broom from "@/Components/Common/assets/broom.png";
import { Head } from "../frame/header";
import { ClientPath } from "./headerPaths";
import { PiPhoneOutgoingFill } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";

const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  color: #000000;
  background-color: #fff9f0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 1001;
  @media (max-width: 1044px) {
    height: 60px;
    padding: 0 10px;
  }
`;

const HeaderLarge = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  @media (max-width: 1044px) {
    display: none;
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
  margin-top: 15px;

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
    font-size: 15px;
  }
`;

const ChangeButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  width: 100px;
  border: none;
  background-color: #fff9f0;
  text-align: center;
  margin-left: 40px;
  padding: 10px 0;
  font-size: 16px;
  font-family: "EliceDigitalBaeum-Bd";
  color: #000;

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
    font-weight: bold;
    border-bottom: 4px double #3CB371;
  `}

  &:hover {
    cursor: pointer;
    border-bottom: ${({ isActive }) =>
      isActive ? "4px double #3CB371" : "4px double #43b3ae"};
  }
`;

const HomeButton = styled.div`
  align-items: right;
  color: #000000;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  display: none;

  @media (max-width: 1044px) {
    display: block;
    margin-left: auto;
    margin-right: 0;
  }
`;
const Overlay = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: fixed;
  top: 70px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 70px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;

  @media (max-width: 1044px) {
    top: 60px;
    height: calc(100vh - 60px);
  }
`;

const ManagerButton = styled.div`
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  padding: 10px;
  display: block;

  @media (max-width: 1044px) {
    width: 40px;
    height: 40px;
    display: none;
  }
`;

const ListBox = styled.div<{ visible: boolean }>`
  width: 200px;
  height: 100vh;
  background-color: #fffeee;
  flex-direction: column;
  padding: 10px;
  position: fixed;
  top: 70px;
  right: ${({ visible }) => (visible ? "0" : "-220px")};
  transition: right 0.3s ease;
  z-index: 1005;

  @media (max-width: 1044px) {
    top: 60px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
`;

const BusinessBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 10px;
  width: 30%;
  padding: 10px;
  gap: 15px;

  @media (max-width: 1044px) {
    display: none;
  }

  div {
    border-left: 4px solid #8b3d3d;
  }
`;

const Container = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: row;
  position: ${({ visible }) => (visible ? "fixed" : "absolute")};
  width: 100%;
`;

type ClientHeaderProps = {
  children?: React.ReactNode;
};

export const ClientHeader = ({ children }: ClientHeaderProps) => {
  const [isListVisible, setListVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("");
  const nativeGate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    setListVisible(!isListVisible);
  };

  const FuncClick = async (name: string, buttonName: string) => {
    setActiveButton(buttonName);
    nativeGate(name);
    setListVisible(false);
  };

  const handleManagerButtonClick = () => {
    const isConfirmed = window.confirm("관리자 페이지로 이동하시겠습니까?");
    setActiveButton("AdminPage");
    if (isConfirmed) {
      nativeGate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main);
    }
    setListVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setListVisible(false);
      }
    };

    if (isListVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isListVisible]);

  return (
    <div>
      <Head title={activeButton} description="은하수 홈케어" />
      <HeaderBox>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={broom}
            alt="logo"
            style={{ width: "40px", height: "40px", marginRight: "0px" }}
          />
          <div>
            <HeaderButton>경상도 청소 전문업체</HeaderButton>
            <HeaderButton1>은하수 홈케어</HeaderButton1>
          </div>
        </div>
        <HeaderLarge>
          {ClientPath && (
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {ClientPath.map((data) => (
                <ChangeButton
                  key={data.activename}
                  isActive={activeButton === data.activename}
                  onClick={() => FuncClick(data.paths, data.activename)}
                >
                  {data.buttonname}
                </ChangeButton>
              ))}
            </div>
          )}
        </HeaderLarge>
        <BusinessBox>
          <PiPhoneOutgoingFill
            style={{ color: "royalblue", width: "20px", height: "20px" }}
          />
          010-6513-1458
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderLeft: "4px solid #813232",
              textAlign: "center",
              width: "40%",
            }}
          >
            <span>24시간 상담 예약</span>
            <span style={{ fontWeight: "bold" }}>언제든지 환영</span>
          </div>
        </BusinessBox>
        <div style={{ backgroundColor: "#F4DFB6" }}>
          <HomeButton>
            <CgMenuGridR
              onClick={handleImageClick}
              style={{ width: "50px", height: "50px" }}
            />
          </HomeButton>
          <ManagerButton>
            <MdAdminPanelSettings
              onClick={handleManagerButtonClick}
              style={{ width: "50px", height: "50px" }}
            />
          </ManagerButton>
        </div>
      </HeaderBox>

      <Container visible={isListVisible}>
        <Overlay
          visible={isListVisible}
          onClick={() => setListVisible(false)}
        />
        <div style={{ flex: 1 }}>{children}</div>
        <ListBox ref={listRef} visible={isListVisible}>
          <ul>
            <li>
              <ChangeButton
                isActive={activeButton === "관리자 로그인"}
                onClick={handleManagerButtonClick}
              >
                관리자 로그인
              </ChangeButton>
            </li>
            {ClientPath &&
              ClientPath.map((data) => (
                <li key={data.activename}>
                  <ChangeButton
                    isActive={activeButton === data.activename}
                    onClick={() => FuncClick(data.paths, data.activename)}
                  >
                    {data.buttonname}
                  </ChangeButton>
                </li>
              ))}
          </ul>
        </ListBox>
      </Container>
    </div>
  );
};
