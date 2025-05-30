import styled from "styled-components";

const Select = styled.select`
  width: 300px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 12px 13px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  &:focus {
    border: 1px solid #9b51e0;
    outline: 3px solid #f8e4ff;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 정렬 */
  width: 500px;
  height: auto;
  margin-top: 20px;
  gap: 52px;
`;

const Label = styled.span`
  font-size: 20px; /* 글씨 크기 조정 */
  line-height: 16px;
  font-weight: bolder;
`;
interface SelectBoxProps {
  name: string;
  append: string[];
  value?: string; // ✅ 선택된 값을 부모에서 직접 관리
  setValue?: (value: string) => void;
  updateCleanspot?: (newMessage: string, index: number) => void;
  Cleancount?: number;
}

export const SelectBox = ({
  name,
  append,
  value,
  setValue,
  updateCleanspot,
  Cleancount,
}: SelectBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    if (updateCleanspot && Cleancount !== undefined) {
      updateCleanspot(newVal, Cleancount);
    } else if (setValue) {
      setValue(newVal);
    }
  };

  return (
    <SelectContainer>
      <Label>{name}</Label>
      <Select onChange={handleChange} value={value ?? ""}>
        {append.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </SelectContainer>
  );
};
