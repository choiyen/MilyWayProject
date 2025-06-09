import styled from "styled-components";
import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { TextAreaBox } from "@/Components/Common/ui/TextArea/TextAreaBox";
import { RoomType } from "@/types/Room/RoomType";
import { useState, useRef, useEffect } from "react";
import plus from "@/Components/Common/assets/plus.png";
import { Fontname, ImgTag, LastButton, Wapper } from "@/SCSS/Fixed";
import { useDispatch, useSelector } from "react-redux";

import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { setNoticeData } from "@/config/request/ReduxList/NoticeReducer";
import { setNoticeDetailData } from "@/config/request/ReduxList/NoticeDetailReducer";
import { RootState } from "@/config/reduxstore";
import { cleanType } from "@/types/cleanspace/cleanType";
import { FileTage } from "@/Components/Common/ui/File/FileTage";
import { paths } from "@/config/paths/paths";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { POST_FORM } from "@/config/request/axios/MutipartAxios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { LoadingModal } from "./LoadingModel";

const MainBox = styled.div`
  width: 100%;
  max-width: 100vw;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
`;

const Textareas = styled.textarea`
  width: 100%;
  min-height: 200px;
  resize: none;
  padding: 12px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  box-sizing: border-box;
  margin-top: 30px;

  @media screen and (max-width: 800px) {
    min-height: 120px;
    font-size: 13px;
    padding: 10px;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  background-color: #f3f4f6;
  border-radius: 10px 10px 0px 0px;
  padding: 20px;

  @media screen and (max-width: 800px) {
    padding: 10px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
  }
`;

const DeskContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 0px 0px 10px 10px;
  width: 100%;

  @media screen and (max-width: 800px) {
    border-radius: 0 0 8px 8px;
    border: 1px solid #eee;
    padding: 10px;
  }
`;

export const ManagerAdvice = () => {
  const [count, setCount] = useState(1);
  const [type, setType] = useState<string>("주거청소");
  const [greeting, setgreeting] = useState("");
  const [title, setTitle] = useState<string>("");
  const [cleanspot, setcleanspot] = useState<string[]>(["부엌"]);
  const [titleimg, setTitleimg] = useState<File>(new File([], ""));
  const [beforefile, setbeforefile] = useState<File[][]>([]);
  const [afferfile, setAfferfile] = useState<File[][]>([]);
  const [Advice, SetAdvice] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const Adviceselector = useSelector((state: RootState) => state.Notice.value);
  const AdviceDetailselector = useSelector(
    (state: RootState) => state.NoticeDetail.value
  );
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 600;

  useEffect(() => {
    if (lastItemRef.current && count !== 1) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [count]);

  useEffect(() => {
    dispatch(
      setNoticeData({
        title: title,
        titleimg: titleimg.name,
        type: type,
        greeting: greeting,
      })
    );
  }, [dispatch, greeting, title, titleimg.name, type]);

  useEffect(() => {
    const beforefileNameMatrix: string[][] = beforefile.map((row) =>
      row.map((file) => file.name)
    );

    const affterfileNameMatrix: string[][] = afferfile.map((row) =>
      row.map((file) => file.name)
    );

    const combinedData = cleanspot.map((q, idx) => ({
      direction: q,
      beforeURL: beforefileNameMatrix[idx] || [],
      afterURL: affterfileNameMatrix[idx] || [],
      comment: Advice[idx],
    }));
    dispatch(setNoticeDetailData(combinedData));
  }, [beforefile, cleanspot, afferfile, Advice, dispatch]);

  const cleanCount = () => {
    setCount(count + 1);
    updateCleanspot("", count);
    SetAdvice((prev) => [...prev, ""]);
  };

  const updateCleanspot = (newMessage: string, index: number) => {
    setcleanspot((prev) => {
      const updated = [...prev];
      while (updated.length <= index) updated.push("");
      updated[index] = newMessage;
      return updated;
    });
  };

  const handleOnclick = async () => {
    if (!titleimg || titleimg.name === "") {
      toast.error("대표 이미지를 등록해주세요.", { position: "top-center" });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "noticeJsonDTO",
      JSON.stringify({
        noticeDTO: Adviceselector,
        noticeDetailDTO: AdviceDetailselector,
      })
    );
    formData.append("titleimg", titleimg);

    beforefile.forEach((files, index) => {
      files.forEach((file) => {
        formData.append(`before_${index}`, file);
      });
    });

    afferfile.forEach((files, index) => {
      files.forEach((file) => {
        formData.append(`after_${index}`, file);
      });
    });

    try {
      const res = await POST_FORM(paths.Notice.basic.path, formData);
      if (res.resultType === "success") {
        Swal.fire({
          icon: "success",
          title: "후기 내역 등록 완료",
          text: "후기 내역이 성공적으로 등록되었습니다.",
          confirmButtonText: "확인",
        });
        navigator(
          GateWayNumber.Manager + "/" + ManagerGateWayType.AdviceSelect
        );
      } else {
        toast.error("후기 내역 등록 실패", { position: "top-center" });
      }
    } catch {
      toast.error("서버 오류 발생", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingModal message="업로드 중입니다..." />}
      <div style={{ width: "100%" }}>
        <MainBox>
          <Fontname>후기 관리</Fontname>
          <Wapper>
            <div style={{ width: "100%", gap: "50px" }}>
              <InputTextBox
                name={"제목"}
                place={"후기 제목을 입력해주세요."}
                Value={title}
                setValue2={setTitle}
              />
              <SelectBox
                name={"청소 유형"}
                append={cleanType}
                value={type}
                setValue={setType}
              />
              <FileTage name={"대표 이미지"} setValue2={setTitleimg} />
              <TextAreaBox
                name={"도입 인사"}
                Value={greeting}
                setValue2={setgreeting}
              />
            </div>
            {[...Array(count)].map((_, i) => (
              <CardContainer key={i} ref={i === count - 1 ? lastItemRef : null}>
                <Fontname
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: isMobile ? "16px" : "20px",
                    width: "100%",
                    border: isMobile ? "none" : "1px solid #ccc",
                    padding: isMobile ? "5px 0" : "10px",
                    borderRadius: isMobile ? "0" : "10px 10px 0px 0px",
                    margin: "0px",
                  }}
                >
                  게시판 구역 {i + 1}
                </Fontname>
                <DeskContainer>
                  <SelectBox
                    name={"청소 위치"}
                    append={RoomType}
                    value={cleanspot[i]}
                    updateCleanspot={updateCleanspot}
                    Cleancount={i}
                  />
                  <FileTage
                    name={"청소 이전"}
                    Value={beforefile}
                    setBeforeValue={setbeforefile}
                    index={i}
                    type="before"
                  />
                  <FileTage
                    name={"청소 이후"}
                    Value={afferfile}
                    setAfferValue={setAfferfile}
                    index={i}
                    type="after"
                  />
                  <Textareas
                    placeholder={
                      "청소할 때 힘들었던 점이나 후기 글을 작성해주세요."
                    }
                    value={Advice[i] || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const newAdvice = [...Advice];
                      newAdvice[i] = e.target.value;
                      SetAdvice(newAdvice);
                    }}
                  />
                </DeskContainer>
              </CardContainer>
            ))}
            <ImgTag
              src={plus}
              style={{
                width: isMobile ? "40px" : "60px",
                height: isMobile ? "40px" : "60px",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={cleanCount}
            />
          </Wapper>
          <LastButton onClick={handleOnclick}>업로드</LastButton>
        </MainBox>
      </div>
    </>
  );
};
