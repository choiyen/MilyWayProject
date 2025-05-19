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

const MainBox = styled.div`
  width: 100%;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures space between content */
  align-items: center;
  padding-top: 50px; /* Space at the top */
  padding-bottom: 50px; /* Space at the bottom */
  overflow-y: auto; /* Scroll only within the MainBox */
`;

const MainWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
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

  // 마지막 항목을 가리키기 위한 ref
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const Adviceselector = useSelector((state: RootState) => state.Notice.value);
  const AdviceDetailselector = useSelector(
    (state: RootState) => state.NoticeDetail.value
  );

  // 컴포넌트가 처음 렌더링될 때와, 추가할 때마다 스크롤을 내리기 위해 useEffect 사용
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
  }, [dispatch, greeting, title, type]);

  useEffect(() => {
    console.log("beforefile 상태:", beforefile);
    console.log("afferfile 상태:", afferfile);
    const beforefileNameMatrix: string[][] = beforefile.map((row) =>
      row.map((file) => file.name)
    );

    const affterfileNameMatrix: string[][] = afferfile.map((row) =>
      row.map((file) => file.name)
    );

    const combinedData = cleanspot.map((q, idx) => ({
      direction: q,
      beforeURL: beforefileNameMatrix[idx] || "",
      afterURL: affterfileNameMatrix[idx] || "",
      comment: Advice[idx],
    }));
    dispatch(setNoticeDetailData(combinedData));
  }, [beforefile, cleanspot, afferfile, Advice, dispatch]);

  // useEffect(() => {
  //   console.log("업데이트된 selectAdvice 값:", Adviceselector);
  //   console.log("업데이트된 Advice 값:", AdviceDetailselector);
  // }, [Adviceselector, AdviceDetailselector]);

  const cleanCount = () => {
    setCount(count + 1);
    updateCleanspot("", count);
  };

  const handleOnclick = async () => {
    // FormData 준비
    const formData = new FormData();

    // JSON 본문은 파일 경로 없이 전송
    formData.append(
      "noticeJsonDTO",
      new Blob(
        [
          JSON.stringify({
            noticeDTO: Adviceselector,
            noticeDetailDTO: AdviceDetailselector,
          }),
        ],
        { type: "application/json" }
      )
    );

    // 제목 이미지
    formData.append("titleimg", titleimg);

    // 각 noticeDetailDTO의 before/after에 index 붙이기
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

    await POST_FORM(paths.Notice.basic.path, formData).then((res) => {
      console.log(res);
      if (res.resultType === "success") {
        alert("후기 내역 등록 완료");
        navigator(
          GateWayNumber.Manager + "/" + ManagerGateWayType.AdviceSelect
        );
      } else {
        alert("후기 내역 등록 실패");
      }
    });
  };
  const updateCleanspot = (newMessage: string, index: number) => {
    setcleanspot((prev) => {
      const updated = [...prev];
      updated[index] = newMessage;
      return updated;
    });
  };

  return (
    <div style={{ overflow: "Visble" }}>
      <MainWapper>
        <MainBox>
          <Fontname>후기 관리</Fontname> {/* Heading should be visible now */}
          <Wapper>
            <InputTextBox
              name={"제목"}
              place={"후기 제목을 입력해주세요."}
              Value={title}
              setValue2={setTitle}
            ></InputTextBox>
            <FileTage name={"대표 이미지"} setValue2={setTitleimg} />
            <SelectBox
              name={"청소 유형"}
              append={cleanType}
              value={type}
              setValue={setType}
            />
            <TextAreaBox
              name={"도입 인사"}
              Value={greeting}
              setValue2={setgreeting}
            />
            {[...Array(count)].map((_, i) => (
              <div
                key={i}
                ref={i === count - 1 ? lastItemRef : null}
                style={{ gap: "20px" }}
              >
                <SelectBox
                  name={"청소 위치(" + cleanspot[i] + ")"}
                  append={RoomType}
                  value={cleanspot[i]}
                  updateCleanspot={updateCleanspot}
                  Cleancount={i}
                />
                <FileTage
                  name={"청소 이전(" + cleanspot[i] + ")"}
                  Value={beforefile}
                  setBeforeValue={setbeforefile}
                  index={i}
                  type="before"
                />
                <FileTage
                  name={"청소 이후(" + cleanspot[i] + ")"}
                  Value={afferfile}
                  setAfferValue={setAfferfile}
                  index={i}
                  type="after"
                />
                <TextAreaBox
                  name={"청소 후기(" + cleanspot[i] + ")"}
                  place={"청소할 때 힘들었던 점이나 후기 글을 작성해주세요."}
                  index={i}
                  Value={Advice}
                  setValue={SetAdvice}
                />
              </div>
            ))}
            <ImgTag src={plus} onClick={cleanCount} />
          </Wapper>
        </MainBox>
        <LastButton onClick={handleOnclick}>업로드</LastButton>
      </MainWapper>
    </div>
  );
};
