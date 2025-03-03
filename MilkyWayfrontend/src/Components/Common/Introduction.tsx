import "../../SCSS/header.scss";
import styled from "styled-components";

const Introductionbox = styled.div`
  width: 100%;
  height: 150px;
  color: black;
  padding: 50px;
  background-color: #f9e8d9;
`;

const Introductiondiv = styled.div`
  margin-top: 10px;
  padding-left: 10px;
  font-size: 15px;
`;

const Reservationbutton = styled.button`
  margin-top: 40px;
  border: 1px solid #e195ab;
  width: 120px;
  height: 35px;
  margin-left: 20px;
  border-radius: 10px;

  &:hover {
    background-color: #e195ab;
    color: white;
  }
  @media (max-width: 1044px) {
    display: none;
  }
`;

export const Introduction = () => {
  return (
    <Introductionbox>
      <Introductiondiv>가족 같은 마음으로 청소에 임합니다.</Introductiondiv>
      <Introductiondiv>
        가족 기업, 은하수 홈케어에서 아름다운 주거 환경을 경험하세요.
      </Introductiondiv>
      <Introductiondiv>저희를 한번 믿어보세요!!!</Introductiondiv>
      <Reservationbutton className="btn-17">예약하기 </Reservationbutton>
    </Introductionbox>
  );
};
