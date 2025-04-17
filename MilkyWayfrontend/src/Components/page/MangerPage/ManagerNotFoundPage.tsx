import { Footer } from "@/Components/Common/Footer";
import { FixedManagerHeader } from "@/SCSS/Fixed";
import styled from "styled-components";

// 스타일 설정
const NotFoundWapper = styled.div`
  height: 70vh; /* 화면의 70% 크기로 설정 */
  background-color: #f8f9fa; /* 배경색을 밝은 색으로 설정 */
  display: flex; /* Flexbox로 설정 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const NotFoundContent = styled.div`
  text-align: center;
  padding: 20px;
`;

const NotFoundMessage = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #343a40; /* 어두운 색으로 텍스트 강조 */
  margin-bottom: 20px;
`;

const NotFoundDescription = styled.p`
  font-size: 1.5rem;
  color: #6c757d; /* 조금 더 연한 텍스트 색 */
  margin-bottom: 30px;
`;

const NotFoundButton = styled.a`
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
  return (
    <>
      <FixedManagerHeader />
      <NotFoundWapper>
        <NotFoundContent>
          <NotFoundMessage>404 - Not Found</NotFoundMessage>
          <NotFoundDescription>
            죄송합니다! 요청하신 페이지를 찾을 수 없습니다.
          </NotFoundDescription>
          <NotFoundButton href="/">홈으로 돌아가기</NotFoundButton>
        </NotFoundContent>
      </NotFoundWapper>
      <Footer />
    </>
  );
};
