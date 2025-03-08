import { Footer } from "@/Components/Common/Footer";
import { NewCalendar } from "@/Components/Common/NewCalendar";
import { RadioBox } from "@/Components/Common/RadioBox";
import { SelectDate } from "@/Components/Common/SelectDate";
import { FixedManagerHeader, Fontname, LastButton } from "@/SCSS/Fixed";
import { adminstrationSelect } from "@/types/adminstrationType";
import { GateWayType } from "@/types/GateWayType";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainBox = styled.div`
  width: 100%;
  height: calc(60vh - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Scroll only within the MainBox */
`;
const Label = styled.span`
  font-size: 20px;
  line-height: 16px;
  font-weight: bolder;
  text-align: left;
  margin-bottom: 50px;
`;

const JoinMapper = styled.div`
  width: 40vw;
  display: flex;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  padding-bottom: 20px;
  gap: 50px;
  border-radius: 20px;
  border: 1px solid black;
`;

export const ManagerCalendarInsert = () => {
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
          <MainWapper>
            <JoinMapper>
              <SelectDate name={"예약 날짜"}></SelectDate>
              <RadioBox
                name={"예약 유형"}
                append={adminstrationSelect}
              ></RadioBox>
            </JoinMapper>
          </MainWapper>
        </MainBox>
        <LastButton onClick={() => FuncClick(GateWayType.ManagerSign)}>
          정보 추가
        </LastButton>
      </MainWapper>
      <Footer />
    </div>
  );
};
