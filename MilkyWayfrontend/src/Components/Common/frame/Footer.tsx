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
  height: calc(10vh);
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  display: flex;
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
        <FooterLite>Copyright © 2024. All rights reserved.</FooterLite>
      </FooterBox>
    </Wrapper>
  );
};
