import { NewCalendar } from "@/Components/Common/ui/Calendar/NewCalendar";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { RootState } from "@/config/reduxstore";
import { setAddressData } from "@/config/request/ReduxList/addressReducer";
import { Fontname, LastButton, Wapper } from "@/SCSS/Fixed";
import { cleanType } from "@/types/cleanspace/cleanType";
import { Value } from "@/types/Date/date";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { AddressInsertfetchData } from "../api/util";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainBox = styled.div`
  width: 100%;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px; /* Space at the top */
  padding-bottom: 50px; /* Space at the bottom */
  overflow-y: auto; /* Scroll only within the MainBox */
`;

export const ManagerAddress = () => {
  const [Address, SetAddress] = useState("");
  const [AddressDetail, SetAddressDetail] = useState("");
  const today = new Date();
  const [Reservation, SetReservation] = useState<Value>(today);
  const dispatch = useDispatch();
  const native = useNavigate();
  const AddressData = useSelector((state: RootState) => {
    return state.Address.value;
  });
  function isValidPhoneNumber(phone: string) {
    const regex = /^01[0-9]-\d{3,4}-\d{4}$/;
    return regex.test(phone);
  }

  const isEmptyAddress = () => {
    if (
      AddressData.acreage == "" ||
      AddressData.cleanType == "" ||
      AddressData.customer == "" ||
      AddressData.phoneNumber == "" ||
      AddressData.submissionDate == "" ||
      Address == "" ||
      AddressDetail == ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleReservation = () => {
    if (isEmptyAddress()) {
      if (isValidPhoneNumber(AddressData.phoneNumber)) {
        AddressInsertfetchData(AddressData)
          .then((res) => {
            if (res.resultType === "success") {
              console.log(res.message);
              native(GateWayNumber.Manager + "/" + ManagerGateWayType.Join);
            } else {
              console.log(res.message);
              alert(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("전화번호는 -을 포함한 형태로 입력하셔야 합니다.");
      }
    } else {
      alert("비어있는 데이터가 존재합니다.");
    }
  };

  useEffect(() => {
    dispatch(
      setAddressData({
        ...AddressData,
        address: Address + " " + AddressDetail,
      })
    );
  }, [Address, AddressDetail, dispatch]);

  return (
    <div>
      <MainWapper>
        <MainBox>
          <Fontname>온라인 예약 관리 </Fontname>
          <Wapper>
            <SelectBox
              name={"서비스명"}
              append={cleanType}
              value={AddressData.cleanType}
              setValue={(value: string) => {
                dispatch(setAddressData({ ...AddressData, cleanType: value }));
              }}
            ></SelectBox>
            <InputTextBox
              name={"이름"}
              Value={AddressData.customer}
              setValue2={(value: string) => {
                dispatch(setAddressData({ ...AddressData, customer: value }));
              }}
            ></InputTextBox>
            <InputTextBox
              name={"연락처"}
              Value={AddressData.phoneNumber}
              setValue2={(value: string) => {
                dispatch(
                  setAddressData({ ...AddressData, phoneNumber: value })
                );
              }}
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
              Value={AddressData.acreage || ""}
              setValue2={(value: string) => {
                dispatch(setAddressData({ ...AddressData, acreage: value }));
              }}
            ></InputTextBox>
            <NewCalendar
              name={"예약 날짜"}
              Value={Reservation}
              setValue={(value: Value | ((prevState: Value) => Value)) => {
                const newValue =
                  value instanceof Function ? value(Reservation) : value;
                SetReservation(newValue);
                dispatch(
                  setAddressData({
                    ...AddressData,
                    submissionDate:
                      newValue instanceof Date
                        ? newValue.toLocaleDateString("sv-SE").split("T")[0]
                        : "",
                  })
                );
              }}
            ></NewCalendar>
            {/* 아직 캘린더 CSS 적용 안됨, 디자인 검토 후 추가할 예정 */}
          </Wapper>
          <LastButton onClick={handleReservation}>예약 등록</LastButton>
        </MainBox>
      </MainWapper>
    </div>
  );
};
