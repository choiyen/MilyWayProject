import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
const RadioBoxContainer = styled.div `
  display: flex;
  gap: 10px;
  width: 500px;
  margin-top: 20px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const RadioGroup = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;
const Label = styled.label `
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  color: ${(props) => (props.$isred === "true" ? "red" : "black")};
  display: flex;
  align-items: center;
  gap: 6px;

  @media screen and (max-width: 600px) {
    width: 35%; /* 2개씩 한 줄에 배치 */
    box-sizing: border-box;
  }

  @media screen and (max-width: 780px) {
    font-size: 15px;
    line-height: 16px;
  }
`;
// 컴포넌트
export const RadioBox = ({ name, append, setValue }) => {
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (_jsxs(RadioBoxContainer, { children: [_jsxs(Label, { children: [name, ":"] }), _jsx(RadioGroup, { children: append.map((item) => (_jsxs(Label, { "$isred": `${item === "업무"}`, children: [_jsx("input", { type: "radio", name: "example", value: item, onChange: handleChange }), item] }, item))) })] }));
};
