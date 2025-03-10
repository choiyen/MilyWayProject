import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  Value: File[][];
  setValue: Dispatch<SetStateAction<File[][]>>;
  index: number;
}

// The file input itself
const FileTageBox = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  opacity: 0; /* Make the file input invisible */
`;

// The label or custom button that triggers the file input dialog
const CustomFileLabel = styled.label`
  cursor: pointer;
  background-color: gray;
  width: 300px; /* Adjust width here */
  height: 50px; /* Adjust height here */
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 50px; /* Vertically center the text */
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 10px; /* Optional: Rounded corners */

  &:hover {
    background-color: brown;
  }
`;
const Label = styled.span`
  margin-right: 20px; /* Textarea와의 간격 조정 */
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
`;

const FileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 정렬 */
  width: 500px;
  height: auto;
  margin-top: 20px;
`;

export const FileTag = ({ name, Value, setValue, index }: SelectBoxProps) => {
  useEffect(() => {
    if (Value.length < index) {
      const copiedArray = [...Value.map((row) => [...row]), []];
      setValue(copiedArray);
    }
  }, [Value, index, setValue]);
  useEffect(() => {
    console.log(Value);
  }, [Value]);

  return (
    <FileContainer
      className="filename"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Label>{name}</Label>
      {/* The label serves as the clickable area */}
      <CustomFileLabel htmlFor="fileInput">
        클릭 시 갤러리가 열립니다
      </CustomFileLabel>
      {/* The file input is hidden, but still functional */}
      <FileTageBox
        type="file"
        id="fileInput"
        placeholder="클릭 시 갤러리가 열립니다."
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          const newValue = [...Value];
          newValue[index] = files;
          setValue(newValue);
        }}
      />
    </FileContainer>
  );
};
