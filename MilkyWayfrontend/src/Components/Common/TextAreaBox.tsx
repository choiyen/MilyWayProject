import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  place?: string;
}
const Textarea = styled.textarea`
  width: 200px;
  height: auto;
  resize: none;
`;

export const TextAreaBox = (SelectList: SelectBoxProps) => {
  return (
    <div style={{ display: "flex" }}>
      <span style={{ marginRight: "50px" }}>{SelectList.name}</span>
      <Textarea placeholder={SelectList.place} />
    </div>
  );
};
