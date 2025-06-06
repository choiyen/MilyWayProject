import { Dispatch, useEffect } from "react";
import { RadioBox } from "@/Components/Common/ui/Radio/RadioBox";
import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { setAdministrationData } from "@/config/request/ReduxList/AdministrationReducer";
import {
  adminstrationSelect,
  ScheduleType,
} from "@/types/appointment/adminstrationType";
import { ModelWrapper, Overlay } from "@/types/Conmon/ModelWapperType";
import { SmallButton } from "@/SCSS/Fixed";
import { useSelector } from "react-redux";
import { RootState } from "@/config/reduxstore";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import Swal from "sweetalert2";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import styled from "styled-components";

interface Props {
  setChange: (value: boolean) => void;
  date: Date | null;
  setType: (value: ScheduleType) => void;
  setDate: (value: Date | null) => void;
  type: (typeof adminstrationSelect)[number];
  dispatch: Dispatch<ReturnType<typeof setAdministrationData>>;
  fetchData: () => Promise<void>;
}

const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 20px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

export const ScheduleModal = ({
  setChange,
  date,
  setType,
  type,
  dispatch,
  fetchData,
}: Props) => {
  const AdministrationData = useSelector(
    (state: RootState) => state.Administration.value
  );

  useEffect(() => {
    dispatch(
      setAdministrationData({
        adminstrationType: type,
        administrationDate: date ? date.toLocaleDateString("sv-SE") : "",
      })
    );
  }, [date, dispatch, type]);

  const handleSubmit = async () => {
    try {
      setTimeout(async () => {
        const res = await POST({
          url: paths.Administration.basic.path,
          data: AdministrationData,
        });
        if (res.resultType === "success") {
          Swal.fire({
            icon: "success",
            title: "일정 확정 완료",
            text: "일정이 성공적으로 확정되었습니다.",
            confirmButtonText: "확인",
          });
          setChange(false);
          fetchData();
        }
      }, 1000);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "일정 확정 실패",
        text: "일정 확정에 실패했습니다. 다시 시도해주세요." + e,
        confirmButtonText: "확인",
      });
    }
  };

  const width = useWindowWidth();
  const isMobile = width <= 600;

  const MobileBottomSheet = () => (
    <>
      <MobileOverlay onClick={() => setChange(false)} />
      <BottomSheet>
        <InputTextBox
          name="현재 날짜:"
          Value={date ? date.toLocaleDateString("sv-SE") : ""}
        />
        <br />
        <RadioBox
          name="선택 유형"
          append={Array.from(adminstrationSelect)}
          setValue={(value: string) => setType(value as ScheduleType)}
        />
        <br />
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
          }}
        >
          <SmallButton onClick={handleSubmit}>일정 확정</SmallButton>
          <SmallButton onClick={() => setChange(false)}>취소</SmallButton>
        </div>
      </BottomSheet>
    </>
  );

  return (
    <>
      {isMobile ? (
        <MobileBottomSheet />
      ) : (
        <>
          <Overlay />
          <ModelWrapper $istrue="true">
            <InputTextBox
              name={"현재 날짜 :"}
              Value={date ? date.toLocaleDateString("sv-SE") : ""}
            />
            <br />
            <RadioBox
              name="선택 유형"
              append={Array.from(adminstrationSelect)}
              setValue={(value: string) => setType(value as ScheduleType)}
            />
            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <SmallButton onClick={handleSubmit}>일정 확정</SmallButton>
              <SmallButton onClick={() => setChange(false)}>취소</SmallButton>
            </div>
          </ModelWrapper>
        </>
      )}
    </>
  );
};
