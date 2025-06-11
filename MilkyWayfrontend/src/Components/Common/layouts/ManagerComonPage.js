import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FixedManagerHeader } from "@/SCSS/Fixed";
import { Footer } from "../frame/Footer";
import { Outlet } from "react-router-dom";
import { ComonProfile } from "@/Components/page/ClientPage/Comon/ComonProfile";
import styled from "styled-components";
const MobileBox = styled.div `
  @media (max-width: 1044px) {
    display: none;
  }
`;
export const ManagerCommonPage = () => {
    return (_jsx("div", { children: _jsxs(FixedManagerHeader, { children: [_jsx(MobileBox, { children: _jsx(ComonProfile, {}) }), _jsx(Outlet, {}), " ", _jsx(Footer, {})] }) }));
};
