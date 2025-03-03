import { useState } from "react";
import styled from "styled-components";
import { MangerHeader } from "../../Common/MangerHeader";
import { Footer } from "../../Common/Footer";

// Wrapper styled component
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 20px;
  background-color: #f0f0f0;
`;

const MangerPage = styled.div`
  width: 100%;
  max-width: 600px;
  height: 500px;
  background-color: #f7f5dc;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1044px) {
    width: 90%; /* Make it smaller on mobile */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }
`;

const MangerInput = styled.input`
  width: 100%;
  max-width: 500px;
  height: 50px;
  margin-top: 25px;
  margin-left: 20px;
  border: 1px solid #e195ab;
  border-radius: 10px;
  display: inline-block;

  @media (max-width: 1044px) {
    margin-top: 25px;
    margin-left: 0px;
    margin-bottom: 10px;
    width: 100%; /* Full width on smaller screens */
    max-width: 400px;
    height: 50px;
  }
`;

const MangerButton = styled.button`
  width: 100%;
  max-width: 250px;
  height: 50px;
  margin-top: 70px;
  border: 1px solid #e195ab;
  border-radius: 10px;
  background-color: #e195ab;
  color: white;
  display: inline-block;
  font-size: 20px;

  &:hover {
    background-color: #461baa;
    color: white;
  }
`;

export const MaingerMain = () => {
  const [IdState, setIdState] = useState("");
  const [PasswordState, setPasswordState] = useState("");

  return (
    <div>
      <MangerHeader />
      <Wrapper>
        <MangerPage>
          <h1>관리자 로그인</h1>
          <MangerInput
            type="text"
            placeholder="아이디를 입력해주세요"
            value={IdState}
            onChange={(e) => setIdState(e.target.value)}
          />
          <MangerInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={PasswordState}
            onChange={(e) => setPasswordState(e.target.value)}
          />
          <MangerButton>로그인</MangerButton>
        </MangerPage>
      </Wrapper>
      <Footer />
    </div>
  );
};
