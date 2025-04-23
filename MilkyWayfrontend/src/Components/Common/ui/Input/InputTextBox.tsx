import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  place?: string;
  Value: string[] | string;
  setValue?: Dispatch<SetStateAction<string[]>>; // 수정된 부분
  setValue2?: Dispatch<SetStateAction<string>>;
  index?: number;
}

const InputText = styled.input`
  width: 270px;
  resize: none;
  padding: 12px 13px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 16px;
`;

const TextAreaContainer = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬 */
  width: 500px;
  justify-content: space-between;
  gap: 20px;
  height: auto;
  margin-top: 20px;
`;

const Label = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
`;

export const InputTextBox = ({
  name,
  place,
  Value,
  setValue,
  index,
  setValue2,
}: SelectBoxProps) => {
  useEffect(() => {
    if (
      index !== undefined &&
      Value.length <= index &&
      setValue !== undefined
    ) {
      const NewValue = [...Value];
      NewValue.push("");
      setValue(NewValue);
    }
  }, [Value, index, setValue]);

  function SetChange(e: ChangeEvent<HTMLInputElement>, index?: number): void {
    if (index !== undefined && setValue !== undefined) {
      const NewValue = [...Value];
      NewValue[index] = e.target.value;
      setValue(NewValue);
    } else {
      if (setValue2 != undefined) {
        setValue2(e.target.value);
      }
    }
  }

  return (
    <TextAreaContainer>
      <Label>{name}</Label>
      {index !== undefined ? (
        <InputText
          type="text"
          placeholder={place}
          value={Value[index] || ""} // undefined일 경우 빈 문자열로 초기화
          onChange={(e) => SetChange(e, index)}
        />
      ) : (
        <InputText
          type="text"
          placeholder={place}
          value={Value || ""} // undefined일 경우 빈 문자열로 초기화
          onChange={(e) => SetChange(e)}
        />
      )}
    </TextAreaContainer>
  );
};
