import { Dispatch, useEffect } from "react";
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

      console.log(type); // 상태 업데이트 후에 확인
      // 상태 값이 제대로 업데이트 되도록 한 뒤에 POST 요청 실행
      setTimeout(async () => {
        const res = await POST({
          url: paths.Administration.basic.path,
          data: AdministrationData,
        });
        console.log(res);
        if (res.resultType === "success") {
          alert("전송 처리 완료!");
          setChange(false);
          fetchData(); // 상태 갱신
        }
      }, 1000); // 조금의 지연을 주어 상태 업데이트가 끝날 시간을 줍니다.
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
