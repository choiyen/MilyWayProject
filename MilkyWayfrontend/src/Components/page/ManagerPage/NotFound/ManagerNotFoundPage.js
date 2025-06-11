import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
// 스타일 설정
const NotFoundWapper = styled.div `
  height: 70vh; /* 화면의 70% 크기로 설정 */
  background-color: #f8f9fa; /* 배경색을 밝은 색으로 설정 */
  display: flex; /* Flexbox로 설정 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;
const NotFoundContent = styled.div `
  text-align: center;
  padding: 20px;
`;
const NotFoundMessage = styled.h1 `
  font-size: 4rem;
  font-weight: 700;
  color: #343a40; /* 어두운 색으로 텍스트 강조 */
  margin-bottom: 20px;
`;
const NotFoundDescription = styled.p `
  font-size: 1.5rem;
  color: #6c757d; /* 조금 더 연한 텍스트 색 */
  margin-bottom: 30px;
`;
const NotFoundButton = styled.a `
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  background-color: #007bff; /* 파란색 버튼 */
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* 버튼 호버 시 색상 변경 */
  }
`;
export const ManagerNotFoundPage = () => {
    return (_jsx(_Fragment, { children: _jsx(NotFoundWapper, { children: _jsxs(NotFoundContent, { children: [_jsx(NotFoundMessage, { children: "404 - Not Found" }), _jsx(NotFoundDescription, { children: "\uC8C4\uC1A1\uD569\uB2C8\uB2E4! \uC694\uCCAD\uD558\uC2E0 \uD398\uC774\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), _jsx(NotFoundButton, { href: "/", children: "\uD648\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" })] }) }) }));
};
