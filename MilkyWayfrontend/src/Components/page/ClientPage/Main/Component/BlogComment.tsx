import { FaBlog, FaClipboardList } from "react-icons/fa";
import styled from "styled-components";

const LogSection = styled.div`
  text-align: center;
  margin-top: 15px;
  background-color: #f0f9f4; /* 연한 청록 계열 배경 */
  color: #305f55;
`;

const LogItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 10px 0;
  font-weight: 600;
  font-size: 1.1rem;

  svg {
    color: #81d4a3;
    font-size: 1.5rem;
  }
`;

const LogDescription = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #4a766e;
  margin-top: 6px;
`;

export const BlogComment = () => {
  return (
    <LogSection>
      <LogItem>
        <FaClipboardList />
        <div>매일 새롭게 진행되는 청소 현장!</div>
      </LogItem>

      <LogItem
        style={{
          flexDirection: "column",
          fontWeight: "normal",
          fontSize: "0.9rem",
          color: "#4a766e",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaBlog style={{ fontSize: "1.3rem", color: "#88c9b4" }} />
          <div>
            어떤 오염이 있었고, 전후 상황을 블로그에 꼼꼼히 기록하고 있어요!!
          </div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <LogDescription>한번 방문 GOGO</LogDescription>
        </div>
      </LogItem>
    </LogSection>
  );
};
