import { RootState } from "@/config/reduxstore";
import { setIqurieData } from "@/config/request/ReduxList/InqurieReducer";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { theme } from "@/SCSS/typecss";
import { TbHandClick } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { InqurieInsert } from "./API/InquireAPI";
import { toast } from "react-toastify";

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

  const isValid = () => {
    const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;

    const missingFields: string[] = [];

    if (!Selector.InquireName) missingFields.push("작성자 이름");
    if (!Selector.PhoneNumber) missingFields.push("전화번호");
    if (!Selector.Address) missingFields.push("주소");
    if (!Selector.Inqurie) missingFields.push("문의 내용");

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(", ")} 항목을 입력해 주세요.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    // 전화번호 형식 검사
    if (!phoneRegex.test(Selector.PhoneNumber)) {
      toast.error("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  };

  const HandInquireClick = async () => {
    if (isValid()) {
      InqurieInsert(Selector, dispatch);
    }
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
        <LastButton onClick={() => HandInquireClick()}>간편문의</LastButton>
      </InquireMapper>
    </div>
  );
};
