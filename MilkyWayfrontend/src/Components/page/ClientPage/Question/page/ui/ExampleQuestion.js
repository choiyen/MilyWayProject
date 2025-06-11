import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import styled from "styled-components";
// Q&A 본문 박스
const QuestionBox = styled.div `
  width: 100%;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b3e5fc; /* 연한 하늘 */
  padding: 30px 20px;
`;
// 타이틀 (아이콘 포함)
const QuestionTitle = styled.div `
  display: flex;
  align-items: center;
  font-size: 38px;
  font-weight: 700;
  color: whitesmoke;
  margin-bottom: 42px;
  margin-top: 50px;
  gap: 10px;

  @media screen and (max-width: 600px) {
    font-size: 30px;
  }
`;
const QuestionBoxTitle = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "visible", // DOM으로 전달 막기
}) `
  display: ${(props) => (props.visible ? "flex" : "none")};
  background-color: #cbe9f7;
  font-size: 18px;
  width: 50vw;
  padding: 50px;
  border-radius: 0px 0px 10px 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    padding: 25px;
    font-size: 12px;
    font-weight: 400;
  }
`;
const QuestionText = styled.div `
  font-size: 20px;
  font-weight: bold;
  background-color: #e0f7fa;
  border-radius: 10px 10px 0px 0px;
  padding: 10px;
  width: 50vw;

  @media screen and (max-width: 600px) {
    font-size: 15px;
    font-weight: 300;
    padding: 5px;
    text-align: center;
  }
`;
export const ExampleQuestion = ({ Question }) => {
    const [openItems, setOpenItems] = useState({});
    const handleToggle = (title) => {
        setOpenItems((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };
    return (_jsx(_Fragment, { children: _jsxs(QuestionBox, { children: [_jsx(QuestionTitle, { children: "Question & Answer" }), Question &&
                    Question.map((item, index) => (_jsxs("div", { style: { marginBottom: "20px" }, children: [_jsx(QuestionText, { onClick: () => handleToggle(item.exceptionQA), children: _jsx("strong", { children: item.exceptionQA }) }), _jsx(QuestionBoxTitle, { visible: !!openItems[item.exceptionQA], children: _jsx("p", { children: item.expectedComment }) })] }, index)))] }) }));
};
