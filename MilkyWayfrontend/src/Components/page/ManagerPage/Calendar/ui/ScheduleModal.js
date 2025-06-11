import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { RadioBox } from "@/Components/Common/ui/Radio/RadioBox";
import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { setAdministrationData } from "@/config/request/ReduxList/AdministrationReducer";
import { adminstrationSelect, } from "@/types/appointment/adminstrationType";
import { ModelWrapper, Overlay } from "@/types/Conmon/ModelWapperType";
import { SmallButton } from "@/SCSS/Fixed";
import { useSelector } from "react-redux";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import Swal from "sweetalert2";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import styled from "styled-components";
const BottomSheet = styled.div `
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 20px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
`;
const MobileOverlay = styled.div `
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
export const ScheduleModal = ({ setChange, date, setType, type, dispatch, fetchData, }) => {
    const AdministrationData = useSelector((state) => state.Administration.value);
    useEffect(() => {
        dispatch(setAdministrationData({
            adminstrationType: type,
            administrationDate: date ? date.toLocaleDateString("sv-SE") : "",
        }));
    }, [date, dispatch, type]);
    const handleSubmit = async () => {
        try {
            setTimeout(async () => {
                const res = await POST({
                    url: paths.Administration.basic.path,
                    data: AdministrationData,
                });
                if (res.resultType === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "일정 확정 완료",
                        text: "일정이 성공적으로 확정되었습니다.",
                        confirmButtonText: "확인",
                    });
                    setChange(false);
                    fetchData();
                }
            }, 1000);
        }
        catch (e) {
            Swal.fire({
                icon: "error",
                title: "일정 확정 실패",
                text: "일정 확정에 실패했습니다. 다시 시도해주세요." + e,
                confirmButtonText: "확인",
            });
        }
    };
    const width = useWindowWidth();
    const isMobile = width <= 600;
    const MobileBottomSheet = () => (_jsxs(_Fragment, { children: [_jsx(MobileOverlay, { onClick: () => setChange(false) }), _jsxs(BottomSheet, { children: [_jsx(InputTextBox, { name: "\uD604\uC7AC \uB0A0\uC9DC:", Value: date ? date.toLocaleDateString("sv-SE") : "" }), _jsx("br", {}), _jsx(RadioBox, { name: "\uC120\uD0DD \uC720\uD615", append: Array.from(adminstrationSelect), setValue: (value) => setType(value) }), _jsx("br", {}), _jsxs("div", { style: {
                            display: "flex",
                            gap: "12px",
                            justifyContent: "space-between",
                        }, children: [_jsx(SmallButton, { onClick: handleSubmit, children: "\uC77C\uC815 \uD655\uC815" }), _jsx(SmallButton, { onClick: () => setChange(false), children: "\uCDE8\uC18C" })] })] })] }));
    return (_jsx(_Fragment, { children: isMobile ? (_jsx(MobileBottomSheet, {})) : (_jsxs(_Fragment, { children: [_jsx(Overlay, {}), _jsxs(ModelWrapper, { "$istrue": "true", children: [_jsx(InputTextBox, { name: "현재 날짜 :", Value: date ? date.toLocaleDateString("sv-SE") : "" }), _jsx("br", {}), _jsx(RadioBox, { name: "\uC120\uD0DD \uC720\uD615", append: Array.from(adminstrationSelect), setValue: (value) => setType(value) }), _jsx("br", {}), _jsxs("div", { style: { display: "flex", justifyContent: "space-around" }, children: [_jsx(SmallButton, { onClick: handleSubmit, children: "\uC77C\uC815 \uD655\uC815" }), _jsx(SmallButton, { onClick: () => setChange(false), children: "\uCDE8\uC18C" })] })] })] })) }));
};
