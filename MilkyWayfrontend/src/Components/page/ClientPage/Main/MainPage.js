import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cleaning } from "@/types/cleanspace/cleanType";
import styled from "styled-components";
import { InquireText } from "./Component/InquireText";
import { FaCheckCircle, FaFeatherAlt, FaHandsWash, FaStar, } from "react-icons/fa";
import { BlogComment } from "./Component/BlogComment";
import { ImageGrid } from "./Component/ImageGrid";
import { useNavigate } from "react-router-dom";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";
export const MainMapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 100vw;
  background-color: #d6e3c9;
  padding: 10px 0;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #305f55;
    margin: 0;

    span:first-of-type {
      color: #4da692;
      font-weight: 600;
    }
  }

  div {
    font-size: 1rem;
    margin: 0;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 18px;
    }
    div {
      font-size: 10px;
    }
  }
`;
export const ButtonMapper = styled.div `
  display: flex;
  width: 100%;
  max-width: 100vw;
  flex-wrap: wrap; /* 버튼이 넘치면 다음 줄로 이동 */
  gap: 12px; /* 버튼 사이 간격 */
  padding: 50px;
  background-color: #d6e3c9; // 밝고 청결한 느낌의 민트 배경

  img {
    width: 150px;
  }

  & > button {
    flex: 1 0 30%;
    padding: 10px;

    @media screen and (max-width: 800px) {
      img {
        width: 80px;
        height: 100px;
      }
      height: 15vh;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      padding: 15px;
    }
  }

  @media screen and (max-width: 800px) {
    gap: 10px;
    padding: 30px;
  }
`;
const AcrosticBox = styled.div `
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: white;
  width: 100%;

  span {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1.2rem;
    line-height: 1.4;
    color: #333;

    @media screen and (max-width: 600px) {
      font-size: 14px;
      line-height: 1.5;
    }

    strong {
      color: #305f55;
      margin: 0 5px;
    }
    span {
      color: #f19a9a;
      font-weight: 700;
      font-size: 1.3rem;
      margin-left: 6px;

      @media screen and (max-width: 600px) {
        font-size: 14px;
      }
    }
  }
`;
const CleanButton = styled.button `
  background-color: aliceblue;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bolder;

  &:hover {
    background-color: #cceeff; /* 밝고 청결한 느낌의 하늘색 배경 */
  }
  &:active {
    background-color: #a6d5f7; /* 밝은 하늘색 */
  }

  &:focus {
    box-shadow: 0 0 0 2px #0eeab6; // 포커스 시 민트색 테두리
  }
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    font-size: 15px;
    padding: 8px;

    gap: 0; /* 버튼 내 요소 사이 간격 제거 */
  }
`;
const CheckbuttonLeft = styled.a `
  flex: 1;
  text-decoration: none;
  color: inherit;
  display: block;

  div {
    background-color: #fff9db;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 16px;
    gap: 6px;
    cursor: pointer;
    box-shadow: 4px 4px rgba(0, 0, 0, 0.1);

    span:first-child {
      font-size: 1.25rem;
      font-weight: bold;
      color: #305f55;

      @media screen and (max-width: 600px) {
        font-size: 1rem;
      }
    }

    span:last-child {
      font-size: 1rem;
      color: #a5947c;

      @media screen and (max-width: 600px) {
        font-size: 0.75rem;
      }
    }

    @media screen and (max-width: 600px) {
      padding: 10px;
    }
  }
`;
const Checkbuttonlight = styled.a `
  flex: 1;
  background-color: #ffe6e1;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding-bottom: 12px;
  cursor: pointer; /* 기본 상태부터 커서를 클릭 가능한 손가락 모양으로 변경 */
  box-shadow: 4px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    padding: 10px;
  }
  span:first-child {
    font-size: 1.55rem;
    font-weight: bold;
    color: #305f55;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }

  span:last-child {
    font-size: 1rem;
    color: #a5947c;

    @media screen and (max-width: 600px) {
      font-size: 0.75rem;
    }
  }
`;
export const MainPage = () => {
    const iconStyle = { marginRight: "8px", color: "#4a90e2", minWidth: "20px" };
    const native = useNavigate();
    const handleClickSerive = (data) => {
        native(GateWayNumber.Client + "/" + ClientGateWayType.Service + `?type=${data}`);
    };
    const handleClickQA = () => {
        native(GateWayNumber.Client + "/" + ClientGateWayType.Question);
    };
    const businessPhoneNumber = import.meta.env.VITE_APP_BUSINESS_PHONE_NUMBER;
    return (_jsxs(_Fragment, { children: [_jsxs(MainMapper, { children: [_jsxs("h2", { children: [_jsx("span", { children: "\uD558\uB8E8\uC5D0 \uD55C\uC9D1\uC529!" }), _jsx("span", { children: "\uCC28\uADFC\uCC28\uADFC!! \uAF3C\uAF3C\uD788!!" })] }), _jsx("div", { children: "\uC5B4\uB5A4 \uC5C5\uBB34\uB97C \uD558\uB294 \uC9C0 \uAD81\uAE08\uD558\uC9C0 \uC54A\uC73C\uC2E0\uAC00\uC694?" })] }), _jsx(ButtonMapper, { children: cleaning.map((data, index) => (_jsxs(CleanButton, { onClick: () => handleClickSerive(data.cleanType), children: [_jsx("img", { src: data.icon, alt: "" }), data.cleanType] }, index))) }), _jsxs("div", { style: {
                    display: "flex",
                    textAlign: "center",
                    alignItems: "stretch", // 두 영역 높이 맞춤
                    width: "100%",
                    maxWidth: "100vw",
                }, children: [_jsx(CheckbuttonLeft, { href: `tel:${businessPhoneNumber}`, target: "_blank", children: _jsxs("div", { children: [_jsx("span", { children: "\uC0C1\uB2F4\uC804\uD654 \uAC78\uAE30" }), _jsx("span", { children: "\uD734\uB300\uC804\uD654\uC5D0\uC11C \uD074\uB9AD \uC2DC \uBC14\uB85C \uC5F0\uACB0" })] }) }), _jsxs(Checkbuttonlight, { onClick: () => {
                            handleClickQA();
                        }, children: [_jsx("span", { children: "Q&A \uBCF4\uAE30" }), _jsx("span", { children: "\uC608\uC0C1 \uC9C8\uBB38\uC744 \uC791\uC131\uD574\uBD24\uC5B4\uC694!" })] })] }), _jsx(InquireText, {}), _jsxs(AcrosticBox, { children: [_jsxs("span", { children: [_jsx(FaFeatherAlt, { style: { ...iconStyle, marginRight: "8px" } }), _jsx("strong", { children: "\uC740\uC740\uD558\uACE0 \uAE68\uB057\uD558\uAC8C" }), " \uC7A1\uD2F0 \uD558\uB098 \uC5C6\uC774"] }), _jsxs("span", { children: [_jsx(FaHandsWash, { style: { ...iconStyle, marginRight: "8px" } }), _jsx("strong", { children: "\uD558\uB098\uD558\uB098 \uC815\uC131\uC2A4\uB7FD\uAC8C" }), " \uC5B4\uBA38\uB2C8\uC758 \uC190\uC73C\uB85C \uAF3C\uAF3C\uD788"] }), _jsxs("span", { children: [_jsx(FaStar, { style: { ...iconStyle, marginRight: "8px" } }), _jsx("strong", { children: " \uD655\uC778\uD558\uC5EC \uCCAD\uC18C\uD558\uB294" }), " ", _jsx("span", { children: "\uC740\uD558\uC218\uD648\uCF00\uC5B4" }), "\uB97C \uC120\uD0DD\uD574\uBCF4\uC138\uC694."] }), _jsxs("span", { children: [_jsx(FaCheckCircle, { style: { ...iconStyle, marginRight: "8px" } }), _jsx("strong", { children: "\uC808\uB300 \uD6C4\uD68C\uD558\uC9C0 \uC54A\uC73C\uC2E4 \uAC81\uB2C8\uB2E4. " })] })] }), _jsx(BlogComment, {}), _jsx(ImageGrid, {})] }));
};
