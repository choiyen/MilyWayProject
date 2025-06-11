import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { TextAreaBox } from "@/Components/Common/ui/TextArea/TextAreaBox";
import { Fontname, ImgTag, Label, LastButton, Wapper } from "@/SCSS/Fixed";
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
import { GET } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { PUT_FORM } from "@/config/request/axios/MutipartAxios";
const MainBox = styled.div `
  width: 100vw;
  height: 100vh; /* 추가 */
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
  padding: 10px;

  @media screen and (max-width: 600px) {
    padding: 0px;
  }
`;
const DeleteButton = styled.button `
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
    const [noticeDetailId, setNoticeDetailId] = useState([]);
    const [type, setType] = useState("");
    const [greeting, setgreeting] = useState("");
    const [title, setTitle] = useState("");
    const [cleanspot, setcleanspot] = useState([]);
    const [titleimg, setTitleimg] = useState(new File([], ""));
    const [beforefile, setbeforefile] = useState([]);
    const [afferfile, setAfferfile] = useState([]);
    const [Advice, SetAdvice] = useState([""]);
    const Adviceselector = useSelector((state) => state.Notice.value);
    const AdviceDetailselector = useSelector((state) => state.NoticeDetail.value);
    const lastItemRef = useRef(null);
    const dispatch = useDispatch();
    const navigator = useNavigate();
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
                const Cleanspots = [];
                const Advices = [];
                const beforeURL = [];
                const afterURL = [];
                const NoticeDetailId = [];
                data.noticeDetailEntities.forEach((item) => {
                    Cleanspots.push(item.direction);
                    Advices.push(item.comment);
                    beforeURL.push(item.beforeURL.map((url) => new File([], url)));
                    afterURL.push(item.afterURL.map((url) => new File([], url)));
                    if (item.noticeDetailId !== undefined) {
                        NoticeDetailId.push(item.noticeDetailId);
                    }
                });
                setcleanspot(Cleanspots);
                SetAdvice(Advices);
                setAfferfile(afterURL);
                setbeforefile(beforeURL);
                setNoticeDetailId(NoticeDetailId);
            }
            catch (error) {
                console.error("후기 데이터를 불러오는 데 실패했습니다:", error);
                toast.error("후기 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요." + error, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };
        fetchData();
    }, [noticeId]);
    const cleanCount = () => {
        setCount(count + 1);
        updateCleanspot("", count);
    };
    const updateCleanspot = (newMessage, index) => {
        setcleanspot((prev) => {
            const updated = [...prev];
            updated[index] = newMessage;
            return updated;
        });
    };
    useEffect(() => {
        dispatch(setNoticeData({
            noticeId: noticeId,
            title: title,
            titleimg: titleimg.name,
            type: type,
            greeting: greeting,
        }));
    }, [dispatch, greeting, title, type]);
    useEffect(() => {
        const beforefileNameMatrix = beforefile.map((row) => row.map((file) => file.name));
        const affterfileNameMatrix = afferfile.map((row) => row.map((file) => file.name));
        const combinedData = cleanspot.map((q, idx) => ({
            noticeDetailId: noticeDetailId[idx],
            noticeId: noticeId,
            direction: q,
            beforeURL: beforefileNameMatrix[idx] || "",
            afterURL: affterfileNameMatrix[idx] || "",
            comment: Advice[idx],
        }));
        dispatch(setNoticeDetailData(combinedData));
    }, [beforefile, cleanspot, afferfile, Advice, dispatch]);
    const handleOnclick = async () => {
        const formData = new FormData();
        formData.append("noticeJsonDTO", JSON.stringify({
            noticeDTO: Adviceselector,
            noticeDetailDTO: AdviceDetailselector,
        }));
        formData.append("titleimg", titleimg);
        beforefile.forEach((files, index) => {
            files.forEach((file) => {
                console.log(`before_${index}:`, file.name); // ← 이걸 보세요
                formData.append(`before_${index}`, file);
            });
        });
        afferfile.forEach((files, index) => {
            files.forEach((file) => {
                console.log(`after_${index}:`, file.name); // ← 이걸 보세요
                formData.append(`after_${index}`, file);
            });
        });
        await PUT_FORM(paths.Notice.basic.path, formData).then((res) => {
            if (res.resultType === "success") {
                Swal.fire({
                    icon: "success",
                    title: "수정 완료",
                    text: "후기가 성공적으로 수정되었습니다.",
                    confirmButtonText: "확인",
                });
                navigator(GateWayNumber.Manager + "/" + ManagerGateWayType.AdviceSelect);
            }
            else {
                toast.error("후기 수정에 실패했습니다. 다시 시도해주세요.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };
    const deleteCleanItem = (index) => {
        setcleanspot((prev) => prev.filter((_, idx) => idx !== index));
        setbeforefile((prev) => prev.filter((_, idx) => idx !== index));
        setAfferfile((prev) => prev.filter((_, idx) => idx !== index));
        SetAdvice((prev) => prev.filter((_, idx) => idx !== index));
        setCount(count - 1); // Decrease the count after removal
    };
    return (_jsxs(MainBox, { children: [_jsx(Fontname, { children: "\uD6C4\uAE30 \uAD00\uB9AC" }), _jsxs(Wapper, { children: [_jsxs("div", { style: { width: "100%" }, children: [_jsx(InputTextBox, { name: "제목", place: "후기 제목을 입력해주세요.", Value: title, setValue2: setTitle }), _jsx(FileTage, { name: "대표 이미지", setValue2: setTitleimg }), _jsx(SelectBox, { name: "청소 유형", append: cleanType, value: type, setValue: setType }), _jsx(TextAreaBox, { name: "도입 인사", Value: greeting, setValue2: setgreeting })] }), [...Array(count)].map((_, i) => (_jsxs("div", { ref: i === count - 1 ? lastItemRef : null, style: {
                            gap: "20px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "10px 10px 0px 10px",
                            padding: "10px",
                            width: "100%",
                        }, children: [_jsx("div", { style: {
                                    textAlign: "center",
                                    padding: "10px",
                                    borderBottom: "1px solid black",
                                }, children: _jsxs(Label, { children: [`후기 글 (${i + 1}) -  ${cleanspot[i]}`, " "] }) }), _jsx(SelectBox, { name: `청소위치`, append: RoomType, value: cleanspot[i], updateCleanspot: (val) => setcleanspot((prev) => prev.map((item, idx) => (idx === i ? val : item))), Cleancount: i }), _jsx(FileTage, { name: `청소이전`, Value: beforefile, setBeforeValue: setbeforefile, index: i, type: "before" }), _jsx(FileTage, { name: `청소이후`, Value: afferfile, setAfferValue: setAfferfile, index: i, type: "after" }), _jsx(TextAreaBox, { name: `청소후기`, place: "청소할 때 힘들었던 점이나 후기 글을 작성해주세요.", index: i, Value: Advice, setValue: SetAdvice }), count > 1 && (_jsx(DeleteButton, { onClick: () => deleteCleanItem(i), children: "\uD83D\uDDD1 \uC0AD\uC81C" }))] }, i))), _jsx(ImgTag, { src: plus, onClick: cleanCount })] }), _jsx(LastButton, { onClick: handleOnclick, children: "\uC5C5\uB85C\uB4DC \uC218\uC815" })] }));
};
export default ManagerAdviceedit;
