import { useEffect, useRef, useState } from "react";
import { GET } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { Introduction, IntroductionService } from "./IntroductionService";

import styled from "styled-components";
import { theme } from "@/SCSS/typecss";
import { Notice, SelectType } from "./Component/type";
import ServiceSelector from "./Component/ServiceSelector";
import IntroductionDetail from "./Component/IntroductionDetail";
import ReviewBanner from "./Component/ReviewBanner";
import EmptyReview from "./Component/EmptyReview";
import ReviewCards from "./Component/ReviewCards";
import { PageNavigator } from "../Question/page/ui/PageNavigator";

const Fontname2 = styled.div`
  color: ${theme.colors.charcoalBlack};
  font-size: 25px;
  margin-bottom: 30px;
  font-weight: bolder;
`;

const ServiceProFile = () => {
  const [select, setSelect] = useState<SelectType>("전체보기");
  const [selectIntroduction, setIntroduction] = useState<Introduction[]>();
  const [notices, setNotice] = useState<Notice[]>();
  const TotalPage = useRef(0);
  const [CurrentPage, setCurrentPage] = useState<number>();
  const fetchType = async (type: string, CurrentPage: number) => {
    if (type === "전체보기") {
      return await GET({
        url: paths.Notice.serach.path + "/page",
        params: { page: CurrentPage },
      });
    } else {
      return await GET({
        url: paths.Notice.Type.path,
        params: { type: type, page: CurrentPage },
      });
    }
  };

  useEffect(() => {
    console.log(select);
    fetchType(select, CurrentPage ?? 0)
      .then((res) => {
        console.log(res);
        setNotice(res.pageDTO.list);
        TotalPage.current = res.pageDTO.pageCount;
      })
      .catch((err) => {
        console.log(err);
        setNotice([]);
      });
    setIntroduction(IntroductionService.filter((s) => s.Service === select));
  }, [select, CurrentPage]);

  return (
    <div style={{ backgroundColor: "#f9f6f1", padding: "15px" }}>
      <div style={{ textAlign: "center" }}>
        <Fontname2>
          <span style={{ color: "#c88b6f" }}>가족처럼 </span>
          포근하고
          <span style={{ color: "#609ea2" }}> 기계처럼 </span>
          꼼꼼한 Care Service
        </Fontname2>
        <div style={{ fontSize: "15px" }}>
          은하수 홈케어의 차별화된 청소 서비스를 한번 경험해보세요!
        </div>
      </div>
      <ServiceSelector setSelect={setSelect} />
      <div style={{ backgroundColor: "#F0F4F8", width: "100%" }}>
        {selectIntroduction?.map((intro, idx) => (
          <div key={idx}>
            <IntroductionDetail data={intro} select={select} />
            <ReviewBanner />
            {notices && notices.length > 0 ? (
              <div>
                <ReviewCards notices={notices} />
                <PageNavigator
                  CurrentPage={CurrentPage ?? 0}
                  setCurrentPage={setCurrentPage}
                  TotalPage={TotalPage}
                />
              </div>
            ) : (
              <EmptyReview />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProFile;
