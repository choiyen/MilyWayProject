import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 2px solid #ccc; /* 더 두껍고 진하게 */

  span.label {
    font-weight: 600;
    color: #222;
    width: 40%;
  }

  span.value {
    text-align: right;
    color: #444;
    width: 60%;
    word-break: break-word;
  }

  &:last-child {
    border-bottom: none;
  }
`;
export const ResponsiveText = styled.div`
  text-align: center;
  padding: 2rem;
  color: #2563eb;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: #f0f9ff;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
export const CardList = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;
