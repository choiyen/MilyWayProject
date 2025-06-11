import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
const Backdrop = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled.div `
  background-color: white;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
export const LoadingModal = ({ message = "잠시만 기다려 주세요...", }) => {
    return (_jsx(Backdrop, { children: _jsxs(ModalBox, { children: ["\u23F3 ", message] }) }));
};
