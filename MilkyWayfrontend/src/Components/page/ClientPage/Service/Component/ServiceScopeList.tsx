import { MdCheckCircle } from "react-icons/md";
import { TabService } from "../Type/IntroductionService";
import styled from "styled-components";

interface ServiceScopeData {
  Service: string;
  ServiceList: TabService[];
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
const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const ServiceScopeList = ({ Service, ServiceList }: ServiceScopeData) => {
  return (
    <div style={{ width: "100%", padding: "0 5%" }}>
      <h3
        style={{
          fontSize: "24px",
          margin: "40px 0 20px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            borderBottom: "2px solid #00a59e",
            fontWeight: "bold",
            paddingBottom: "20px",
          }}
        >
          {Service}의 서비스 범위
        </span>
      </h3>
      {ServiceList?.map((item: TabService, idx: number) => (
        <div
          key={idx}
          style={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImageType
            src={item.ImageComment}
            alt=""
            style={{ width: "500px" }}
          />
          <h4
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "10px 50px",
            }}
          >
            {item.name}
          </h4>
          <div style={{ marginTop: "30px" }}>
            {item.ServiceList.map((value: string, i: number) => (
              <ReviewContainer key={i}>
                <MdCheckCircle
                  color="#00a59e"
                  size={20}
                  style={{ marginRight: "10px" }}
                />
                <span>{value}</span>
              </ReviewContainer>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceScopeList;
