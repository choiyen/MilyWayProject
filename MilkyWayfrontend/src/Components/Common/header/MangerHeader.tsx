import { useEffect, useRef, useState } from "react";
import "@/SCSS/header.scss";
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
import { Head } from "../frame/header";
import { ManagerLoginPath, ManagerPath } from "./headerPaths";
import {
  ChangeButton,
  HeaderBox,
  HeaderButton,
  HeaderButton1,
  HeaderLarge,
  HomeButton,
  ListBox,
  ManagerButton,
  Overlay,
} from "./HeaderCommon";
import { CgMenuGridR } from "react-icons/cg";
import styled from "styled-components";
import { IoHome } from "react-icons/io5";
import { theme } from "@/SCSS/typecss";
import Swal from "sweetalert2";

interface MangerHeaderProps {
  children?: React.ReactNode;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visible",
})<{ visible: boolean }>`
  display: flex;
  flex-direction: row;
  position: ${({ visible }) => (visible ? "fixed" : "absolute")};
  width: 100%;
`;

export const MangerHeader: React.FC<MangerHeaderProps> = ({ children }) => {
  const [isListVisible, setListVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("Login");
  const handleImageClick = () => {
    setListVisible(!isListVisible);
  };
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeButton === "Login" || activeButton === "Home") return; // activeButton이 "Login"일 때는 로그인 체크를 하지 않음
    LoginCheck()
      .then((res) => {
        if (res.resultType === "success") {
          Swal.fire({
            icon: "success",
            title: "로그인 성공",
            text: res.message,
            confirmButtonText: "확인",
          });
          dispatch(logout()); // 세션 상태를 false로 설정
          dispatch(
            setSession({
              isAuthenticated: true,
              userId: res.data.userid,
            })
          ); // 세션 상태를 true로 설정
        } else {
          Swal.fire({
            toast: true,
            position: "top",
            icon: "error",
            title: "로그인 후 이용해주세요.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              popup: "my-toast", // 커스텀 클래스 지정
            },
          });
          setActiveButton("Login");
          dispatch(logout()); // 세션 상태를 false로 설정
          dispatch(Sessionout()); // 세션 상태를 false로 설정
          navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
        }
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "error",
          title: "Error during login: " + error,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: "my-toast", // 커스텀 클래스 지정
          },
        });
        setActiveButton("Login");
        dispatch(logout()); // 세션 상태를 false로 설정
        dispatch(Sessionout()); // 세션 상태를 false로 설정
        navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
      }); // 로그인 체크
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setListVisible(false);
      }
    };

    if (isListVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isListVisible]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (buttonName == "Home") {
      handleHomeButtonClick();
    }
  };

  const handleHomeButtonClick = () => {
    const isConfirmed = window.confirm("메인 페이지로 이동하시겠습니까?");
    if (isConfirmed) {
      navigate(GateWayNumber.Client + "/" + ClientGateWayType.home); // 관리자 페이지 URL로 이동
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.value);

  const FuncClick = async (name: string, buttonName: string) => {
    try {
      setActiveButton(buttonName);
      await LoginCheck();
      navigate(name);
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: "로그인 후 이용해주세요." + error,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "my-toast", // 커스텀 클래스 지정
        },
      });
      setActiveButton("Login");
      dispatch(logout()); // 세션 상태를 false로 설정
      dispatch(Sessionout()); // 세션 상태를 false로 설정
      navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
    }
  };
  useEffect(() => {
    const LoginCheck = async () => {
      await POST({
        url: paths.Certification.check.path,
      }).then((res) => {
        console.log("LoginCheck Response:", res);
        dispatch(
          setSession({
            isAuthenticated: res.resultType === "success",
            userId: res.data ? res.data.userid : "",
          })
        ); // 세션 상태를 true로 설정
      });
    };

    LoginCheck();
  }, [activeButton]);

  const Logout = async () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      setActiveButton("Logout");
      await POST({
        url: paths.Certification.logout.path,
      }).then((res) => {
        if (res.resultType === "success") {
          Swal.fire({
            icon: "success",
            title: "로그아웃 성공",
            text: res.message,
            confirmButtonText: "확인",
          });
          dispatch(logout()); // 세션 상태를 false로 설정
          dispatch(Sessionout()); // 세션 상태를 false로 설정
          navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main); // 로그인 페이지로 이동
        } else {
          Swal.fire({
            icon: "error",
            title: "로그아웃 실패",
            text: res.message,
            confirmButtonText: "확인",
          });
          return;
        }
      });
    }
  };

  return (
    <div>
      <Head title={activeButton} description="은하수 홈케어" />
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
          {ManagerPath &&
            ManagerPath.map((value, index) => (
              <ChangeButton
                key={index}
                isActive={activeButton === value.activename}
                onClick={() => FuncClick(value.paths, value.activename)}
              >
                {value.buttonname}
              </ChangeButton>
            ))}
          {auth.isAuthenticated ? (
            <ChangeButton
              isActive={activeButton === "Logout"}
              onClick={() => Logout()}
            >
              Logout
            </ChangeButton>
          ) : (
            <ChangeButton
              isActive={activeButton === ManagerLoginPath.activename}
              onClick={() =>
                FuncClick(ManagerLoginPath.paths, ManagerLoginPath.activename)
              }
            >
              {ManagerLoginPath.buttonname}
            </ChangeButton>
          )}
        </HeaderLarge>
        <div style={{ backgroundColor: `${theme.colors.hazeRose}` }}>
          <HomeButton>
            <CgMenuGridR
              onClick={handleImageClick}
              style={{
                width: "50px",
                height: "50px",
                color: `${theme.colors.charcoalBlack}`,
              }} // 진한 틸
            />
          </HomeButton>
          <ManagerButton>
            <IoHome
              onClick={handleHomeButtonClick}
              style={{
                width: "50px",
                height: "50px",
                color: `${theme.colors.charcoalBlack}`,
              }}
            />
          </ManagerButton>
        </div>
      </HeaderBox>

      <Container visible={isListVisible}>
        <Overlay
          visible={isListVisible}
          onClick={() => setListVisible(false)}
        />
        <div style={{ flex: 1 }}>{children}</div>
        <ListBox ref={listRef} visible={isListVisible}>
          <ul>
            <li>
              <ChangeButton
                isActive={activeButton === "Home"}
                onClick={() => handleButtonClick("Home")}
              >
                Home
              </ChangeButton>
            </li>
            {ManagerPath &&
              ManagerPath.map((data) => (
                <li key={data.activename}>
                  <ChangeButton
                    isActive={activeButton === data.activename}
                    onClick={() => FuncClick(data.paths, data.activename)}
                  >
                    {data.buttonname}
                  </ChangeButton>
                </li>
              ))}
            <li>
              {auth.isAuthenticated ? (
                <ChangeButton
                  isActive={activeButton === "LogOut"}
                  onClick={() => Logout()}
                >
                  Logout
                </ChangeButton>
              ) : (
                <ChangeButton
                  isActive={activeButton === ManagerLoginPath.activename}
                  onClick={() =>
                    FuncClick(
                      ManagerLoginPath.paths,
                      ManagerLoginPath.activename
                    )
                  }
                >
                  {ManagerLoginPath.buttonname}
                </ChangeButton>
              )}
            </li>
          </ul>
        </ListBox>
      </Container>
    </div>
  );
};
