import { theme } from "@/SCSS/typecss";
import styled from "styled-components";
export const ListBox = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "visible",
}) `
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
export const BusinessBox = styled.div `
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
export const HeaderLarge = styled.div `
  display: flex;
  justify-content: space-between;
  width: 50%;
  @media (max-width: 1044px) {
    display: none;
  }
`;
export const HeaderButton = styled.div `
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
  margin-top: 15px;

  font-size: 12px;
`;
export const HeaderButton1 = styled.div `
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
export const ChangeButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "isActive",
}) `
  width: 100px;
  border: none;
  text-align: center;
  margin-left: 40px;
  padding: 10px 0;
  font-size: 16px;
  font-family: "EliceDigitalBaeum-Bd";
  color: ${theme.colors.charcoalBlack};

  @font-face {
    font-family: "EliceDigitalBaeum-Bd";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  ${({ isActive }) => isActive &&
    `
      font-weight: bold;
      border-bottom: 5px double ${theme.colors.galaxySilver};
    `}

  &:hover {
    cursor: pointer;
    border-bottom: ${({ isActive }) => isActive ? "4px double #3CB371" : "4px double #43b3ae"};
  }
`;
export const HeaderBox = styled.div `
  width: 100%;
  height: 70px;
  color: #000000;
  background-color: ${theme.colors.starlightWhite};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 1001;
  @media (max-width: 1044px) {
    height: 60px;
    padding: 0 10px;
  }
`;
export const HomeButton = styled.div `
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
export const ManagerButton = styled.div `
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
export const Overlay = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "visible",
}) `
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
