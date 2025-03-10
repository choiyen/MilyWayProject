import styled from "styled-components";
import { SelectBox } from "@/Components/Common/SelectBox";
import { TextAreaBox } from "@/Components/Common/TextAreaBox";
import { cleanType } from "@/types/cleanType";
import { RoomType } from "@/types/RoomType";
import { FileTag } from "@/Components/Common/FileTag";
import { useState, useRef, useEffect } from "react";
import { Footer } from "@/Components/Common/Footer";
import plus from "@/Components/img/plus.png";
import {
  FixedManagerHeader,
  Fontname,
  ImgTag,
  LastButton,
  Wapper,
} from "@/SCSS/Fixed";

const MainBox = styled.div`
  width: 100%;
  height: calc(60vh - 30px); /* Increased height to make space */
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures space between content */
  align-items: center;
  padding-top: 50px; /* Space at the top */
  padding-bottom: 50px; /* Space at the bottom */
  overflow-y: auto; /* Scroll only within the MainBox */
`;

const MainWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

export const ManagerAdvice = () => {
  const [count, setCount] = useState(1);
  const [type, setType] = useState("");
  const [cleanspot, setcleanspot] = useState<string[]>([""]);
  const [beforefile, setbeforefile] = useState<File[][]>([[]]);
  const [afferfile, setAfferfile] = useState<File[][]>([[]]);
  const [Advice, SetAdvice] = useState<string[]>([""]);

  // 마지막 항목을 가리키기 위한 ref
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  // 컴포넌트가 처음 렌더링될 때와, 추가할 때마다 스크롤을 내리기 위해 useEffect 사용
  useEffect(() => {
    if (lastItemRef.current && count !== 1) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [count]);

  const cleanCount = () => {
    setCount(count + 1);
    updateCleanspot("", count);
  };
  const updateCleanspot = (newMessage: string, count: number) => {
    const newcleanspot = [...cleanspot];
    if (!newcleanspot[count]) {
      newcleanspot[count] = newMessage;
    } else {
      newcleanspot[count] = newMessage;
    }
    setcleanspot(newcleanspot);
  };

  return (
    <div style={{ overflow: "Visble" }}>
      <FixedManagerHeader />
      <MainWapper>
        <MainBox>
          <Fontname>후기 관리</Fontname> {/* Heading should be visible now */}
          <Wapper>
            <SelectBox name={"청소 유형"} append={cleanType} />
            <TextAreaBox name={"도입 인사"} Value={type} setValue2={setType} />
            {[...Array(count)].map((_, i) => (
              <div
                key={i}
                ref={i === count - 1 ? lastItemRef : null}
                style={{ gap: "20px" }}
              >
                <SelectBox
                  name={"청소 위치 (" + cleanspot[i] + ")"}
                  append={RoomType}
                  updateCleanspot={updateCleanspot}
                  Cleancount={i}
                />
                <FileTag
                  name={"청소 이전 (" + cleanspot[i] + ")"}
                  Value={beforefile}
                  setValue={setbeforefile}
                  index={i}
                />
                <FileTag
                  name={"청소 이후 (" + cleanspot[i] + ")"}
                  Value={afferfile}
                  setValue={setAfferfile}
                  index={i}
                />
                <TextAreaBox
                  name={"청소 후기 (" + cleanspot[i] + ")"}
                  place={"청소할 때 힘들었던 점이나 후기 글을 작성해주세요."}
                  index={i}
                  Value={Advice}
                  setValue={SetAdvice}
                />
              </div>
            ))}
            <ImgTag src={plus} onClick={cleanCount} />
          </Wapper>
        </MainBox>
        <LastButton>업로드</LastButton>
      </MainWapper>
      <Footer />
    </div>
  );
};
