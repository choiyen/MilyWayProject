import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  append: string[];
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

const Label = styled.span<{ isRed?: boolean }>`
  font-size: 20px; /* 글씨 크기 조정 */
  line-height: 16px;
  font-weight: bolder;
  color: ${(props) =>
    props.isRed ? "red" : "black"}; /* isRed가 true일 때 빨간색으로 */
`;

export const RadioBox = ({ name, append }: SelectBoxProps) => {
  return (
    <RadioBoxContainer>
      <Label>{name}</Label>
      {append.map((item) => (
        <Label key={item} isRed={item === "업무"}>
          <input type="radio" name="example" value={item} />
          {item}
        </Label>
      ))}
    </RadioBoxContainer>
  );
};
