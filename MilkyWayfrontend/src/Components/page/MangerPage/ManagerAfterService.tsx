import { Footer } from "@/Components/Common/Footer";
import { FixedManagerHeader } from "@/SCSS/Fixed";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const MainWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

export const ManagerAfterService = () => {
  const [Saleable, SetSaleable] = useState<string | null>("");
  useEffect(() => {
    // 여기서 Saleable에 들어갈 데이터를 가져오는 API 호출을 수행하고, setSaleable로 상태를 업데이트합니다.
    // 예시로 더미 데이터를 사용하고 있습니다.
    SetSaleable("A/S 요청에 대한 설정 페이지입니다."); // 더미 데이터입니다.
    console.log(Saleable);
  }, []);

  return (
    <>
      <FixedManagerHeader />
      <MainWapper>
        <div>A/S 요청에 대한 설정 페이지 입니다.</div>
      </MainWapper>
      <Footer />
    </>
  );
};
