import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  append: string[];
  value: string;
  setValue: (value: string) => void;
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

const Label = styled.span<{ $isred?: string | undefined }>`
  font-size: 20px; /* 글씨 크기 조정 */
  line-height: 16px;
  font-weight: bolder;
  color: ${(props) =>
    props.$isred === "true"
      ? "red"
      : "black"}; /* isRed가 true일 때 빨간색으로 */
`;

export const RadioBox = ({ name, append, setValue }: SelectBoxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <RadioBoxContainer>
      <Label>{name}</Label>
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
    </RadioBoxContainer>
  );
};
