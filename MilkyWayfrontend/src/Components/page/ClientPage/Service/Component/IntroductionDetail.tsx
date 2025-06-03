import { TabService } from "../Type/IntroductionService";
import ServiceScopeList from "./ServiceScopeList";

interface IntroductionDetailProps {
  data: {
    defaultImg: string;
    Service: string;
    Introduction: string;
    ServiceList: TabService[];
  };
  select: string;
}

const IntroductionDetail = ({ data, select }: IntroductionDetailProps) => {
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
      <img
        src={data.defaultImg}
        alt={data.Service}
        style={{ width: "70%", height: "40vh", objectFit: "cover" }}
      />
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
      {select !== "전체보기" && (
        <ServiceScopeList
          Service={data.Service}
          ServiceList={data.ServiceList}
        />
      )}
    </div>
  );
};

export default IntroductionDetail;
