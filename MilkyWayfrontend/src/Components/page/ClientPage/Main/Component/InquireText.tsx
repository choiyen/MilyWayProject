import { paths } from "@/config/paths/paths";
import { RootState } from "@/config/reduxstore";
import { POST } from "@/config/request/axios/axiosInstance";
import { setIqurieData } from "@/config/request/ReduxList/InqurieReducer";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { theme } from "@/SCSS/typecss";
import { AxiosError } from "axios";
import { TbHandClick } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";

const InquireMapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  width: 70vh;
  background-color: whitesmoke;
  border-radius: 15px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 0 0 2px ${theme.colors.hazeRose}; // 외곽선 강조
  margin: 50px;
`;

const InputText = styled.input`
  width: 80%;
  padding: 12px 16px;
  margin: 10px 0;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08); // 안으로 들어간 느낌
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 0 2px ${theme.colors.hazeRose}; // 외곽선 강조
    outline: none;
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
    text-align: center;
  }
`;

const TextAreas = styled.textarea`
  width: 80%;
  min-height: 100px;
  max-height: 400px;

  resize: none;
  padding: 12px 16px;
  margin: 10px 0;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08); // 안으로 들어간 느낌
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 0 2px ${theme.colors.hazeRose}; // 외곽선 강조
    outline: none;
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
    text-align: center;
  }
`;

export const InquireText = () => {
  const Selector = useSelector((state: RootState) => state.Inqurle.value);
  const dispatch = useDispatch();

  function handleServerError(response: {
    message: string;
    resultType: "error" | "success";
  }) {
    const { message, resultType } = response;

    if (resultType === "error" && message) {
      // 문장 분리: 마침표 또는 줄바꿈 기준
      const errors = message
        .split(/[.\n]/) // 마침표나 줄바꿈 기준으로 나눔
        .map((msg: string) => msg.trim())
        .filter((msg: string) => msg.length > 0); // 빈 항목 제거

      if (errors.length > 0) {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "error",
          title: errors[0], // 첫 오류만 표시
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: "my-toast", // 커스텀 클래스 지정
          },
        });
      }
    }
  }

  const HandInquireClick = async () => {
    dispatch(
      setIqurieData({ ...Selector, SubmissionDate: new Date().toISOString() })
    );

    await POST({
      url: paths.Inqurie.basic.path,
      data: {
        address: Selector.Address,
        phoneNumber: Selector.PhoneNumber,
        inquire: Selector.Inqurie,
        inquirename: Selector.InquireName,
        dateOfInquiry: Selector.SubmissionDate,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.resultType === "success") {
          Swal.fire({
            icon: "success",
            title: "삭제",
            text: `${res.data.message}`,
            confirmButtonText: "확인",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "삭제",
            text: `${res.message}`,
            confirmButtonText: "확인",
          });
        }
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          handleServerError(
            err.response.data as {
              message: string;
              resultType: "error" | "success";
            }
          );
        } else {
          console.error("Unexpected error response:", err);
        }
      });
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.hazeRose,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <InquireMapper>
        <Fontname>
          <div style={{ display: "flex", gap: "10px" }}>
            <TbHandClick style={{ marginTop: "10px" }} />
            간편문의하기
          </div>
        </Fontname>
        <InputText
          placeholder="고객 확인용 이름을 입력해주세요"
          value={Selector.InquireName}
          onChange={(e) =>
            dispatch(
              setIqurieData({ ...Selector, InquireName: e.target.value })
            )
          }
        />
        <InputText
          placeholder="고객주소를 동까지만 입력해주세요"
          value={Selector.Address}
          onChange={(e) =>
            dispatch(setIqurieData({ ...Selector, Address: e.target.value }))
          }
        />
        <InputText
          placeholder="전화번호가 뭐에요?"
          value={Selector.PhoneNumber}
          onChange={(e) =>
            dispatch(
              setIqurieData({ ...Selector, PhoneNumber: e.target.value })
            )
          }
        />
        <TextAreas
          placeholder="물어보고 싶은 건?"
          value={Selector.Inqurie}
          onChange={(e) =>
            dispatch(setIqurieData({ ...Selector, Inqurie: e.target.value }))
          }
        />
        <LastButton onClick={HandInquireClick}>간편문의</LastButton>
      </InquireMapper>
    </div>
  );
};
