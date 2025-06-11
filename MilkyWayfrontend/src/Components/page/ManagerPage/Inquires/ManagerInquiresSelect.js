import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { paths } from "@/config/paths/paths";
import { GET, PUT } from "@/config/request/axios/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/SCSS/typecss";
import { Fontname } from "@/SCSS/Fixed";
import Swal from "sweetalert2";
const InquireMapping = styled.div `
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
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    span {
      padding: 15px;
      width: 70%;
      text-align: right;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;

    div {
      flex-direction: column;
      align-items: flex-start;

      strong,
      span {
        width: 100%;
        padding: 10px 0;
        border-right: none;
        text-align: left;
      }

      strong,
      span {
        text-align: center; /* ✅ 모바일에서 strong 가운데 정렬 */
      }
    }
  }
`;
export const Fontname2 = styled(Fontname) `
  font-size: 30px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;
const Mapper = styled.div `
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${theme.colors.starlightWhite};

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
const SmallButton2 = styled.button `
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
            return "#007bff";
        case "phone":
            return "#28a745";
        case "cancel":
            return "#dc3545";
        default:
            return "#6c757d";
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

  @media (max-width: 768px) {
    flex: 1;
    margin: 5px;
    padding: 10px;
    font-size: 14px;
  }
`;
const ButtonWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30vw;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ManagerInquiresSelect = () => {
    const InqurieId = useParams().InquireId;
    const [Inquiries, setInquiries] = useState();
    const native = useNavigate();
    const [reloadFlag, setReloadFlag] = useState(false);
    const HandeGet = async (InqurieId) => {
        if (InqurieId) {
            await GET({
                url: paths.Inqurie.serach.path,
                params: { InquireId: InqurieId },
            }).then((res) => {
                if (res.resultType === "success") {
                    setInquiries({
                        Inqurie: res.data[0].inquire || "",
                        InquireName: res.data[0].inquirename || "",
                        PhoneNumber: res.data[0].phoneNumber || "",
                        SubmissionDate: res.data[0].dateOfInquiry || "",
                        InqurieId: res.data[0].inquireId,
                        Address: res.data[0].address,
                        inquireBool: res.data[0].inquireBool,
                    });
                }
                else {
                    console.error("문의 상세 정보를 가져오는 데 실패했습니다.");
                }
            });
        }
        else {
            console.error("선택된 문의 ID가 없습니다.");
        }
    };
    useEffect(() => {
        HandeGet(InqurieId || "");
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
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3889cf",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await PUT({
                    url: paths.Inqurie.basic.path,
                    data: {
                        InqurieId: InqurieId,
                    },
                });
                setReloadFlag((prev) => !prev);
            }
        });
    };
    const handleCall = (phoneNumber) => {
        if (!phoneNumber)
            return;
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
                setReloadFlag((prev) => !prev);
                // 실제 전화 걸기
                window.location.href = `tel:${phoneNumber}`;
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
    return (_jsxs("div", { className: "flex flex-col items-center p-10", children: [_jsx(Fontname2, { children: "\uBB38\uC758 \uC0C1\uC138 \uC815\uBCF4" }), _jsx("hr", { className: "w-[70%] border-t-1 border-gray-400 my-4" }), Inquiries && (_jsxs(Mapper, { children: [_jsx(InquireMapping, { children: infoList.map((info, index) => (_jsxs("div", { children: [_jsx("strong", { children: info.label }), _jsx("span", { children: info.value || "N/A" })] }, index))) }), _jsx("hr", { className: "w-[70%] border-t-1 border-gray-400 my-4 mt-10" }), _jsxs(ButtonWrapper, { children: [Inquiries.inquireBool ? (_jsx(SmallButton2, { variant: "phone", onClick: handleCallCancel, children: "\uD655\uC778\uCDE8\uC18C" })) : (_jsx(SmallButton2, { variant: "call", onClick: () => handleCall(Inquiries?.PhoneNumber ?? ""), children: "\uC804\uD654\uD558\uAE30" })), _jsx(SmallButton2, { variant: "cancel", onClick: handleCancel, children: "\uC774\uC804\uC73C\uB85C" })] })] }))] }));
};
export default ManagerInquiresSelect;
