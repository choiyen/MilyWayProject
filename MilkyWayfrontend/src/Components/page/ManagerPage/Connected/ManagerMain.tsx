import styled from "styled-components";
// 예시: MangerHeader를 named import 방식으로 가져오기
import { Fontname } from "@/SCSS/Fixed";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { setSession } from "@/config/request/ReduxList/useauthSlice";
import { checkSession } from "@/config/request/axios/util";
import { RootState } from "@/config/reduxstore";
import { login } from "@/config/request/ReduxList/userlogin";

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

export const ManagerMain = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const LoginSelector = useSelector(
    (state: RootState) => state.userlogin.value
  );

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
          console.log("로그인 성공:", res);
          checkSession();
          dispatch(setSession({ userId: res.userId, isAuthenticated: true })); // Redux에 저장
          navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Join); // 페이지 이동
        } else {
          console.log("로그인 실패, 서버에 오류가 존재합니다.");
        }
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다.");
      });
  };

  // useEffect(() => {
  //   LoginCheck();
  // }, []);

  return (
    <div>
      <Wrapper>
        <MangerPage>
          <Fontname>관리자 로그인</Fontname>
          <MangerInput
            type="text"
            placeholder="아이디를 입력해주세요"
            value={LoginSelector.userId}
            onChange={(e) =>
              dispatch(login({ ...LoginSelector, userId: e.target.value }))
            }
          />
          <MangerInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={LoginSelector.password}
            onChange={(e) =>
              dispatch(login({ ...LoginSelector, password: e.target.value }))
            }
          />
          <MangerButton onClick={handleLogin}>로그인</MangerButton>
          <Link
            style={{ marginTop: "30px" }}
            to={GateWayNumber.Manager + "/" + ManagerGateWayType.SignUp}
          >
            아직 서버를 관리하는 사람이 없나요? 없다면 눌러주세요
          </Link>
        </MangerPage>
      </Wrapper>
    </div>
  );
};
