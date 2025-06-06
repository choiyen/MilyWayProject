import { Label } from "@/SCSS/Fixed";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  place?: string;
  Value: string[] | string;
  setValue?: Dispatch<SetStateAction<string[]>>; // 수정된 부분
  setValue2?: Dispatch<SetStateAction<string>> | ((value: string) => void);
  index?: number;
}

const InputText = styled.input`
  width: 70%;
  height: 50px; /* 데스크탑에서 높이 설정 */
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  background-color: white;
  color: black;
  resize: none;
  padding: 12px 13px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 16px;
  border: 1px solid black;

  @media screen and (max-width: 600px) {
    width: 70%; /* 모바일에서 전체 너비 사용 */
    max-width: 300px; /* 모바일에서 최대 너비 설정 */
    height: 40px; /* 모바일에서 높이 조정 */
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬 */
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  height: auto;

  @media screen and (max-width: 600px) {
    width: 100%;
    gap: 10px; /* 모바일에서 간격 조정 */
    margin-top: 0px;
  }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            SetChange(e, index)
          }
        />
      ) : (
        <InputText
          type="text"
          placeholder={place}
          value={Value || ""} // undefined일 경우 빈 문자열로 초기화
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => SetChange(e)}
        />
      )}
    </TextAreaContainer>
  );
};
