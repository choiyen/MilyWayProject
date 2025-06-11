import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { theme } from "@/SCSS/typecss";
import save2 from "@/Components/Common/assets/save2.gif";
import { Link } from "react-router-dom";
const ProfileWrapper = styled.div `
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;
const ProfileImage = styled.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const TextContainer = styled.div `
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  user-select: none;
  color: ${theme.colors.starlightWhite};
`;
const Line1 = styled.span `
  font-size: 15px;
  font-weight: bold;
  color: ${theme.colors.starlightWhite};
  display: block;
  margin-bottom: 10px;
`;
const Line2 = styled.span `
  font-size: 20px;
  color: ${theme.colors.softCoral};
  display: block;
  margin-bottom: 10px;
  font-weight: normal;

  span {
    font-weight: bold;
    color: ${theme.colors.softCoral};
  }
`;
const Line3 = styled.span `
  font-size: 20px;
  color: ${theme.colors.hazeRose};
  display: block;
`;
const AboutLink = styled(Link) `
  display: inline-block;
  margin-top: 15px;
  padding: 8px 20px;
  background-color: transparent;
  color: ${theme.colors.starlightWhite};
  border: 2px solid ${theme.colors.auroraBlue};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.auroraBlue};
    color: white;
  }
`;
export const ComonProfile = () => {
    return (_jsxs(ProfileWrapper, { children: [_jsx(ProfileImage, { src: save2, alt: "profile-animation" }), _jsxs(TextContainer, { children: [_jsx(Line1, { children: "\uACE0\uAC1D \uBAA8\uB450\uB97C \uD558\uB098\uC758 \uAC00\uC871 \uAC19\uC740 \uB9C8\uC74C\uC73C\uB85C!!!" }), _jsxs(Line2, { children: [_jsx("span", { children: "\uC740\uD558\uC218 \uD648\uCF00\uC5B4" }), "\uB294 \uACE0\uAC1D\uB2D8\uC758 \uC18C\uC911\uD55C \uACF5\uAC04\uC744 \uAE68\uB057\uD558\uAC8C \uB9CC\uB4E4\uC5B4 \uB4DC\uB9BD\uB2C8\uB2E4."] }), _jsx(Line3, { children: "\uACE0\uAC1D, \uC5EC\uB7EC\uBD84\uC758 \uBC29\uBB38\uC744 \uC9C4\uC2EC\uC73C\uB85C \uD658\uC601\uD569\uB2C8\uB2E4." }), _jsx(AboutLink, { to: "/Client/Service", children: "About" })] })] }));
};
