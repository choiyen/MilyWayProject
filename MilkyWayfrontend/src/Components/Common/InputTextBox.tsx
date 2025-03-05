import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  place?: string;
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

export const InputTextBox = ({ name, place }: SelectBoxProps) => {
  return (
    <TextAreaContainer>
      <Label>{name}</Label>
      <InputText type="text" placeholder={place} />
    </TextAreaContainer>
  );
};
