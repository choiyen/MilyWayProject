import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../SCSS/header.scss";
import styled from "styled-components";
const Introductionbox = styled.div `
  width: 100%;
  height: 150px;
  color: black;
  padding: 50px;
  background-color: #f9e8d9;
`;
const Introductiondiv = styled.div `
  margin-top: 10px;
  padding-left: 10px;
  font-size: 15px;
`;
const Reservationbutton = styled.button `
  margin-top: 40px;
  border: 1px solid #e195ab;
  width: 120px;
  height: 35px;
  margin-left: 20px;
  border-radius: 10px;

  &:hover {
    background-color: #e195ab;
    color: white;
  }
  @media (max-width: 1044px) {
    display: none;
  }
`;
export const Introduction = () => {
    return (_jsxs(Introductionbox, { children: [_jsx(Introductiondiv, { children: "\uAC00\uC871 \uAC19\uC740 \uB9C8\uC74C\uC73C\uB85C \uCCAD\uC18C\uC5D0 \uC784\uD569\uB2C8\uB2E4." }), _jsx(Introductiondiv, { children: "\uAC00\uC871 \uAE30\uC5C5, \uC740\uD558\uC218 \uD648\uCF00\uC5B4\uC5D0\uC11C \uC544\uB984\uB2E4\uC6B4 \uC8FC\uAC70 \uD658\uACBD\uC744 \uACBD\uD5D8\uD558\uC138\uC694." }), _jsx(Introductiondiv, { children: "\uC800\uD76C\uB97C \uD55C\uBC88 \uBBFF\uC5B4\uBCF4\uC138\uC694!!!" }), _jsx(Reservationbutton, { className: "btn-17", children: "\uC608\uC57D\uD558\uAE30 " })] }));
};
