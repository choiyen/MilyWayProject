import styled from "styled-components";
import { TabService } from "../Type/IntroductionService";
import ServiceScopeList from "./ServiceScopeList";

interface IntroductionDetailProps {
  data: {
    defaultImg: string;
    Service: string;
    Introduction: string;
    ServiceList: TabService[];
  };
}
const ImageType = styled.img`
  width: 70%;
  height: 40vh;
  object-fit: cover;

  @media screen and (max-width: 600px) {
    width: 80%;
    height: 30vh;
  }
`;
const IntroductionDetail = ({ data }: IntroductionDetailProps) => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          fontWeight: "700",
          borderBottom: "2px solid #00a59e",
          paddingBottom: "8px",
        }}
      >
        서비스 안내
      </div>
      <ImageType src={data.defaultImg} alt={data.Service} />
      <p
        style={{
          width: "70%",
          textAlign: "left",
          whiteSpace: "pre-line",
          fontSize: "16px",
        }}
      >
        {data.Introduction}
      </p>

      <ServiceScopeList Service={data.Service} ServiceList={data.ServiceList} />
    </div>
  );
};

export default IntroductionDetail;
