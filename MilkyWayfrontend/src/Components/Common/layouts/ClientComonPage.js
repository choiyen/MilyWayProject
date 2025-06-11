import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FixedClientHeader } from "@/SCSS/Fixed";
import { Footer } from "../frame/Footer";
import { Outlet } from "react-router-dom";
import { ComonProfile } from "@/Components/page/ClientPage/Comon/ComonProfile";
import { ClientPhoneNumber } from "./ClientPhoneNumber";
import styled from "styled-components";
import { RoundWidgets } from "@/Components/page/ClientPage/Main/Component/RoundWidgets";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
const MobileBox = styled.div `
  @media (max-width: 1044px) {
    display: none;
  }
`;
export const ClientComonPage = () => {
    const width = useWindowWidth();
    const isMobile = width <= 600;
    return (_jsx("div", { children: _jsxs(FixedClientHeader, { children: [_jsx(MobileBox, { children: _jsx(ComonProfile, {}) }), _jsx(Outlet, {}), _jsx(ClientPhoneNumber, {}), isMobile ? null : _jsx(RoundWidgets, {}), _jsx(Footer, {})] }) }));
};
