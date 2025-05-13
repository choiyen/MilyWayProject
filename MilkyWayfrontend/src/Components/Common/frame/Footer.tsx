import styled from "styled-components";

const FooterBox = styled.div`
  width: 100%;
  background-color: #ffedfa;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
  line-height: 50px;
`;

const FooterLite = styled.div`
  background-color: #252287;
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled.div`
  display: flex;
  font-size: 20px;
  color: black;
`;

const Wrapper = styled.div`
  background-color: #f0f0f0;
  height: calc(20vh);
  display: flex;
  justify-content: end;
  align-items: end;
`;

export const Footer = () => {
  return (
    <Wrapper>
      <FooterBox>
        <FooterText></FooterText>
        <FooterLite>
          <span>
            은하수홈케어 | 윤정순 | 사업자등록번호: 000-00-00000 | 전화번호:
            010-6513-1458
          </span>
          <span>
            고객과의 약속: 365일 24시간 운영, 최저가 견적, 친절상담,
            고객만족우선, 청소의 진심!
          </span>
        </FooterLite>
        <span>Copyright © 2025. All rights reserved.</span>
      </FooterBox>
    </Wrapper>
  );
};
