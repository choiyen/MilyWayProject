import { paths } from "@/config/paths/paths";
import { GET, PUT } from "@/config/request/axios/axiosInstance";
import { InqurieType } from "@/types/Feature/Inqurie/Inqurie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/SCSS/typecss";
import { Fontname } from "@/SCSS/Fixed";
import Swal from "sweetalert2";

const InquireMapping = styled.div`
  width: 70%;
  height: auto;
  background-color: beige;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 15px;

  div {
    display: flex;
    align-items: center;

    strong {
      padding: 15px;

      width: 30%;
      text-align: left;
      border-right: 1px solid black;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* 투명도 낮은 검정 */
    }

    span {
      padding: 15px;

      width: 70%;
      text-align: right; /* 오른쪽 끝 정렬 */
      border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* 투명도 낮은 검정 */
    }
  }
`;

export const Fontname2 = styled(Fontname)`
  font-size: 30px;
  margin: 0;
`;

const Mapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${theme.colors.starlightWhite};
`;

const SmallButton2 = styled.button<{ variant?: "call" | "phone" | "cancel" }>`
  margin: 0 8px;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: ${({ variant }) => {
    switch (variant) {
      case "call":
        return "#007bff"; // 파란색
      case "phone":
        return "#28a745"; // 초록색
      case "cancel":
        return "#dc3545"; // 빨간색
      default:
        return "#6c757d"; // 회색
    }
  }};

  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case "call":
          return "#0056b3";
        case "phone":
          return "#1e7e34";
        case "cancel":
          return "#bd2130";
        default:
          return "#5a6268";
      }
    }};
  }
`;

const ManagerInquiresSelect = () => {
  const InqurieId = useParams().InquireId;
  const [Inquiries, setInquiries] = useState<InqurieType>();
  const native = useNavigate();
  const [reloadFlag, setReloadFlag] = useState(false);

  const HandeGet = async (InqurieId: string) => {
    if (InqurieId) {
      await GET({
        url: paths.Inqurie.serach.path,
        params: { InquireId: InqurieId },
      }).then((res) => {
        if (res.resultType === "success") {
          // 문의 상세 정보를 성공적으로 가져온 경우 상태를 업데이트합니다.
          console.log(res.data);
          setInquiries({
            Inqurie: res.data[0].inquire || "",
            InquireName: res.data[0].inquirename || "",
            PhoneNumber: res.data[0].phoneNumber || "",
            SubmissionDate: res.data[0].dateOfInquiry || "",
            InqurieId: res.data[0].inquireId,
            Address: res.data[0].address,
            inquireBool: res.data[0].inquireBool,
          });
        } else {
          console.error("문의 상세 정보를 가져오는 데 실패했습니다.");
        }
      });
    } else {
      console.error("선택된 문의 ID가 없습니다.");
    }
  };

  useEffect(() => {
    // 선택된 문의 ID를 기반으로 문의 상세 정보를 가져오는 로직을 추가할 수 있습니다.
    // 예: API 호출 등을 통해 Inquiries 상태를 업데이트합니다.
    HandeGet(InqurieId || "");
    console.log("문의 상세 정보:", Inquiries);
  }, [InqurieId, reloadFlag]);

  const infoList = [
    { label: "작성고객", value: Inquiries?.InquireName },
    { label: "고객번호", value: Inquiries?.PhoneNumber },
    { label: "고객주소", value: Inquiries?.Address },
    { label: "문의날짜", value: Inquiries?.SubmissionDate },
    { label: "문의내용", value: Inquiries?.Inqurie },
  ];

  const handleCallCancel = () => {
    Swal.fire({
      title: "고객 문의 확인을 취소하시겠습니까?",
      text: "해당 문의는 다시 미처리 상태로 변경됩니다.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "예, 취소합니다",
      cancelButtonText: "아니오",
      confirmButtonColor: "#d33", // 파란색
      cancelButtonColor: "#3889cf", // 회색 (부트스트랩 기준 중간 회색)
    }).then(async (result) => {
      if (result.isConfirmed) {
        await PUT({
          url: paths.Inqurie.basic.path,
          data: {
            InqurieId: InqurieId,
          },
        });
        setReloadFlag((prev) => !prev); // reloadFlag 토글해서 useEffect 재실행 유도
        // window.location.href = `tel:${phoneNumber}`;
      }
    });
  };

  const handleCall = (phoneNumber: string) => {
    if (!phoneNumber) return;

    Swal.fire({
      title: "전화하시겠습니까? 통화 시 확인 처리 합니다.",
      text: `${phoneNumber} 번호로 전화를 겁니다.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "전화하기",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await PUT({
          url: paths.Inqurie.basic.path,
          data: {
            InqurieId: InqurieId,
          },
        });
        setReloadFlag((prev) => !prev); // reloadFlag 토글해서 useEffect 재실행 유도
        // window.location.href = `tel:${phoneNumber}`;
      }
    });
  };

  const handleCancel = () => {
    const isConfirmed = Inquiries?.inquireBool === true;

    Swal.fire({
      title: isConfirmed
        ? "확인 완료된 페이지입니다. 나가실 건가요?"
        : "미전화 고객. 나가실 건가요?",
      icon: isConfirmed ? "info" : "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        native(-1);
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <Fontname2>문의 상세 정보</Fontname2>
      <hr className="w-[70%] border-t-1 border-gray-400 my-4" />
      {/* 여기에 문의 상세 정보를 표시하는 컴포넌트를 추가할 수 있습니다. */}
      {Inquiries && (
        <Mapper>
          <InquireMapping>
            {infoList.map((info, index) => (
              <div key={index}>
                <strong>{info.label}</strong>
                <span>{info.value || "N/A"}</span>
              </div>
            ))}
          </InquireMapping>
          <hr className="w-[70%] border-t-1 border-gray-400 my-4 mt-10" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // 가운데 정렬
              alignItems: "center",
              width: "30vw", // 적당한 너비 지정
            }}
          >
            {Inquiries.inquireBool ? (
              <SmallButton2 variant="phone" onClick={() => handleCallCancel()}>
                확인취소
              </SmallButton2>
            ) : (
              <SmallButton2
                variant="call"
                onClick={() => handleCall(Inquiries?.PhoneNumber ?? "")}
              >
                전화하기
              </SmallButton2>
            )}
            <SmallButton2 variant="cancel" onClick={() => handleCancel()}>
              이전으로
            </SmallButton2>
          </div>
        </Mapper>
      )}
    </div>
  );
};
export default ManagerInquiresSelect;
