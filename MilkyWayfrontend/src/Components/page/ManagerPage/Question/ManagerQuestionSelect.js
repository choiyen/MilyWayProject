import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { PostQuestionALL } from "./api/util";
// 메인 wrapper
const MainWapper = styled.div `
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    width: 100vw;
    padding: 10px;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0px;
  }
`;
const MainBox = styled.div `
  width: 100%;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
`;
export const ManagerQuestionSelect = () => {
    const [QuestionDummys, SetQuestionDummy] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        PostQuestionALL().then((res) => {
            SetQuestionDummy(res.data);
        });
    }, []);
    const QuestionButtonClick = (path) => {
        navigate(path);
    };
    return (_jsx(MainBox, { children: _jsxs(MainWapper, { children: [_jsx(Fontname, { children: "Q & A \uAD00\uB9AC" }), _jsx("div", { className: "w-full px-4 overflow-x-auto py-10 hidden sm:block", children: _jsx("div", { className: "min-w-full flex justify-center", children: _jsxs("table", { className: "table-auto w-full sm:min-w-[600px] border-collapse bg-white shadow-lg rounded-lg overflow-hidden", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-300", children: [_jsx("th", { className: "border px-4 py-2 w-1/3 rounded-tl-lg", children: "\uC81C\uBAA9" }), _jsx("th", { className: "border px-4 py-2 w-2/3 rounded-tr-lg", children: "\uB0B4\uC6A9" })] }) }), _jsx("tbody", { children: QuestionDummys && QuestionDummys.length > 0 ? (QuestionDummys.map((data, idx) => {
                                        const isLast = QuestionDummys.length - 1 === idx;
                                        return (_jsxs("tr", { className: "hover:bg-slate-100", children: [_jsx("td", { className: `border px-4 py-2 align-top break-words whitespace-normal max-w-xs ${isLast ? "rounded-bl-lg" : ""}`, children: data.exceptionQA }), _jsx("td", { className: `border px-4 py-2 align-top break-words whitespace-normal max-w-md ${isLast ? "rounded-br-lg" : ""}`, title: data.expectedComment, children: data.expectedComment })] }, data.id));
                                    })) : (_jsx("tr", { children: _jsx("td", { colSpan: 2, className: "text-center py-10 text-blue-600 font-bold text-sm sm:text-lg border-t", children: "\uACE0\uAC1D \uC608\uC0C1 Q&A\uB294 \uB4F1\uB85D\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }) })) })] }) }) }), _jsx("div", { className: "w-full px-4 py-10 sm:hidden flex flex-col gap-4", children: QuestionDummys && QuestionDummys.length > 0 ? (QuestionDummys.map((data) => (_jsx("div", { className: "bg-white rounded-lg shadow-md p-4 border", children: _jsx("table", { className: "w-full text-sm table-fixed", children: _jsxs("tbody", { children: [_jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left text-blue-600 font-semibold pr-2 w-16 align-top", children: "\uC81C\uBAA9" }), _jsx("td", { className: "break-words text-gray-800", children: data.exceptionQA })] }), _jsxs("tr", { children: [_jsx("th", { className: "text-left text-blue-600 font-semibold pr-2 align-top", children: "\uB0B4\uC6A9" }), _jsx("td", { className: "break-words whitespace-pre-wrap text-gray-700", children: data.expectedComment })] })] }) }) }, data.id)))) : (_jsx("p", { className: "text-blue-600 font-bold text-sm text-center", children: "\uACE0\uAC1D \uC608\uC0C1 Q&A\uB294 \uB4F1\uB85D\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." })) }), _jsx(LastButton, { className: "mt-6 w-full max-w-xs sm:max-w-md", onClick: () => QuestionButtonClick(GateWayNumber.Manager + "/" + ManagerGateWayType.Question), children: "\uC608\uC0C1 \uC9C8\uBB38 \uCD94\uAC00" })] }) }));
};
