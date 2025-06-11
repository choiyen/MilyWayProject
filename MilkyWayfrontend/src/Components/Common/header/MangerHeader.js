import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import "@/SCSS/header.scss";
import broom from "@/Components/Common/assets/broom.png";
import { useNavigate } from "react-router-dom";
import { ClientGateWayType, GateWayNumber, ManagerGateWayType, } from "@/types/GateWay/GateWayType";
import { logout } from "@/config/request/ReduxList/userlogin";
import { LoginCheck } from "./api/Logincheck";
import { useDispatch, useSelector } from "react-redux";
import { Sessionout, setSession, } from "@/config/request/ReduxList/useauthSlice";
import { POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { Head } from "../frame/header";
import { ManagerLoginPath, ManagerPath } from "./headerPaths";
import { ChangeButton, HeaderBox, HeaderButton, HeaderButton1, HeaderLarge, HomeButton, ListBox, ManagerButton, Overlay, } from "./HeaderCommon";
import { CgMenuGridR } from "react-icons/cg";
import styled from "styled-components";
import { IoHome } from "react-icons/io5";
import { theme } from "@/SCSS/typecss";
import Swal from "sweetalert2";
const Container = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "visible",
}) `
  display: flex;
  flex-direction: row;
  position: ${({ visible }) => (visible ? "fixed" : "absolute")};
  width: 100%;
`;
export const MangerHeader = ({ children }) => {
    const [isListVisible, setListVisible] = useState(false);
    const [activeButton, setActiveButton] = useState("Login");
    const handleImageClick = () => {
        setListVisible(!isListVisible);
    };
    const listRef = useRef(null);
    useEffect(() => {
        if (activeButton === "Login" || activeButton === "Home")
            return; // activeButton이 "Login"일 때는 로그인 체크를 하지 않음
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
                dispatch(setSession({
                    isAuthenticated: true,
                    userId: res.data.userid,
                })); // 세션 상태를 true로 설정
            }
            else {
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
        const handleClickOutside = (event) => {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setListVisible(false);
            }
        };
        if (isListVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isListVisible]);
    const handleButtonClick = (buttonName) => {
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
    const auth = useSelector((state) => state.auth.value);
    const FuncClick = async (name, buttonName) => {
        try {
            setActiveButton(buttonName);
            await LoginCheck();
            navigate(name);
        }
        catch (error) {
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
                dispatch(setSession({
                    isAuthenticated: res.resultType === "success",
                    userId: res.data ? res.data.userid : "",
                })); // 세션 상태를 true로 설정
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
                }
                else {
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
    return (_jsxs("div", { children: [_jsx(Head, { title: activeButton, description: "\uC740\uD558\uC218 \uD648\uCF00\uC5B4" }), _jsxs(HeaderBox, { children: [_jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx("img", { src: broom, alt: "logo", style: {
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "0px",
                                } }), _jsxs("div", { children: [_jsx(HeaderButton, { children: "\uACBD\uC0C1\uB3C4 \uCCAD\uC18C \uC804\uBB38\uC5C5\uCCB4" }), _jsx(HeaderButton1, { children: "\uC740\uD558\uC218 \uD648\uCF00\uC5B4" })] })] }), _jsxs(HeaderLarge, { children: [ManagerPath &&
                                ManagerPath.map((value, index) => (_jsx(ChangeButton, { isActive: activeButton === value.activename, onClick: () => FuncClick(value.paths, value.activename), children: value.buttonname }, index))), auth.isAuthenticated ? (_jsx(ChangeButton, { isActive: activeButton === "Logout", onClick: () => Logout(), children: "Logout" })) : (_jsx(ChangeButton, { isActive: activeButton === ManagerLoginPath.activename, onClick: () => FuncClick(ManagerLoginPath.paths, ManagerLoginPath.activename), children: ManagerLoginPath.buttonname }))] }), _jsxs("div", { style: { backgroundColor: `${theme.colors.hazeRose}` }, children: [_jsx(HomeButton, { children: _jsx(CgMenuGridR, { onClick: handleImageClick, style: {
                                        width: "50px",
                                        height: "50px",
                                        color: `${theme.colors.charcoalBlack}`,
                                    } }) }), _jsx(ManagerButton, { children: _jsx(IoHome, { onClick: handleHomeButtonClick, style: {
                                        width: "50px",
                                        height: "50px",
                                        color: `${theme.colors.charcoalBlack}`,
                                    } }) })] })] }), _jsxs(Container, { visible: isListVisible, children: [_jsx(Overlay, { visible: isListVisible, onClick: () => setListVisible(false) }), _jsx("div", { style: { flex: 1 }, children: children }), _jsx(ListBox, { ref: listRef, visible: isListVisible, children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(ChangeButton, { isActive: activeButton === "Home", onClick: () => handleButtonClick("Home"), children: "Home" }) }), ManagerPath &&
                                    ManagerPath.map((data) => (_jsx("li", { children: _jsx(ChangeButton, { isActive: activeButton === data.activename, onClick: () => FuncClick(data.paths, data.activename), children: data.buttonname }) }, data.activename))), _jsx("li", { children: auth.isAuthenticated ? (_jsx(ChangeButton, { isActive: activeButton === "LogOut", onClick: () => Logout(), children: "Logout" })) : (_jsx(ChangeButton, { isActive: activeButton === ManagerLoginPath.activename, onClick: () => FuncClick(ManagerLoginPath.paths, ManagerLoginPath.activename), children: ManagerLoginPath.buttonname })) })] }) })] })] }));
};
