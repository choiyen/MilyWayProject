import styled from "styled-components";

interface SelectBoxProps {
  name: string;
}
const FileTageBox = styled.input`
  width: 200px;
  height: auto;
`;

export const FileTag = (SelectList: SelectBoxProps) => {
  return (
    <div style={{ display: "flex" }}>
      <span style={{ marginRight: "50px" }}>{SelectList.name}</span>
      <FileTageBox type="file" placeholder="클릭 시 갤러리가 열립니다." />
    </div>
  );
};
