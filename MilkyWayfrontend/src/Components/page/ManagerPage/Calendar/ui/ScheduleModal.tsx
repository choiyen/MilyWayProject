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

interface Props {
  setChange: (value: boolean) => void;
  date: Date | null;
  setType: (value: ScheduleType) => void;
  setDate: (value: Date | null) => void;
  type: (typeof adminstrationSelect)[number];
  dispatch: Dispatch<ReturnType<typeof setAdministrationData>>;
  fetchData: () => Promise<void>;
}

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
      // 상태 업데이트

      // 상태 값이 제대로 업데이트 되도록 한 뒤에 POST 요청 실행
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
          fetchData(); // 상태 갱신
        }
      }, 1000); // 조금의 지연을 주어 상태 업데이트가 끝날 시간을 줍니다.
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "일정 확정 실패",
        text: "일정 확정에 실패했습니다. 다시 시도해주세요." + e,
        confirmButtonText: "확인",
      });
    }
  };

  return (
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
  );
};
