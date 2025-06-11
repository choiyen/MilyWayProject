import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import styled from "styled-components";
const FooterBox = styled.div `
  width: 100%;
  background-color: #ffedfa;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
  line-height: 50px;
`;
const FooterLite = styled.div `
  background-color: #252287;
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 800px) {
    font-size: 10px;
    line-height: 20px;
    padding: 10px 0;
    width: 100%;
    box-sizing: border-box;
  }
`;
const Wrapper = styled.div `
  background-color: #f0f0f0;
  height: calc(20vh);
  display: flex;
  justify-content: end;
  align-items: end;
`;
export const Footer = () => {
    const businessNumber = import.meta.env.VITE_APP_BUSINESS_NUMBER;
    const businessPhoneNumber = import.meta.env.VITE_APP_BUSINESS_PHONE_NUMBER;
    const businessDay = import.meta.env.VITE_APP_BUSINESS_DAY;
    const width = useWindowWidth();
    const isMobile = width <= 600;
    return (_jsx(Wrapper, { children: _jsxs(FooterBox, { children: [_jsxs(FooterLite, { children: [_jsxs("span", { children: ["\uC740\uD558\uC218\uD648\uCF00\uC5B4 | \uC724\uC815\uC21C | \uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638: ", businessNumber, !isMobile && ` | 전화번호: ${businessPhoneNumber} `] }), _jsx("span", { children: "\uACE0\uAC1D\uACFC\uC758 \uC57D\uC18D: 365\uC77C 24\uC2DC\uAC04 \uC6B4\uC601, \uCD5C\uC800\uAC00 \uACAC\uC801, \uCE5C\uC808\uC0C1\uB2F4, \uACE0\uAC1D\uC6B0\uC120, \uCCAD\uC18C\uC758 \uC9C4\uC2EC!" })] }), _jsxs("span", { children: ["Established \u00A9 ", businessDay, ". All rights reserved."] })] }) }));
};
