import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import styled from "styled-components";
// 예시: MangerHeader를 named import 방식으로 가져오기
import { useDispatch, useSelector } from "react-redux";
import { Fontname } from "@/SCSS/Fixed";
import { setSignData } from "@/config/request/ReduxList/usersign";
import { POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { LoginCheck } from "@/Components/Common/header/api/Logincheck";
import Swal from "sweetalert2";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
// Wrapper styled component
const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // ✅ 화면 전체 높이 확보
  padding: 20px;
  background-color: #f0f0f0;
  box-sizing: border-box;
`;
const Warning = styled.div `
  color: red;
  margin-top: 20px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
`;
const MangerPage = styled.div `
  width: 100%;
  max-width: 600px;
  height: 500px;
  background-color: #f3f4f6;
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
const MangerInput = styled.input `
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
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 300px; /* Adjust max-width for smaller screens */
    margin-top: 15px; /* Adjust margin for smaller screens */
    margin-left: 0px; /* Remove left margin on smaller screens */
  }
`;
const MangerButton = styled.button `
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

  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 300px;
    margin-top: 15px;
    margin-left: 0px;
    height: 40px; /* Adjust height for smaller screens */
  }
`;
export const ManagerSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SignUPData = useSelector((state) => state.usersign.value);
    useEffect(() => {
        LoginCheck();
    }, []);
    const handleSignup = async () => {
        try {
            await POST({
                url: paths.Certification.basic.path,
                data: {
                    userId: SignUPData.userId,
                    password: SignUPData.password,
                    email: SignUPData.email,
                },
            });
            Swal.fire({
                icon: "success",
                title: "회원가입 성공",
                text: "관리자 회원가입이 완료되었습니다. 추가 가입은 불가능합니다.",
                confirmButtonText: "확인",
            });
            navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main);
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "회원가입 실패",
                text: "이미 가입된 관리자가 존재합니다. 추가 가입은 불가능합니다. " + error,
                confirmButtonText: "확인",
            });
        }
    };
    const width = useWindowWidth();
    const isMobile = width <= 600;
    return (_jsx("div", { children: _jsx(Wrapper, { children: _jsxs(MangerPage, { children: [_jsx(Fontname, { children: "\uAD00\uB9AC\uC790 \uD68C\uC6D0\uAC00\uC785" }), _jsx(MangerInput, { type: "text", placeholder: "\uC544\uC774\uB514\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", value: SignUPData.userId, onChange: (e) => dispatch(setSignData({ ...SignUPData, userId: e.target.value })) }), _jsx(MangerInput, { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", value: SignUPData.password, onChange: (e) => dispatch(setSignData({ ...SignUPData, password: e.target.value })) }), _jsx(MangerInput, { type: "email", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", value: SignUPData.email, onChange: (e) => dispatch(setSignData({ ...SignUPData, email: e.target.value })) }), _jsx(MangerButton, { onClick: handleSignup, children: "\uD68C\uC6D0\uAC00\uC785" }), _jsx(Warning, { children: isMobile
                            ? "⚠️ 서버 관리자는 하나만 존재함"
                            : "주의!! 기존에 가입된 관리자가 존재 할 경우, 회원가입이 불가능합니다." })] }) }) }));
};
