import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  append: string[];
}
const Select = styled.select`
  width: 200px;
  height: auto;
`;

export const SelectBox = (SelectList: SelectBoxProps) => {
  return (
    <div style={{ display: "flex" }}>
      <span style={{ marginRight: "50px" }}>{SelectList.name}</span>
      <Select name={SelectList.name} id="">
        <option value="none">=== 선택 ===</option>
        {SelectList.append.map((append) => {
          return <option value={append}>{append}</option>; // return이 필요함
        })}
      </Select>
    </div>
  );
};
