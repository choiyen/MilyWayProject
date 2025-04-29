import { Dispatch } from "react";
import { RadioBox } from "@/Components/Common/ui/Radio/RadioBox";
import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { setAdministrationData } from "@/config/request/ReduxList/AdministrationReducer";
import { adminstrationSelect } from "@/types/appointment/adminstrationType";
import { ModelWrapper, Overlay } from "@/types/Conmon/ModelWapperType";
import { SmallButton } from "@/SCSS/Fixed";
import { useSelector } from "react-redux";
import { RootState } from "@/config/reduxstore";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";

interface Props {
  setChange: (value: boolean) => void;
  date: Date | null;
  setType: (value: string) => void;
  setDate: (value: Date | null) => void;
  type: string;
  dispatch: Dispatch<ReturnType<typeof setAdministrationData>>;
}

export const ScheduleModal = ({
  setChange,
  date,
  setType,
  type,
  dispatch,
}: Props) => {
  const AdministrationData = useSelector(
    (state: RootState) => state.Administration.value
  );

  const handleSubmit = async () => {
    try {
      console.log(AdministrationData);
      dispatch(
        setAdministrationData({
          adminstrationType: type,
          administrationDate: date ? date.toLocaleDateString("sv-SE") : "",
        })
      );

      const res = await POST({
        url: paths.Administration.basic.path,
        data: AdministrationData,
      });

      if (res.data === "전송 완료") {
        alert("전송 처리 완료!");
        setChange(false);
      }
    } catch (e) {
      alert("전송 실패");
      console.error(e);
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
          append={adminstrationSelect}
          setValue={setType}
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
