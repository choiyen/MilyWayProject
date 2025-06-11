import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { setIqurieData } from "@/config/request/ReduxList/InqurieReducer";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { theme } from "@/SCSS/typecss";
import { TbHandClick } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { InqurieInsert } from "./API/InquireAPI";
import { toast } from "react-toastify";
// ✅ Wrapper for 전체 배경 (분홍 영역)
const Wrapper = styled.div `
  background-color: ${theme.colors.hazeRose};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  padding: 50px 0;

  @media screen and (max-width: 800px) {
    padding: 20px 0; // 모바일에서 여백 축소
  }
`;
// ✅ 메인 입력 박스
const InquireMapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  width: 70vh;
  background-color: whitesmoke;
  border-radius: 15px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 0 0 2px ${theme.colors.hazeRose};
  margin: 50px;

  @media screen and (max-width: 800px) {
    width: 95%;
    margin: 10px; // 모바일에서 마진 축소
    min-height: 400px;
  }
`;
// ✅ 공통 Input 스타일
const InputText = styled.input `
  width: 80%;
  padding: 12px 16px;
  margin: 10px 0;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 0 2px ${theme.colors.hazeRose};
    outline: none;
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
    text-align: center;
  }

  @media screen and (max-width: 800px) {
    font-size: 14px;
  }
`;
// ✅ TextArea 스타일
const TextAreas = styled.textarea `
  width: 80%;
  min-height: 100px;
  max-height: 400px;
  resize: none;
  padding: 12px 16px;
  margin: 10px 0;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 0 2px ${theme.colors.hazeRose};
    outline: none;
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
    text-align: center;
  }

  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
`;
export const InquireText = () => {
    const Selector = useSelector((state) => state.Inqurle.value);
    const dispatch = useDispatch();
    // ✅ 유효성 검사
    const isValid = () => {
        const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
        const missingFields = [];
        if (!Selector.InquireName)
            missingFields.push("작성자 이름");
        if (!Selector.PhoneNumber)
            missingFields.push("전화번호");
        if (!Selector.Address)
            missingFields.push("주소");
        if (!Selector.Inqurie)
            missingFields.push("문의 내용");
        if (missingFields.length > 0) {
            toast.error(`${missingFields.join(", ")} 항목을 입력해 주세요.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return false;
        }
        if (!phoneRegex.test(Selector.PhoneNumber)) {
            toast.error("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return false;
        }
        return true;
    };
    // ✅ 문의 제출 처리
    const HandInquireClick = async () => {
        if (isValid()) {
            InqurieInsert(Selector, dispatch);
        }
    };
    return (_jsx(Wrapper, { children: _jsxs(InquireMapper, { children: [_jsx(Fontname, { children: _jsxs("div", { style: { display: "flex", gap: "10px" }, children: [_jsx(TbHandClick, { style: { marginTop: "10px" } }), "\uAC04\uD3B8\uBB38\uC758\uD558\uAE30"] }) }), _jsx(InputText, { placeholder: "\uACE0\uAC1D \uD655\uC778\uC6A9 \uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", value: Selector.InquireName, onChange: (e) => dispatch(setIqurieData({ ...Selector, InquireName: e.target.value })) }), _jsx(InputText, { placeholder: "\uACE0\uAC1D\uC8FC\uC18C\uB97C \uB3D9\uAE4C\uC9C0\uB9CC \uC785\uB825\uD574\uC8FC\uC138\uC694", value: Selector.Address, onChange: (e) => dispatch(setIqurieData({ ...Selector, Address: e.target.value })) }), _jsx(InputText, { placeholder: "\uC804\uD654\uBC88\uD638\uAC00 \uBB50\uC5D0\uC694?", value: Selector.PhoneNumber, onChange: (e) => dispatch(setIqurieData({ ...Selector, PhoneNumber: e.target.value })) }), _jsx(TextAreas, { placeholder: "\uBB3C\uC5B4\uBCF4\uACE0 \uC2F6\uC740 \uAC74?", value: Selector.Inqurie, onChange: (e) => dispatch(setIqurieData({ ...Selector, Inqurie: e.target.value })) }), _jsx(LastButton, { onClick: HandInquireClick, children: "\uAC04\uD3B8\uBB38\uC758" })] }) }));
};
