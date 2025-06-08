import styled from "styled-components";

const Review = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 40px auto 20px;
  padding: 16px 24px;
  max-width: 800px;

  @media screen and (max-width: 600px) {
    font-size: 15px;
    margin: 20px auto 0px;
  }
`;

export const ReviewBanner = () => {
  return (
    <Review>
      🧹 못미더우신가요?{" "}
      <span style={{ color: "#00a59e" }}>청소 후기 블로그</span>를 확인해보세요!
    </Review>
  );
};
