import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "@/SCSS/header.scss";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import broom from "@/Components/Common/assets/broom.png";
import { Head } from "../frame/header";
import { ClientPath } from "./headerPaths";
import { PiPhoneOutgoingFill } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
import { BusinessBox, ChangeButton, HeaderBox, HeaderButton, HeaderButton1, HeaderLarge, HomeButton, ListBox, ManagerButton, Overlay, } from "./HeaderCommon";
import { theme } from "@/SCSS/typecss";
export const GlobalStyle = createGlobalStyle `
  @font-face {
    font-family: "PartialSansKR-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/PartialSansKR-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "BMkkubulimTTF-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/BMkkubulimTTF-Regular.woff2") format("woff2");
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`;
const Container = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "visible",
}) `
  display: flex;
  flex-direction: row;
  position: ${({ visible }) => (visible ? "fixed" : "absolute")};
  width: 100%;
`;
export const ClientHeader = ({ children }) => {
    const [isListVisible, setListVisible] = useState(false);
    const [activeButton, setActiveButton] = useState("");
    const nativeGate = useNavigate();
    const listRef = useRef(null);
    const handleImageClick = () => {
        setListVisible(!isListVisible);
    };
    const FuncClick = async (name, buttonName) => {
        setActiveButton(buttonName);
        nativeGate(name);
        setListVisible(false);
    };
    const handleManagerButtonClick = () => {
        const isConfirmed = window.confirm("관리자 페이지로 이동하시겠습니까?");
        setActiveButton("AdminPage");
        if (isConfirmed) {
            nativeGate(GateWayNumber.Manager + "/" + ManagerGateWayType.Main);
        }
        setListVisible(false);
    };
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
    return (_jsxs("div", { children: [_jsx(Head, { title: activeButton, description: "\uC740\uD558\uC218 \uD648\uCF00\uC5B4" }), _jsxs(HeaderBox, { children: [_jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx("img", { src: broom, alt: "logo", style: { width: "40px", height: "40px", marginRight: "0px" } }), _jsxs("div", { children: [_jsx(HeaderButton, { children: "\uACBD\uC0C1\uB3C4 \uCCAD\uC18C \uC804\uBB38\uC5C5\uCCB4" }), _jsx(HeaderButton1, { children: "\uC740\uD558\uC218 \uD648\uCF00\uC5B4" })] })] }), _jsx(HeaderLarge, { children: ClientPath && (_jsx("div", { style: {
                                display: "flex",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }, children: ClientPath.map((data) => (_jsx(ChangeButton, { isActive: activeButton === data.activename, onClick: () => FuncClick(data.paths, data.activename), children: data.buttonname }, data.activename))) })) }), _jsxs(BusinessBox, { children: [_jsx(PiPhoneOutgoingFill, { style: { color: "royalblue", width: "20px", height: "20px" } }), "010-6513-1458", _jsxs("div", { style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    borderLeft: "4px solid #813232",
                                    textAlign: "center",
                                    width: "40%",
                                }, children: [_jsx("span", { children: "24\uC2DC\uAC04 \uC0C1\uB2F4 \uC608\uC57D" }), _jsx("span", { style: { fontWeight: "bold" }, children: "\uC5B8\uC81C\uB4E0\uC9C0 \uD658\uC601" })] })] }), _jsxs("div", { style: { backgroundColor: "#E0F7FA" }, children: [_jsx(HomeButton, { children: _jsx(CgMenuGridR, { onClick: handleImageClick, style: {
                                        width: "50px",
                                        height: "50px",
                                        color: `${theme.colors.midnightIndigo}`,
                                    } }) }), _jsx(ManagerButton, { children: _jsx(MdSettings, { onClick: handleManagerButtonClick, style: {
                                        width: "50px",
                                        height: "50px",
                                        color: `${theme.colors.midnightIndigo}`,
                                    } }) })] })] }), _jsxs(Container, { visible: isListVisible, children: [_jsx(Overlay, { visible: isListVisible, onClick: () => setListVisible(false) }), _jsx("div", { style: { flex: 1 }, children: children }), _jsx(ListBox, { ref: listRef, visible: isListVisible, children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(ChangeButton, { isActive: activeButton === "관리자 로그인", onClick: handleManagerButtonClick, children: "\uAD00\uB9AC\uC790 \uB85C\uADF8\uC778" }) }), ClientPath &&
                                    ClientPath.map((data) => (_jsx("li", { children: _jsx(ChangeButton, { isActive: activeButton === data.activename, onClick: () => FuncClick(data.paths, data.activename), children: data.buttonname }) }, data.activename)))] }) })] })] }));
};
