import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/SCSS/Fixed";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { useEffect, useState } from "react";
import styled from "styled-components";
// 셀렉트 박스 스타일
const Select = styled.select `
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 12px 13px;
  font-family: "Roboto";
  font-size: 14px;
  height: 50px;
  width: 200px;
  border: 1px solid black;

  &:focus {
    border: 1px solid #9b51e0;
    outline: 3px solid #f8e4ff;
  }

  @media screen and (max-width: 800px) {
    width: 40%;
    height: 40px;
    padding: 0px;
  }
`;
// 입력창 스타일
const InputBox = styled.input `
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 12px 13px;
  font-family: "Roboto";
  font-size: 14px;
  height: 50px;
  width: 70%;
  border: 1px solid black;
  &:focus {
    border: 1px solid #9b51e0;
    outline: 3px solid #f8e4ff;
  }

  @media screen and (max-width: 800px) {
    width: 70%;
    height: 40px;
  }
`;
// 전체 행 구성
const SelectContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;
// 셀렉트와 인풋을 담는 내부 그룹
const FieldGroup = styled.div `
  display: flex;
  justify-content: space-between;
  width: 70%;

  @media screen and (max-width: 800px) {
    width: 70%;
    gap: 10px;
  }
`;
// 컴포넌트
export const AddressBox = ({ name, append, setValue }) => {
    const [address, setAddress] = useState({
        select: "",
        input: "",
    });
    useEffect(() => {
        if (setValue) {
            setValue(address.select + "" + address.input);
        }
    }, [address]);
    const handleChange = (e) => {
        const newVal = e.target.value;
        setAddress((prev) => ({ ...prev, select: newVal }));
    };
    const handleChangeInput = (e) => {
        const newVal = e.target.value;
        setAddress((prev) => ({ ...prev, input: newVal }));
    };
    const width = useWindowWidth();
    const isMobileText = width <= 600 ? "지역명 입력해주세요" : "지역명을 입력해주세요(시, 구, 동)";
    return (_jsxs(SelectContainer, { children: [_jsx(Label, { children: name }), _jsxs(FieldGroup, { children: [_jsx(Select, { onChange: handleChange, value: address.input ?? "", children: append.map((item) => (_jsx("option", { value: item, style: { padding: "10px" }, children: item }, item))) }), _jsx(InputBox, { placeholder: isMobileText, onChange: handleChangeInput, value: address.select ?? "" })] })] }));
};
