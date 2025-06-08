import "@/SCSS/tailwind.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { privacyPolicy } from "./type/ReservationJoin";
import PrivacyConsentModal from "./type/PrivacyConsentModal";
import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { cleanType } from "@/types/cleanspace/cleanType";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { LastButton } from "@/SCSS/Fixed";
import { SelectDate } from "@/Components/Common/ui/Select/SelectDate";
import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { RootState } from "@/config/reduxstore";
import { setReservationData } from "@/config/request/ReduxList/ReservationReducer";
import {
  ConsentState,
  handleClickReservation,
  ReservationPOST,
} from "./API/ReservationAPI";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AddressBox } from "@/Components/Common/ui/Select/AddressBox";

const ReservationMain = () => {
  const dispatch = useDispatch();
  const reservationData = useSelector(
    (state: RootState) => state.Reservation.value
  );

  const [consents, setConsents] = useState<ConsentState>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const checkboxesRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [dateNOT, setDateNot] = useState<string[]>([]);
  const [Address, setAddress] = useState<string>("");
  const [AddressDetail, setAddressDetail] = useState<string>("");

  const dateNoting = async () => {
    try {
      const response = await POST({
        url: paths.Administration.search.path,
      });
      return response;
    } catch (err) {
      console.error("예약 날짜 불러오기 실패:", err);
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: "예약 날짜를 불러오는 중 오류가 발생했습니다. : " + err,
        confirmButtonText: "확인",
      });
    }
  };

  useEffect(() => {
    const initial: ConsentState = {};
    privacyPolicy.forEach((section) => (initial[section.title] = false));
    setConsents(initial);

    dateNoting().then((res) => {
      console.log("예약 날짜 불러오기 성공", res);
      if (!res || !res.data) {
        setDateNot([]);
        return;
      }
      const dates = res.data.map(
        (a: { administrationDate: string }) => a.administrationDate
      );
      setDateNot(dates);
    });
  }, []);

  useEffect(() => {
    const data = Address + " " + AddressDetail;
    dispatch(setReservationData({ ...reservationData, Address: data }));
  }, [Address, AddressDetail]);

  const handleConsentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionTitle: string,
    index: number
  ) => {
    const newConsents = {
      ...consents,
      [sectionTitle]: e.target.checked,
    };
    setConsents(newConsents);

    if (e.target.checked && checkboxesRefs.current[index + 1]) {
      checkboxesRefs.current[index + 1]?.focus();
    }

    const isAllAgreed =
      Object.keys(newConsents).length === privacyPolicy.length &&
      Object.values(newConsents).every((value) => value);
    setIsAgreed(isAllAgreed);
    setAllChecked(isAllAgreed);
  };

  const handleAllConsent = () => {
    const next = !allChecked;
    const newState: ConsentState = {};
    privacyPolicy.forEach((section) => (newState[section.title] = next));
    setConsents(newState);
    setAllChecked(next);
    setIsAgreed(next);
  };

  const handleSubmit = () => {
    toast.success("개인정보 처리 동의 완료", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setIsModalOpen(false);
  };

  const handlePost = async () => {
    handleClickReservation(consents, reservationData, Address, AddressDetail);

    ReservationPOST(reservationData).then((res) => {
      if (res.resultType === "success") {
        Swal.fire({
          icon: "success",
          title: "신청 완료",
          text: `${res.message}`,
          confirmButtonText: "확인",
        });
        dispatch(
          setReservationData({
            name: "",
            phone: "",
            Address: "",
            SubssionDate: "",
            acreage: "",
            type: "",
          })
        );
      }
      setDateNot([...dateNOT, reservationData.SubssionDate]);
    });

    await fetchData(); // 상태 갱신
  };

  return (
    <div className="max-w-[100vw] px-4 py-8 flex flex-col items-center justify-center">
      <h1
        className="p-11 text-4xl max-sm:text-2xl sm:text-5xl font-bold text-gray-800 text-center mb-8
  after:content-[''] after:block after:w-96 max-sm:after:w-40 after:h-1 after:mt-10 after:bg-blue-500 after:mx-auto after:mt-2"
      >
        온라인 예약
      </h1>
      <div className="flex items-center justify-between  max-sm:w-[100%] w-[70%] mb-3 gap-x-10 flex-wrap max-sm:gap-x-6">
        <label
          htmlFor="user"
          className="text-xl font-bold text-black whitespace-nowrap max-sm:text-sm"
        >
          개인정보 동의
        </label>
        <div id="user">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isAgreed}
            className={`px-5 py-2 sm:px-6 sm:py-2 text-sm sm:text-base ${
              isAgreed ? "bg-green-500" : "bg-blue-500"
            } text-white rounded-md hover:bg-blue-600 whitespace-nowrap`}
          >
            {isAgreed ? "개인정보 처리 동의 완료" : "개인정보 처리방침 보기"}
          </button>
        </div>
      </div>
      <div className="w-[70%] max-sm:w-[100%] flex flex-col">
        <SelectDate
          name={"예약날짜"}
          change={reservationData.SubssionDate}
          setValue={(date: Date | null) => {
            dispatch(
              setReservationData({
                ...reservationData,
                SubssionDate: date ? date.toISOString().split("T")[0] : "",
              })
            );
          }}
          bookedDates={dateNOT}
        />
      </div>

      <div className="w-[70%] max-sm:w-[100%] flex flex-col gap-5">
        <SelectBox
          name={"서비스명"}
          append={cleanType}
          value={reservationData.type}
          setValue={(value: string) =>
            dispatch(setReservationData({ ...reservationData, type: value }))
          }
        />
        <InputTextBox
          name={"이름"}
          Value={reservationData.name}
          setValue2={(value: string) =>
            dispatch(setReservationData({ ...reservationData, name: value }))
          }
        />
        <InputTextBox
          name={"고객 전화번호"}
          Value={reservationData.phone}
          setValue2={(value: string) =>
            dispatch(setReservationData({ ...reservationData, phone: value }))
          }
        />
        <div
          style={{
            width: "100%",
            maxWidth: "100vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AddressBox
            name={"주소"}
            append={["경상남도", "부산광역시"]}
            value={Address}
            setValue={setAddress}
          />
        </div>
        <InputTextBox
          name={"상세 주소"}
          Value={AddressDetail}
          setValue2={setAddressDetail}
        />
        <div style={{ margin: "0px" }}>
          <InputTextBox
            name={"실제 평수"}
            Value={reservationData.acreage}
            setValue2={(value: string) =>
              dispatch(
                setReservationData({ ...reservationData, acreage: value })
              )
            }
          />
          <div className="text-red-600">[아파트 외 전용 및 실평수 기재]</div>
        </div>
      </div>
      <LastButton onClick={handlePost}>예약 신청</LastButton>

      {isModalOpen && (
        <PrivacyConsentModal
          consents={consents}
          onChange={handleConsentChange}
          onAllConsent={handleAllConsent}
          isAllChecked={allChecked}
          isAgreed={isAgreed}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          checkboxesRefs={checkboxesRefs}
        />
      )}
    </div>
  );
};

export default ReservationMain;
function fetchData() {
  throw new Error("Function not implemented.");
}
