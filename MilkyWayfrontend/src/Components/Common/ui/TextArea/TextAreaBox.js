import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/SCSS/Fixed";
import { useEffect } from "react";
import styled from "styled-components";
// Textarea 스타일 정의
const Textarea = styled.textarea `
  width: 70%;
  max-width: 650px !important; /* max-width를 680px로 설정 */
  min-height: 200px !important;
  resize: none;
  padding: 12px 13px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  padding: 20px; /* padding을 20px로 설정 */
  line-height: 16px;
  font-weight: 400;
  box-sizing: border-box; /* box-sizing을 border-box로 설정 */

  @media screen and (max-width: 800px) {
    width: 75% !important;
    height: auto !important;
    min-height: 100px !important;
  }
`;
// TextAreaContainer 스타일 정의
const TextAreaContainer = styled.div `
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  height: auto;
  margin-top: 20px !important; /* margin-top도 !important로 설정 */
  box-sizing: border-box; /* box-sizing을 border-box로 설정 */
  margin-bottom: 20px !important; /* margin-bottom도 !important로 설정 */
`;
// TextAreaBox 컴포넌트 정의
export const TextAreaBox = ({ name, place, Value, setValue, index, setValue2, }) => {
    useEffect(() => {
        if (index !== undefined && Value.length < index && setValue !== undefined) {
            const NewValue = [...Value];
            NewValue.push("");
            setValue(NewValue);
        }
    }, [Value, index, setValue]);
    function SetChange(e, index) {
        if (index !== undefined && setValue !== undefined) {
            const NewValue = [...Value];
            NewValue[index] = e.target.value;
            setValue(NewValue);
        }
        else {
            if (setValue2 !== undefined) {
                setValue2(e.target.value);
            }
        }
    }
    return (_jsxs(TextAreaContainer, { className: "relative", children: [" ", _jsx(Label, { children: name }), index !== undefined ? (_jsx(Textarea, { placeholder: place, value: Value[index] || "", onChange: (e) => SetChange(e, index), className: "block" })) : (_jsx(Textarea, { placeholder: place, value: Value || "", onChange: (e) => SetChange(e), className: "block" }))] }));
};
