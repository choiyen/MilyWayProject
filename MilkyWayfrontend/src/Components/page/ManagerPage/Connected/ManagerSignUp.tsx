import { useState } from "react";
import styled from "styled-components";
// 예시: MangerHeader를 named import 방식으로 가져오기

import { useDispatch } from "react-redux";
import { Fontname } from "@/SCSS/Fixed";
import { setSignData } from "@/config/request/ReduxList/usersign";

// Wrapper styled component
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
  padding: 20px;
  background-color: #f0f0f0;
`;

const Warning = styled.div`
  color: red;
  font-size: 14px;
  font-weight: bold;
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
  margin-top: 20px;
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

export const ManagerSignUp = () => {
  const dispatch = useDispatch();

  const [IdState, setIdState] = useState("");
  const [PasswordState, setPasswordState] = useState("");
  const [emailState, setEmailState] = useState("");

  const handleSignup = () => {
    dispatch(
      setSignData({
        userID: IdState,
        Password: PasswordState,
        email: emailState,
      })
    );
  };
  return (
    <div>
      <Wrapper>
        <MangerPage>
          <Fontname>관리자 회원가입</Fontname>
          <Warning>
            주의!! 기존에 가입된 관리자가 존재 할 경우, 회원가입이 불가능합니다.
          </Warning>
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
          <MangerInput
            type="email"
            placeholder="이메일을 입력해주세요"
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
          />
          <MangerButton onClick={handleSignup}>회원가입</MangerButton>
        </MangerPage>
      </Wrapper>
    </div>
  );
};
