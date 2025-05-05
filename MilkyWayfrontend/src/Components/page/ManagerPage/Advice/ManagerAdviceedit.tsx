import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { TextAreaBox } from "@/Components/Common/ui/TextArea/TextAreaBox";
import { Fontname, ImgTag, LastButton, Wapper } from "@/SCSS/Fixed";
import { cleanType } from "@/types/cleanspace/cleanType";
import { RoomType } from "@/types/Room/RoomType";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import plus from "@/Components/Common/assets/plus.png";
import { useDispatch, useSelector } from "react-redux";
import { setNoticeData } from "@/config/request/ReduxList/NoticeReducer";
import { setNoticeDetailData } from "@/config/request/ReduxList/NoticeDetailReducer";
import { FileTage } from "@/Components/Common/ui/File/FileTage";
import { GET, PUT } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { RootState } from "@/config/reduxstore";
import { NoticeDetailType } from "@/types/Feature/Notice/NoticeAll";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";

const MainBox = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
`;

const MainWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const DeleteButton = styled.button`
  width: 100%;
  margin-top: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }
`;

const ManagerAdviceedit = () => {
  const { noticeId } = useParams();
  const [count, setCount] = useState(1);
  const [noticeDetailId, setNoticeDetailId] = useState<number[]>([]);
  const [type, setType] = useState<string>("");
  const [greeting, setgreeting] = useState("");
  const [title, setTitle] = useState<string>("");
  const [cleanspot, setcleanspot] = useState<string[]>([]);
  const [titleimg, setTitleimg] = useState<File>(new File([], ""));
  const [beforefile, setbeforefile] = useState<File[][]>([]);
  const [afferfile, setAfferfile] = useState<File[][]>([]);
  const [Advice, SetAdvice] = useState<string[]>([""]);

  const Adviceselector = useSelector((state: RootState) => state.Notice.value);
  const AdviceDetailselector = useSelector(
    (state: RootState) => state.NoticeDetail.value
  );

  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    LoginCheck();
  }, []);

  useEffect(() => {
    if (lastItemRef.current && count !== 1) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GET({
          url: paths.Notice.serach.path,
          params: { NoticeId: noticeId },
        });
        const data = res.data[0];
        setCount(data.noticeDetailEntities.length);
        setType(data.type);
        setTitle(data.title);
        setTitleimg(new File([], data.titleimg));
        setgreeting(data.greeting);

        const Cleanspots: string[] = [];
        const Advices: string[] = [];
        const beforeURL: File[][] = [];
        const afterURL: File[][] = [];
        const NoticeDetailId: number[] = [];
        data.noticeDetailEntities.forEach((item: NoticeDetailType) => {
          Cleanspots.push(item.direction);
          Advices.push(item.comment);
          beforeURL.push(
            item.beforeURL.map((url: string) => new File([], url))
          );
          afterURL.push(item.afterURL.map((url: string) => new File([], url)));
          if (item.noticeDetailId !== undefined) {
            NoticeDetailId.push(item.noticeDetailId);
          }
        });

        setcleanspot(Cleanspots);
        SetAdvice(Advices);
        setAfferfile(afterURL);
        setbeforefile(beforeURL);
        setNoticeDetailId(NoticeDetailId);
      } catch (error) {
        console.error("Data fetching failed", error);
      }
    };

    fetchData();
  }, [noticeId]);

  const cleanCount = () => {
    setCount(count + 1);
    updateCleanspot("", count);
  };

  const updateCleanspot = (newMessage: string, index: number) => {
    setcleanspot((prev) => {
      const updated = [...prev];
      updated[index] = newMessage;
      return updated;
    });
  };

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
    const beforefileNameMatrix: string[][] = beforefile.map((row) =>
      row.map((file) => file.name)
    );
    const affterfileNameMatrix: string[][] = afferfile.map((row) =>
      row.map((file) => file.name)
    );
    const combinedData = cleanspot.map((q, idx) => ({
      noticeDetailId: noticeDetailId[idx],
      direction: q,
      beforeURL: beforefileNameMatrix[idx] || "",
      afterURL: affterfileNameMatrix[idx] || "",
      comment: Advice[idx],
    }));
    dispatch(setNoticeDetailData(combinedData));
  }, [beforefile, cleanspot, afferfile, Advice, dispatch]);

  useEffect(() => {
    console.log("업데이트된 Advice 값:", AdviceDetailselector);
  }, [AdviceDetailselector]);

  const handleOnclick = async () => {
    const AdviceData: NoticeDetailType[] = [];
    for (let i = 0; i < count; i++) {
      AdviceData.push({
        noticeDetailId: noticeDetailId[i],
        NoticeId: noticeId,
        direction: AdviceDetailselector[i].direction,
        beforeURL: beforefile[i].map((file) => file.name),
        afterURL: afferfile[i].map((file) => file.name),
        comment: AdviceDetailselector[i].comment,
      });
    }
    await PUT({
      url: paths.Notice.basic.path,
      data: {
        noticeDTO: {
          noticeId: noticeId,
          title: Adviceselector.title,
          titleimg: titleimg.name,
          type: Adviceselector.type,
          greeting: Adviceselector.greeting,
        },
        noticeDetailDTO: AdviceData,
      },
    }).then((res) => {
      console.log(res);
      if (res.resultType === "success") {
        alert("수정 완료");
        navigator(
          GateWayNumber.Manager + "/" + ManagerGateWayType.AdviceSelect
        );
      } else {
        alert("수정 실패");
      }
    });
  };

  const deleteCleanItem = (index: number) => {
    setcleanspot((prev) => prev.filter((_, idx) => idx !== index));
    setbeforefile((prev) => prev.filter((_, idx) => idx !== index));
    setAfferfile((prev) => prev.filter((_, idx) => idx !== index));
    SetAdvice((prev) => prev.filter((_, idx) => idx !== index));
    setCount(count - 1); // Decrease the count after removal
  };

  return (
    <div style={{ overflow: "visible" }}>
      <MainWapper>
        <MainBox>
          <Fontname>후기 관리</Fontname>
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
                  name={`청소 위치 (${cleanspot[i]})`}
                  append={RoomType}
                  value={cleanspot[i]}
                  updateCleanspot={(val: string) =>
                    setcleanspot((prev) =>
                      prev.map((item, idx) => (idx === i ? val : item))
                    )
                  }
                  Cleancount={i}
                />
                <FileTage
                  name={`청소 이전 (${cleanspot[i]})`}
                  Value={beforefile}
                  setBeforeValue={setbeforefile}
                  index={i}
                  type="before"
                />
                <FileTage
                  name={`청소 이후 (${cleanspot[i]})`}
                  Value={afferfile}
                  setAfferValue={setAfferfile}
                  index={i}
                  type="after"
                />
                <TextAreaBox
                  name={`청소 후기 (${cleanspot[i]})`}
                  place={"청소할 때 힘들었던 점이나 후기 글을 작성해주세요."}
                  index={i}
                  Value={Advice}
                  setValue={SetAdvice}
                />
                {count > 1 && (
                  <DeleteButton onClick={() => deleteCleanItem(i)}>
                    🗑 삭제
                  </DeleteButton>
                )}
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
