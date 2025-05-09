import styled from "styled-components";

// 타이틀 (아이콘 포함)

// 타이틀 (아이콘 포함)
const QuestionTitle2 = styled.div`
  display: flex;
  align-items: center;
  font-size: 38px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 42px;
  margin-top: 50px;
  gap: 10px;
`;

// 상단 Q&A 배너
const QuestionCampaign = styled.div`
  width: 100%;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffb794; /* 연한 살구 */
  padding: 30px 20px;
`;

// 설명 텍스트
const QuestionSubtitle = styled.div`
  color: blanchedalmond;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  max-width: 80%;
  line-height: 1.4;
`;

export const BoardQuestion = () => {
  return (
    <QuestionCampaign>
      <QuestionTitle2>궁금한 점이 혹시 더 있으신가요?</QuestionTitle2>
      <QuestionSubtitle>
        <span
          style={{
            fontSize: "25px",
            marginBottom: "15px",
            fontWeight: "bold",
            color: "#64130b",
          }}
        >
          전화: 010-6513-1458
        </span>
        <br />
        고객센터로 문의주시면 친절히 답변해드리겠습니다.
      </QuestionSubtitle>
    </QuestionCampaign>
  );
};
