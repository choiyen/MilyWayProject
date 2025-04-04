import { Footer } from "@/Components/Common/Footer";
import { login } from "@/DefaultRedux/ReduxList/userlogin";

import { FixedManagerHeader, Fontname, LastButton } from "@/SCSS/Fixed";
import { signDummy } from "@/types/Dummydata";
import { GateWayType } from "@/types/GateWayType";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

const JoinMapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JoinName = styled.span`
  background-color: chartreuse;
  width: 150px;
  height: 200px;
  line-height: 200px;
  text-align: center;
`;

const JoinCation = styled.div`
  background-color: gainsboro;
  width: auto;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const ManagerJoin = () => {
  const navigate = useNavigate();
  const [Sign] = useState(signDummy);
  const dispatch = useDispatch();
  const FuncClick = (name: string) => {
    dispatch(login({ userID: "", Password: "" }));
    navigate(name);
  };
  useEffect(() => {
    dispatch(login({ userID: "", Password: "" }));
    // 로그인 상태 초기화
  }, [dispatch]);

  return (
    <div>
      <FixedManagerHeader />
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리 </Fontname>
          <Label>청소 날짜가 지난 데이터는 자동 삭제 됩니다.</Label>
          <MainWapper>
            {Sign.length != 0 ? (
              Sign.map((date, index) => {
                return (
                  <JoinMapper key={index}>
                    <JoinName>{date.signname + " 고객"}</JoinName>
                    <JoinCation>
                      <div>{date.address}</div>
                      <div>{date.phoneNumber}</div>
                      <div>{date.signdate}</div>
                    </JoinCation>
                  </JoinMapper>
                );
              })
            ) : (
              <div>최근 한달에 해당하는 데이터 존재하지 않습니다.</div>
            )}
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
