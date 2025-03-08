import styled from "styled-components";

interface SelectBoxProps {
  name: string;
}

const RadioBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center; /* 수직 정렬 */
  width: 500px;
  height: auto;
  margin-top: 20px;
`;

const Label = styled.span`
  font-size: 20px; /* 글씨 크기 조정 */
  line-height: 16px;
  font-weight: bolder;
  margin-right: 80px;
`;

const DateInput = styled.input`
  width: 200px;
  height: 50px;
`;

export const SelectDate = ({ name }: SelectBoxProps) => {
  return (
    <RadioBoxContainer>
      <Label>{name}</Label>
      <DateInput type="date" />
    </RadioBoxContainer>
  );
};
