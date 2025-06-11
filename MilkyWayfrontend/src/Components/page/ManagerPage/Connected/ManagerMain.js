import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
// 예시: MangerHeader를 named import 방식으로 가져오기
import { Fontname } from "@/SCSS/Fixed";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { setSession } from "@/config/request/ReduxList/useauthSlice";
import { checkSession } from "@/config/request/axios/util";
import { login } from "@/config/request/ReduxList/userlogin";
import { theme } from "@/SCSS/typecss";
import { toast } from "react-toastify";
import { SiginButton } from "./Smallcomponents/siginbutton";
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
const MangerPage = styled.div `
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;

  max-width: 800px;
  min-height: 500px; /* ✅ 고정 높이 대신 최소 높이로 */
  background-color: #f3f4f6;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1044px) {
    margin-bottom: 80px;
    padding: 20px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    min-height: auto; /* 모바일은 내용에 따라 늘어남 */
    padding: 20px;
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
    height: 40px;
  }

  @media screen and (max-width: 800px) {
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
  margin-top: 70px;
  border: 1px solid ${theme.colors.cloudGrey};
  border-radius: 10px;
  background-color: ${theme.colors.auroraBlue};
  color: white;
  display: inline-block;
  font-size: 20px;

  &:hover {
    background-color: #461baa;
    color: white;
  }

  @media (max-width: 1044px) {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    max-width: 400px;
  }
`;
export const ManagerMain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LoginSelector = useSelector((state) => state.userlogin.value);
    const handleLogin = async () => {
        await POST({
            url: paths.Certification.login.path,
            data: {
                userId: LoginSelector.userId,
                password: LoginSelector.password,
            },
        })
            .then((res) => {
            if (res !== undefined) {
                toast.success("로그인에 성공했습니다.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                checkSession();
                dispatch(setSession({ userId: res.userId, isAuthenticated: true })); // Redux에 저장
                navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Join); // 페이지 이동
            }
            else {
                toast.error("로그인에 실패했습니다. 서버에 오류가 존재합니다.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
            .catch((error) => {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };
    // useEffect(() => {
    //   LoginCheck();
    // }, []);
    return (_jsx(_Fragment, { children: _jsx(Wrapper, { children: _jsxs(MangerPage, { children: [_jsx(Fontname, { children: "\uAD00\uB9AC\uC790 \uB85C\uADF8\uC778" }), _jsx(MangerInput, { type: "text", placeholder: "\uC544\uC774\uB514\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", value: LoginSelector.userId, onChange: (e) => dispatch(login({ ...LoginSelector, userId: e.target.value })) }), _jsx(MangerInput, { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694", value: LoginSelector.password, onChange: (e) => dispatch(login({ ...LoginSelector, password: e.target.value })) }), _jsx(MangerButton, { onClick: handleLogin, children: "\uB85C\uADF8\uC778" }), _jsx(SiginButton, {})] }) }) }));
};
