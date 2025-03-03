import styled from "styled-components";
import { MangerHeader } from "@/Components/Common/MangerHeader";
import { SelectBox } from "@/Components/Common/SelectBox";
import { TextAreaBox } from "@/Components/Common/TextAreaBox";
import { cleanType } from "@/types/cleanType";
import { RoomType } from "@/types/RoomType";
import { FileTag } from "@/Components/Common/FileTag";
import { useState, useRef, useEffect } from "react";
import { Footer } from "@/Components/Common/Footer";

const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 상단 정렬 */
  align-items: center;
  padding-top: 50px; /* 상단 여백 */
  padding-bottom: 50px; /* 하단 여백 */
  overflow-y: auto; /* MainBox에서만 스크롤 처리 */
`;

const Wapper = styled.div`
  width: 70%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* 내부 여백 */
  box-sizing: border-box;
  overflow: visible; /* Wapper 내부에서는 스크롤을 사용하지 않도록 설정 */
`;

const Fontname = styled.h1`
  color: #e195ab;
`;

const AdviceButton = styled.button`
  width: 100%;
  max-width: 250px;
  height: 50px;
  margin-top: 70px;
  border: 1px solid #e195ab;
  border-radius: 10px;
  background-color: #e195ab;
  color: white;
  display: inline-block;
  text-align: center;
  font-size: 20px;

  &:hover {
    background-color: #461baa;
    color: white;
  }
`;

export const ManagerAdvice = () => {
  const [count, setCount] = useState(1);

  // 마지막 항목을 가리키기 위한 ref
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  // 컴포넌트가 처음 렌더링될 때와, 추가할 때마다 스크롤을 내리기 위해 useEffect 사용
  useEffect(() => {
    if (lastItemRef.current && count != 1) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [count]); // count가 변경될 때마다 실행되므로 추가 버튼을 눌렀을 때 스크롤이 내려갑니다.

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
            <div key={i} ref={i === count - 1 ? lastItemRef : null}>
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
          <button onClick={cleanCount}>추가</button>
          <AdviceButton>업로드</AdviceButton>
        </Wapper>
      </MainBox>
      <Footer />
    </div>
  );
};
