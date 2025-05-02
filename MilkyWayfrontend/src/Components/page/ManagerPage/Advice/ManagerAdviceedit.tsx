import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { TextAreaBox } from "@/Components/Common/ui/TextArea/TextAreaBox";
import { Fontname, ImgTag, LastButton, Wapper } from "@/SCSS/Fixed";
import { cleanType } from "@/types/cleanspace/cleanType";
import { RoomType } from "@/types/Room/RoomType";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import plus from "@/Components/Common/assets/plus.png";
import { useDispatch } from "react-redux";

import { NoticeDetailType } from "@/types/Feature/Notice/NoticeAll";
import { NoticeFulldummy } from "@/types/Feature/Notice/NoFull";
import { setNoticeData } from "@/config/request/ReduxList/NoticeReducer";
import { setNoticeDetailData } from "@/config/request/ReduxList/NoticeDetailReducer";
import { FileTage } from "@/Components/Common/ui/File/FileTage";
import { GET, POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";

const MainBox = styled.div`
  width: 100%;
  background-color: white;
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
const ManagerAdviceedit = () => {
  const { noticeId } = useParams(); // URL 파라미터로 noticeId를 가져옵니다.
  const [count, setCount] = useState(1);
  const [type, setType] = useState<string>("");
  const [greeting, setgreeting] = useState("");
  const [title, setTitle] = useState<string>("");

  const [cleanspot, setcleanspot] = useState<string[]>([""]);
  const [titleimg, setTitleimg] = useState<File>(new File([], ""));
  const [beforefile, setbeforefile] = useState<File[][]>([[]]);
  const [afferfile, setAfferfile] = useState<File[][]>([[]]);
  const [Advice, SetAdvice] = useState<string[]>([""]);
  const AdviceData: NoticeDetailType[] = [];

  // 마지막 항목을 가리키기 위한 ref
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  // 컴포넌트가 처음 렌더링될 때와, 추가할 때마다 스크롤을 내리기 위해 useEffect 사용
  useEffect(() => {
    if (lastItemRef.current && count !== 1) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [count]);

  useEffect(() => {
    const AdviceFull = NoticeFulldummy[0];
    const Cleanspots: string[] = [];
    const Advices: string[] = [];
    const beforeURL: File[][] = [];
    const afterURL: File[][] = [];
    const fetchData = async () => {
      await GET({
        url: paths.Notice.serach.path,
        params: { NoticeId: noticeId },
      }).then((res) => {
        console.log(res.data[0]);
        setCount(res.data[0].noticeDetailEntities.length);
        setType(res.data[0].type);
        setTitle(res.data[0].title);
        setTitleimg(new File([], res.data[0].titleimg));
        setgreeting(res.data[0].greeting);
        updateCleanspot("", res.data[0].noticeDetailEntities.length);
        for (let i = 0; i < res.data[0].noticeDetailEntities.length; i++) {
          Cleanspots.push(res.data[0].noticeDetailEntities[i].direction);
          Advices.push(res.data[0].noticeDetailEntities[i].comment);
          beforeURL.push(
            res.data[0].noticeDetailEntities[i].beforeURL.map(
              (url: string) => new File([], url)
            )
          );
          afterURL.push(
            res.data[0].noticeDetailEntities[i].afterURL.map(
              (url: string) => new File([], url)
            )
          );
        }
      });
    };
    setcleanspot(Cleanspots);
    SetAdvice(Advices);
    setAfferfile(afterURL);
    fetchData();
  }, []);

  const cleanCount = () => {
    setCount(count + 1);
    updateCleanspot("", count);
  };

  const updateCleanspot = (newMessage: string, count: number) => {
    const newcleanspot = [...cleanspot];
    if (!newcleanspot[count]) {
      newcleanspot[count] = newMessage;
    } else {
      newcleanspot[count] = newMessage;
    }
    setcleanspot(newcleanspot);
  };
  // 이 부분에서 해당 noticeId를 기반으로 데이터를 가져오고, 수정할 수 있는 폼 등을 렌더링합니다.

  const handleOnclick = () => {
    if (afferfile.length !== cleanspot.length) {
      alert("청소 후 사진을 모두 등록해주세요.");
      return;
    } else {
      console.log(
        "청소 후 사진의 첫번째 파일이 자동으로 titleimg로 설정됩니다."
      );
      setTitleimg(afferfile[0][0]);
    }

    dispatch(
      setNoticeData({
        title: title,
        titleimg: titleimg.name,
        type: type,
        greeting: greeting,
      })
    );

    for (let i = 0; i < count + 1; i++) {
      AdviceData.push({
        direction: cleanspot[i],
        beforeURL: beforefile[i].map((file) => file.name),
        afterURL: afferfile[i].map((file) => file.name),
        comment: Advice[i],
      });
    }

    dispatch(setNoticeDetailData(AdviceData));
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
                  name={"청소 위치 (" + cleanspot[i] + ")"}
                  append={RoomType}
                  updateCleanspot={updateCleanspot}
                  Cleancount={i}
                />
                <FileTage
                  name={"청소 이전 (" + cleanspot[i] + ")"}
                  Value={beforefile}
                  setBeforeValue={setbeforefile}
                  index={i}
                />
                <TextAreaBox
                  name={"청소 후기 (" + cleanspot[i] + ")"}
                  place={"청소할 때 힘들었던 점이나 후기 글을 작성해주세요."}
                  index={i}
                  Value={Advice}
                  setValue={SetAdvice}
                />
                <FileTage
                  name={"청소 이후 (" + cleanspot[i] + ")"}
                  Value={afferfile}
                  setAfferValue={setAfferfile}
                  index={i}
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

export default ManagerAdviceedit;
