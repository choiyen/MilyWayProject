import { NewCalendar } from "@/Components/Common/ui/Calendar/NewCalendar";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { setAddressData } from "@/config/request/ReduxList/addressReducer";
import { Fontname, LastButton, Wapper } from "@/SCSS/Fixed";
import { cleanType } from "@/types/cleanspace/cleanType";
import { Value } from "@/types/Date/date";
import { useState } from "react";
import { useDispatch } from "react-redux";
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

export const ManagerAddress = () => {
  const [Saleable, SetSaleable] = useState("");
  const [Name, SetName] = useState("");
  const [Phone, SetPhone] = useState("");
  const [Address, SetAddress] = useState("");
  const [AddressDetail, SetAddressDetail] = useState("");
  const today = new Date();
  const [Reservation, SetReservation] = useState<Value>(today);
  const dispatch = useDispatch();

  const handleReservation = () => {
    dispatch(
      setAddressData({
        customer: Name,
        phoneNumber: Phone,
        Address: Address + " " + AddressDetail,
        SubmissionDate: Reservation instanceof Date ? Reservation : new Date(),
        acreage: Saleable,
      })
    );
  };

  return (
    <div>
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리 </Fontname>
          <Wapper>
            <SelectBox name={"서비스명"} append={cleanType}></SelectBox>
            <InputTextBox
              name={"이름"}
              Value={Name}
              setValue2={SetName}
            ></InputTextBox>
            <InputTextBox
              name={"연락처"}
              Value={Phone}
              setValue2={SetPhone}
            ></InputTextBox>
            <InputTextBox
              name={"주소"}
              Value={Address}
              setValue2={SetAddress}
            ></InputTextBox>
            <InputTextBox
              name={"상세주소"}
              Value={AddressDetail}
              setValue2={SetAddressDetail}
            ></InputTextBox>
            <InputTextBox
              name={"분양실평수"}
              Value={Saleable}
              setValue2={SetSaleable}
            ></InputTextBox>
            <NewCalendar
              name={"예약 날짜"}
              Value={Reservation}
              setValue={SetReservation}
            ></NewCalendar>
            {/* 아직 캘린더 CSS 적용 안됨, 디자인 검토 후 추가할 예정 */}
          </Wapper>
          <LastButton onClick={handleReservation}>예약 등록</LastButton>
        </MainBox>
      </MainWapper>
    </div>
  );
};
