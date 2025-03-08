import { Footer } from "@/Components/Common/Footer";

import { FixedManagerHeader, Fontname, LastButton } from "@/SCSS/Fixed";
import { GateWayType } from "@/types/GateWayType";
import { useNavigate } from "react-router-dom";
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
const Label = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
  margin-bottom: 50px;
`;

export const ManagerCalendar = () => {
  const navigate = useNavigate();
  const FuncClick = (name: string) => {
    navigate(name);
  };

  return (
    <div>
      <FixedManagerHeader />
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리 </Fontname>
          <Label>청소 날짜가 지난 데이터는 자동 삭제 됩니다.</Label>
          <MainWapper></MainWapper>
        </MainBox>
        <LastButton
          onClick={() => FuncClick(GateWayType.ManagerCalendarInsert)}
        >
          정보 추가
        </LastButton>
      </MainWapper>
      <Footer />
    </div>
  );
};
