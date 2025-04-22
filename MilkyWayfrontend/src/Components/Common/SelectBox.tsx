import { useEffect, useState } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  append: string[];
  updateCleanspot?: (newMessage: string, count: number) => void;
  Cleancount?: number;
  setValue?: (value: string) => void;
}

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
`;

export const SelectBox = ({
  name,
  append,
  updateCleanspot,
  Cleancount,
  setValue,
}: SelectBoxProps) => {
  const [change, setchange] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 선택된 값을 부모에게 전달
    if (updateCleanspot != null && Cleancount != null) {
      console.log(Cleancount);
      updateCleanspot(event.target.value, Cleancount);
      setchange(event.target.value);
    } else if (setValue != null) {
      setValue(event.target.value);
      setchange(event.target.value);
    }
  };
  useEffect(() => {
    // Cleancount가 변할 때만 updateCleanspot 호출
    if (Cleancount != null && updateCleanspot) {
      updateCleanspot("부엌", Cleancount);
    }
    if (match) {
      setchange(match[1]);
    } else {
      console.log("No match found");
    }
  }, []); // Cleancount나 updateCleanspot이 변경될 때만 실행
  const match = name.match(/\(([^)]+)\)/);
  return (
    <SelectContainer>
      <Label>{name}</Label>
      <Select name={name} onChange={handleChange} value={change}>
        {append.map((item) => (
          <option key={item} value={item} style={{ textAlign: "center" }}>
            {item}
          </option>
        ))}
      </Select>
    </SelectContainer>
  );
};
