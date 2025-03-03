import styled from "styled-components";
import { MangerHeader } from "@/Components/Common/MangerHeader";
import { SelectBox } from "@/Components/Common/SelectBox";
import { TextAreaBox } from "@/Components/Common/TextAreaBox";
import { cleanType } from "@/types/cleanType";
import { RoomType } from "@/types/RoomType";
import { FileTag } from "@/Components/Common/FileTag";
import { useState } from "react";
import { Footer } from "@/Components/Common/Footer";

const MainBox = styled.div`
  width: 100%;
  height: 100vh; /* MainBox의 높이를 100vh로 설정하여 화면을 꽉 채우게 합니다 */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* 화면을 넘어가면 스크롤이 생기도록 */
`;

const Wapper = styled.div`
  width: 70%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* 여백을 추가하여 내용이 너무 꽉 차지 않게 합니다 */
  box-sizing: border-box;
`;

const Fontname = styled.h1`
  color: #e195ab;
`;

export const ManagerAdvice = () => {
  const [count, setCount] = useState(1);

  const cleanCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <MangerHeader />
      <MainBox>
        <Wapper>
          <Fontname>후기 관리</Fontname>
          <SelectBox name={"청소 유형"} append={cleanType} />
          <br />
          <TextAreaBox name={"인사말"} />
          <br />
          {[...Array(count)].map((_, i) => (
            <div key={i}>
              <SelectBox name={"청소 위치"} append={RoomType} />
              <br />
              <FileTag name={"청소 전 사진"} />
              <br />
              <FileTag name={"청소 후 사진"} />
              <br />
              <TextAreaBox
                name={"후기"}
                place={"청소할 때 힘들었던 점이나 후기 글을 작성해주세요."}
              />
              <br />
            </div>
          ))}
          <button onClick={() => cleanCount()}>추가</button>
        </Wapper>
      </MainBox>
      <Footer />
    </div>
  );
};
