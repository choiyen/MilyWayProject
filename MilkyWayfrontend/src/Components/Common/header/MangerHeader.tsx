import { useEffect, useState } from "react";
import styled from "styled-components";
import "@/SCSS/header.scss";
import homeImage from "@/Components/Common/assets/home.png";
import hamburger from "@/Components/Common/assets/hamburger.png";
import broom from "@/Components/Common/assets/broom.png";

import { useNavigate } from "react-router-dom";
import {
  ClientGateWayType,
  GateWayNumber,
  ManagerGateWayType,
} from "@/types/GateWay/GateWayType";
import { logout } from "@/config/request/ReduxList/userlogin";
import { LoginCheck } from "./api/Logincheck";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/config/reduxstore";
import {
  Sessionout,
  setSession,
} from "@/config/request/ReduxList/useauthSlice";
import { POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
// Header styles
const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  color: #000000;
  background-color: #fffeee;
  display: flex;
  justify-content: space-between; /* Ensure space between left and right */
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 1044px) {
    height: 60px;
    padding: 0 10px;
  }
`;

const HeaderButton = styled.div`
  @font-face {
    font-family: "PartialSansKR-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/PartialSansKR-Regular.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "PartialSansKR-Regular";

  align-items: left;
  color: #000000;
  background-color: #fffeee;
  margin-top: 20px;

  @media (max-width: 1044px) {
    font-size: 12px;
  }
`;

const HeaderButton1 = styled.div`
  @font-face {
    font-family: "BMkkubulimTTF-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/BMkkubulimTTF-Regular.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "BMkkubulimTTF-Regular";
  align-items: left;
  color: #000000;
  background-color: #fffeee;
  font-size: 20px;
  text-align: center;
  padding-top: 4px;
  color: #e195ab;
  padding: 0px;
  margin: 0px;

  @media (max-width: 1044px) {
    font-size: 8px;
  }
`;

const ChangeButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  border: none;
  background-color: #fffeee;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  margin-left: 10px;
  font-size: 16px;
  font-family: "EliceDigitalBaeum-Bd";

  @font-face {
    font-family: "EliceDigitalBaeum-Bd";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    color : #f6f6fa;
    background-color: rgb(60, 32, 143); /* Add a background color to the active button */
    font-weight: bold;
    `}

  /* Mouse hover effect */
&:hover {
    background-color: #f1f1f1; /* Change the background color on hover */
    cursor: pointer; /* Change the cursor to a pointer */
    border-bottom: 2px double #000000;
    color: black;
  }
`;

const HomeButton = styled.img`
  align-items: right;
  color: #000000;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  padding-top: 4vw;
  width: 50px;
  height: 50px;
  padding: 10px;
  display: none;

  @media (max-width: 1044px) {
    width: 40px;
    height: 40px;
    display: block;
    margin-left: auto; /* Push the hamburger icon to the far right */
    margin-right: 0; /* Ensure no extra margin on the right */
  }
`;

const MangerButton = styled.img`
  align-items: right;
  color: #000000;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  padding-top: 4vw;
  width: 50px;
  height: 50px;
  padding: 10px;
  display: none;
  display: block;

  @media (max-width: 1044px) {
    width: 40px;
    height: 40px;
    display: none;
  }
`;

const ListBox = styled.div`
  width: 15vw;
  height: 100vh;
  background-color: #fffeee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;

  @media (max-width: 1044px) {
    width: 100%;
    height: auto;
  }
`;

const HeaderSmall = styled.div`
  display: none; /* Default state: hidden on large screens */

  @media (max-width: 1044px) {
    display: flex;
    justify-content: flex-end; /* Align elements to the right on small screens */
  }
`;

const HeaderLarge = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  @media (max-width: 1044px) {
    display: none; /* Hide on small screens */
  }
`;

export const MangerHeader = () => {
  const [isListVisible, setListVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("Login");
  const handleImageClick = () => {
    setListVisible(!isListVisible);
  };

  useEffect(() => {
    if (activeButton === "Login" || activeButton === "Home") return; // activeButton이 "Login"일 때는 로그인 체크를 하지 않음
    LoginCheck()
      .then((res) => {
        if (res.resultType === "success") {
          console.log("로그인 성공:", res);
          dispatch(logout()); // 세션 상태를 false로 설정
          dispatch(
            setSession({
              isAuthenticated: true,
              userId: res.data.userid,
            })
          ); // 세션 상태를 true로 설정
        } else {
          console.log("로그인 실패:", res.message);
          alert("로그인 후 이용해주세요.");
          setActiveButton("Login");
          dispatch(logout()); // 세션 상태를 false로 설정
          dispatch(Sessionout()); // 세션 상태를 false로 설정
          navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("로그인 후 이용해주세요.");
        setActiveButton("Login");
        dispatch(logout()); // 세션 상태를 false로 설정
        dispatch(Sessionout()); // 세션 상태를 false로 설정
        navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
      }); // 로그인 체크
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (buttonName == "Home") {
      handleHomeButtonClick();
    }
  };

  const handleHomeButtonClick = () => {
    const isConfirmed = window.confirm("메인 페이지로 이동하시겠습니까?");
    if (isConfirmed) {
      window.location.href =
        GateWayNumber.Client + "/" + ClientGateWayType.home; // 관리자 페이지 URL로 이동
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.value);

  const FuncClick = async (name: string, buttonName: string) => {
    try {
      setActiveButton(buttonName);
      await LoginCheck();
      navigate(GateWayNumber.Manager + "/" + name);
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 후 이용해주세요.");
      setActiveButton("Login");
      dispatch(logout()); // 세션 상태를 false로 설정
      dispatch(Sessionout()); // 세션 상태를 false로 설정
      navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
    }
  };

  const Logout = async () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      setActiveButton("Logout");
      await POST({
        url: paths.Certification.logout.path,
      }).then((res) => {
        if (res.resultType === "success") {
          console.log("로그아웃 성공:", res);
          alert("로그아웃 되었습니다.");
          dispatch(logout()); // 세션 상태를 false로 설정
          dispatch(Sessionout()); // 세션 상태를 false로 설정
          navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
        } else {
          console.log("로그아웃 실패:", res.message);
          alert("로그아웃에 실패했습니다.");
          return;
        }
      });
    }
  };

  return (
    <div>
      <HeaderBox>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={broom}
            alt="logo"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "0px",
            }}
          />
          <div>
            <HeaderButton>경상도 청소 전문업체</HeaderButton>
            <HeaderButton1>은하수 홈케어</HeaderButton1>
          </div>
        </div>
        <HeaderLarge>
          <ChangeButton
            $isActive={activeButton === "ReservationMangeMent"}
            onClick={() =>
              FuncClick(ManagerGateWayType.Join, "ReservationMangeMent")
            }
          >
            예약 관리
          </ChangeButton>
          <ChangeButton
            $isActive={activeButton === "QuestionMangeMent"}
            onClick={() =>
              FuncClick(ManagerGateWayType.QuestionSelect, "QuestionMangeMent")
            }
          >
            Q & A 관리
          </ChangeButton>
          <ChangeButton
            $isActive={activeButton === "ReviewMangeMent"}
            onClick={() =>
              FuncClick(ManagerGateWayType.AdviceSelect, "ReviewMangeMent")
            }
          >
            후기 관리
          </ChangeButton>
          <ChangeButton
            $isActive={activeButton === "ScheduleMangeMent"}
            onClick={() =>
              FuncClick(ManagerGateWayType.Calendar, "ScheduleMangeMent")
            }
          >
            일정 관리
          </ChangeButton>
          {auth.isAuthenticated ? (
            <ChangeButton
              $isActive={activeButton === "Logout"}
              onClick={() => Logout()}
            >
              Logout
            </ChangeButton>
          ) : (
            <ChangeButton
              $isActive={activeButton === "Login"}
              onClick={() => FuncClick(ManagerGateWayType.Main, "Login")}
            >
              Login
            </ChangeButton>
          )}
        </HeaderLarge>
        <div style={{ backgroundColor: "#F4DFB6" }}>
          <HomeButton
            src={hamburger}
            onClick={handleImageClick}
            style={{ width: "50px", height: "50px" }}
          />
          <MangerButton
            src={homeImage}
            onClick={handleHomeButtonClick} // 관리자 버튼 클릭 시 확인
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </HeaderBox>

      {/* Conditional rendering based on screen size */}
      <HeaderSmall>
        {isListVisible && (
          <ListBox>
            <ul style={{ width: "100%" }}>
              <li>
                <ChangeButton
                  $isActive={activeButton === "Home"}
                  onClick={() => handleButtonClick("Home")}
                >
                  Home
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  $isActive={activeButton === "ReservationMangeMent"}
                  onClick={() =>
                    FuncClick(ManagerGateWayType.Join, "ReservationMangeMent")
                  }
                >
                  예약 관리
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  $isActive={activeButton === "QuestionMangeMent"}
                  onClick={() =>
                    FuncClick(
                      ManagerGateWayType.QuestionSelect,
                      "QuestionMangeMent"
                    )
                  }
                >
                  Q & A 관리
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  $isActive={activeButton === "ReviewMangeMent"}
                  onClick={() =>
                    FuncClick(
                      ManagerGateWayType.AdviceSelect,
                      "ReviewMangeMent"
                    )
                  }
                >
                  후기 관리
                </ChangeButton>
              </li>
              <li>
                <ChangeButton
                  $isActive={activeButton === "ScheduleMangeMent"}
                  onClick={() =>
                    FuncClick(ManagerGateWayType.Calendar, "ScheduleMangeMent")
                  }
                >
                  일정 관리
                </ChangeButton>
              </li>
              <li>
                {auth.isAuthenticated ? (
                  <ChangeButton
                    $isActive={activeButton === "LogOut"}
                    onClick={() => Logout()}
                  >
                    Logout
                  </ChangeButton>
                ) : (
                  <ChangeButton
                    $isActive={activeButton === "Login"}
                    onClick={() => FuncClick(ManagerGateWayType.Main, "Login")}
                  >
                    Login
                  </ChangeButton>
                )}
              </li>
            </ul>
          </ListBox>
        )}
      </HeaderSmall>
    </div>
  );
};
