import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

// SelectBoxProps 인터페이스 정의
interface SelectBoxProps {
  name: string;
  place?: string;
  Value: string | string[];
  setValue?: Dispatch<SetStateAction<string[]>>;
  setValue2?: Dispatch<SetStateAction<string>>;
  index?: number;
}

// Textarea 스타일 정의
const Textarea = styled.textarea`
  width: 300px !important; /* Tailwind의 영향을 받지 않도록 !important 사용 */
  min-height: 100px !important;
  resize: none;
  padding: 12px 13px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 16px;
  box-sizing: border-box; /* box-sizing을 border-box로 설정 */
`;

// TextAreaContainer 스타일 정의
const TextAreaContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px !important; /* Tailwind의 영향을 받지 않도록 !important 사용 */
  justify-content: space-between;
  gap: 20px;
  height: auto;
  margin-top: 20px !important; /* margin-top도 !important로 설정 */
  box-sizing: border-box; /* box-sizing을 border-box로 설정 */
`;

// Label 스타일 정의
const Label = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
`;

// TextAreaBox 컴포넌트 정의
export const TextAreaBox = ({
  name,
  place,
  Value,
  setValue,
  index,
  setValue2,
}: SelectBoxProps) => {
  useEffect(() => {
    if (index !== undefined && Value.length < index && setValue !== undefined) {
      const NewValue = [...Value];
      NewValue.push("");
      setValue(NewValue);
    }
  }, [Value, index, setValue]);

  function SetChange(
    e: ChangeEvent<HTMLTextAreaElement>,
    index?: number
  ): void {
    if (index !== undefined && setValue !== undefined) {
      const NewValue = [...Value];
      NewValue[index] = e.target.value;
      setValue(NewValue);
    } else {
      if (setValue2 !== undefined) {
        setValue2(e.target.value);
      }
    }
  }

  return (
    <TextAreaContainer className="relative">
      {" "}
      {/* Tailwind 스타일의 영향을 덜 받도록 클래스명 추가 */}
      <Label>{name}</Label>
      {index !== undefined ? (
        <Textarea
          placeholder={place}
          value={Value[index] || ""}
          onChange={(e) => SetChange(e, index)}
          className="block"
        />
      ) : (
        <Textarea
          placeholder={place}
          value={Value || ""}
          onChange={(e) => SetChange(e)}
          className="block"
        />
      )}
    </TextAreaContainer>
  );
};
