import styled from "styled-components";
export const ModelWrapper = styled.div `
  position: absolute;
  display: ${(props) => props.$istrue === "true"
    ? "block"
    : "none"}; /* istrue가 true일 때 보이도록 */
  top: 50%;
  left: 50%; /* 화면의 왼쪽 50%로 이동 */
  transform: translate(
    -50%,
    -50%
  ); /* 가로, 세로 모두 50%만큼 이동하여 중앙 정렬 */
  width: auto;
  padding: 40px;
  text-align: center;
  background-color: Linen;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rebeccapurple;
  align-items: center;
  z-index: 1000; /* 오버레이 위에 모달이 위치하도록 */
`;
export const Overlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
  z-index: 999; /* 모달보다 더 위에 놓이도록 */
`;
