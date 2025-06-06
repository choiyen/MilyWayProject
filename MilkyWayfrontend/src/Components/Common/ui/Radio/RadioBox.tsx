import { ChangeEvent } from "react";
import styled from "styled-components";

const RadioBoxContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 500px;
  margin-top: 20px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;

const Label = styled.label<{ $isred?: string | undefined }>`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  color: ${(props) => (props.$isred === "true" ? "red" : "black")};
  display: flex;
  align-items: center;
  gap: 6px;

  @media screen and (max-width: 600px) {
    width: 35%; /* 2개씩 한 줄에 배치 */
    box-sizing: border-box;
  }

  @media screen and (max-width: 780px) {
    font-size: 15px;
    line-height: 16px;
  }
`;

// 타입 정의 추가
interface SelectBoxProps {
  name: string;
  append: string[];
  setValue: (value: string) => void;
}

// 컴포넌트
export const RadioBox = ({ name, append, setValue }: SelectBoxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <RadioBoxContainer>
      <Label>{name}:</Label>
      <RadioGroup>
        {append.map((item) => (
          <Label key={item} $isred={`${item === "업무"}`}>
            <input
              type="radio"
              name="example"
              value={item}
              onChange={handleChange}
            />
            {item}
          </Label>
        ))}
      </RadioGroup>
    </RadioBoxContainer>
  );
};
