import { Footer } from "@/Components/Common/Footer";
import { InputTextBox } from "@/Components/Common/InputTextBox";
import { NewCalendar } from "@/Components/Common/NewCalendar";
import { SelectBox } from "@/Components/Common/SelectBox";
import { FixedManagerHeader, Fontname, LastButton } from "@/SCSS/Fixed";
import { cleanType } from "@/types/cleanType";
import { styled } from "styled-components";

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainBox = styled.div`
  width: 100%;
  height: calc(60vh - 30px); /* Increased height to make space */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px; /* Space at the top */
  padding-bottom: 50px; /* Space at the bottom */
  overflow-y: auto; /* Scroll only within the MainBox */
`;

export const ManagerSign = () => {
  return (
    <div>
      <FixedManagerHeader />
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리 </Fontname>
          <MainWapper>
            <SelectBox name={"서비스명"} append={cleanType}></SelectBox>
            <InputTextBox name={"분양실평수"}></InputTextBox>
            <InputTextBox name={"이름"}></InputTextBox>
            <InputTextBox name={"연락처"}></InputTextBox>
            <InputTextBox name={"주소"}></InputTextBox>
            <InputTextBox name={"상세주소"}></InputTextBox>
            <NewCalendar name={"예약 날짜"}></NewCalendar>
            {/* 아직 캘린더 CSS 적용 안됨, 디자인 검토 후 추가할 예정 */}
          </MainWapper>
        </MainBox>
        <LastButton>예약 등록</LastButton>
      </MainWapper>
      <Footer />
    </div>
  );
};
