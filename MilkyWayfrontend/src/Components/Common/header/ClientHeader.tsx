import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "@/SCSS/header.scss";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import broom from "@/Components/Common/assets/broom.png";
import { Head } from "../frame/header";
import { ClientPath } from "./headerPaths";
import { PiPhoneOutgoingFill } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
import {
  BusinessBox,
  ChangeButton,
  HeaderBox,
  HeaderButton,
  HeaderButton1,
  HeaderLarge,
  HomeButton,
  ListBox,
  ManagerButton,
  Overlay,
} from "./HeaderCommon";
import { theme } from "@/SCSS/typecss";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "PartialSansKR-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/PartialSansKR-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "BMkkubulimTTF-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/BMkkubulimTTF-Regular.woff2") format("woff2");
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`;

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visible",
})<{ visible: boolean }>`
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
        <div style={{ backgroundColor: "#E0F7FA" }}>
          <HomeButton>
            <CgMenuGridR
              onClick={handleImageClick}
              style={{
                width: "50px",
                height: "50px",
                color: `${theme.colors.midnightIndigo}`,
              }}
            />
          </HomeButton>
          <ManagerButton>
            <MdSettings
              onClick={handleManagerButtonClick}
              style={{
                width: "50px",
                height: "50px",
                color: `${theme.colors.midnightIndigo}`,
              }}
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
