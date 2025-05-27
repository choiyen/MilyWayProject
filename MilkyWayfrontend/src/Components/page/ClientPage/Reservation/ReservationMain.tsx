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
      position: "top-right",
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
    <div className="px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="p-11 text-4xl sm:text-5xl font-bold text-gray-800 text-center mb-8 after:content-[''] after:block after:w-96 after:h-1 after:mt-10 after:bg-blue-500 after:mx-auto after:mt-2">
        온라인 예약
      </h1>
      <div className="flex items-center justify-center w-full mb-6 gap-x-28">
        <label htmlFor="user" className="mr-4 text-lg font-bold text-gray-700">
          개인정보 처리 동의
        </label>
        <div id="user">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isAgreed}
            className={`px-6 py-2 ${
              isAgreed ? "bg-green-500" : "bg-blue-500"
            } text-white rounded-md hover:bg-blue-600`}
          >
            {isAgreed ? "개인정보 처리 동의 완료" : "개인정보 처리방침 보기"}
          </button>
        </div>
      </div>
      <SelectDate
        name={"예약 날짜"}
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
      <div>
        <InputTextBox
          name={"실제 평수"}
          Value={reservationData.acreage}
          setValue2={(value: string) =>
            dispatch(setReservationData({ ...reservationData, acreage: value }))
          }
        />
        <div className="text-red-600">[아파트 외 전용 및 실평수 기재]</div>
      </div>

      <InputTextBox name={"주소"} Value={Address} setValue2={setAddress} />
      <InputTextBox
        name={"상세 주소"}
        Value={AddressDetail}
        setValue2={setAddressDetail}
      />
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
