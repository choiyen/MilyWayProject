import { MangerHeader } from "@/Components/Common/MangerHeader";
import styled from "styled-components";

export const FixedManagerHeader = styled(MangerHeader)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000; /* Make sure it stays on top */
`;

export const Fontname = styled.h1`
  color: #e195ab;
  margin-bottom: 20px; /* Add space below the title to separate from the next content */
  font-weight: bolder;
`;

export const Wapper = styled.div`
  width: 70%;
  height: auto; /* Allow Wapper to grow dynamically */
  background-color: gainsboro;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensure all elements are top-aligned */
  align-items: center;
  border: 1px solid black;
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 1; /* Allow Wapper to take remaining space */
`;

export const ImgTag = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 50px;
`;

export const LastButton = styled.button`
  width: 100%;
  max-width: 250px;
  height: 50px; /* Height를 줄여서 더 균형 있게 조정 */
  border: 1px solid #e195ab;
  border-radius: 10px;
  background-color: #e195ab;
  color: white;
  font-size: 20px;
  text-align: center;
  margin-top: 20px; /* Space above the button to separate from previous content */
  margin-bottom: 40px;
  padding: 0; /* Remove extra padding */

  &:hover {
    background-color: #461baa;
    color: white;
  }
`;
