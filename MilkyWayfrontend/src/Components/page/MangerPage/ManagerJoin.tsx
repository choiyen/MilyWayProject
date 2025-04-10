import { Footer } from "@/Components/Common/Footer";

import { FixedManagerHeader, Fontname, LastButton } from "@/SCSS/Fixed";
import { AddressDummy } from "@/types/Dummydata"; // Assuming signDummy is a value
import { GateWayType } from "@/types/GateWayType";
import { AddressType } from "@/types/ProjectDataType";
import { Key, useEffect, useState } from "react";

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
  const [Sign, setSign] = useState<null | AddressType[]>(null);
  const navigate = useNavigate();
  const FuncClick = (name: string) => {
    navigate(name);
  };

  useEffect(() => {
    // 여기서 Sign에 들어갈 데이터를 가져오는 API 호출을 수행하고, setSign으로 상태를 업데이트합니다.
    // 예시로 더미 데이터를 사용하고 있습니다.
    setSign(AddressDummy); // signDummy는 더미 데이터입니다.
  }, [Sign]);

  return (
    <div>
      <FixedManagerHeader />
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리 </Fontname>
          <Label>청소 날짜가 지난 데이터는 자동 삭제 됩니다.</Label>
          <MainWapper>
            {Sign != null && Sign.length != 0 ? (
              Sign.map((date: AddressType, index: Key) => {
                return (
                  <JoinMapper key={index}>
                    <JoinName>{date.customer + " 고객"}</JoinName>
                    <JoinCation>
                      <div>{date.Address}</div>
                      <div>{date.phoneNumber}</div>
                      <div>{date.SubmissionDate}</div>
                      <div>{date.acreage}</div>
                    </JoinCation>
                  </JoinMapper>
                );
              })
            ) : (
              <div>최근 한달에 해당하는 데이터 존재하지 않습니다.</div>
            )}
          </MainWapper>
        </MainBox>
        <LastButton onClick={() => FuncClick(GateWayType.ManagerAddress)}>
          정보 추가
        </LastButton>
      </MainWapper>
      <Footer />
    </div>
  );
};
