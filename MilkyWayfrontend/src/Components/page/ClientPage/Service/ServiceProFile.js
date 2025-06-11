import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { GET } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { IntroductionService } from "./Type/IntroductionService";
import styled from "styled-components";
import { theme } from "@/SCSS/typecss";
import ServiceSelector from "./Component/ServiceSelector";
import IntroductionDetail from "./Component/IntroductionDetail";
import EmptyReview from "./Component/EmptyReview";
import ReviewCards from "./Component/ReviewCards";
import { PageNavigator } from "../Question/page/ui/PageNavigator";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { ReviewBanner } from "./Component/ReviewBanner";
const Fontname2 = styled.div `
  color: ${theme.colors.charcoalBlack};
  font-size: 25px;
  margin-bottom: 30px;
  font-weight: bolder;

  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
`;
const FontComment = styled.div `
  font-size: 20px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
const ServiceProFile = () => {
    const [selectIntroduction, setIntroduction] = useState();
    const [notices, setNotice] = useState();
    const TotalPage = useRef(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");
    const [select, setSelect] = useState(type ?? "전체보기");
    const [CurrentPage, setCurrentPage] = useState();
    const fetchType = async (type, CurrentPage) => {
        if (type === "전체보기") {
            return await GET({
                url: paths.Notice.serach.path + "/page",
                params: { page: CurrentPage },
            });
        }
        else {
            return await GET({
                url: paths.Notice.Type.path,
                params: { type: type, page: CurrentPage },
            });
        }
    };
    useEffect(() => {
        setSearchParams({
            type: select,
        });
    }, [select]);
    useEffect(() => {
        fetchType(select, CurrentPage ?? 0)
            .then((res) => {
            if (res.resultType == "empty") {
                setNotice([]);
                return;
            }
            setNotice(res.pageDTO.list);
            TotalPage.current = res.pageDTO.pageCount;
        })
            .catch((err) => {
            console.error("Error fetching reviews:", err);
            toast.error("리뷰를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." +
                err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setNotice([]);
        });
        setIntroduction(IntroductionService.filter((s) => s.Service === select));
    }, [select, CurrentPage]);
    return (_jsxs("div", { style: {
            backgroundColor: "#f9f6f1",
            width: "100%",
            maxWidth: "100vw",
        }, children: [_jsxs("div", { style: { textAlign: "center", padding: "20px" }, children: [_jsxs(Fontname2, { children: [_jsx("span", { style: { color: "#c88b6f" }, children: "\uAC00\uC871\uCC98\uB7FC " }), "\uD3EC\uADFC\uD558\uACE0", _jsx("span", { style: { color: "#609ea2" }, children: " \uAE30\uACC4\uCC98\uB7FC " }), "\uAF3C\uAF3C\uD55C Care Service"] }), _jsx(FontComment, { children: "\uC740\uD558\uC218 \uD648\uCF00\uC5B4\uC758 \uCC28\uBCC4\uD654\uB41C \uCCAD\uC18C \uC11C\uBE44\uC2A4\uB97C \uD55C\uBC88 \uACBD\uD5D8\uD574\uBCF4\uC138\uC694!" })] }), _jsx(ServiceSelector, { setSelect: setSelect }), _jsx("div", { style: { backgroundColor: "#F0F4F8", width: "100%" }, children: selectIntroduction?.map((intro, idx) => (_jsxs("div", { children: [_jsx(IntroductionDetail, { data: intro }), _jsx(ReviewBanner, {}), notices && notices.length > 0 ? (_jsxs("div", { children: [_jsx(ReviewCards, { notices: notices }), _jsx(PageNavigator, { CurrentPage: CurrentPage ?? 0, setCurrentPage: setCurrentPage, TotalPage: TotalPage })] })) : (_jsx(EmptyReview, {}))] }, idx))) })] }));
};
export default ServiceProFile;
