import { Fontname, LastButton } from "@/SCSS/Fixed";
import { AddressDummy, AddressType } from "@/types/Feature/Address/AddressType";
import { ManagerGateWayType } from "@/types/GateWay/GateWayType";
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
  const handleClick = () => {
    alert("삭제 기능은 개발 중에 있습니다.");
  };

  return (
    <div>
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리 </Fontname>
          <Label>청소 날짜가 지난 데이터는 자동 삭제 됩니다.</Label>
          <MainWapper>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md text-sm text-left">
              <thead className="bg-gray-200 text-gray-600 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-2 border">고객명</th>
                  <th className="px-4 py-2 border">주소</th>
                  <th className="px-4 py-2 border">전화번호</th>
                  <th className="px-4 py-2 border">날짜</th>
                  <th className="px-4 py-2 border">평수</th>
                  <th className="px-4 py-4 border">삭제</th>
                </tr>
              </thead>
              <tbody>
                {Sign != null && Sign.length !== 0 ? (
                  Sign.map((date: AddressType, index: Key) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border">
                        {date.customer + " 고객"}
                      </td>
                      <td className="px-4 py-2 border">{date.Address}</td>
                      <td className="px-4 py-2 border">{date.phoneNumber}</td>
                      <td className="px-4 py-2 border">
                        {new Date(date.SubmissionDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border">{date.acreage}</td>
                      <td className="px-4 py-2 border">
                        <button onClick={handleClick}>삭제</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center px-4 py-6 text-gray-500"
                    >
                      최근 한달에 해당하는 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </MainWapper>
        </MainBox>
        <LastButton onClick={() => FuncClick(ManagerGateWayType.Address)}>
          정보 추가
        </LastButton>
      </MainWapper>
    </div>
  );
};
