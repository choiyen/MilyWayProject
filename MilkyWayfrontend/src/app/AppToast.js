import { createGlobalStyle } from "styled-components";
export const GlobalSwalStyle = createGlobalStyle `
  .swal2-toast {
    width: auto !important;               /* 너비 자동 */
    max-width: none !important;           /* 제한 해제 */
    height: 100px !important;
    font-size: 14px !important;
    border-radius: 16px !important;
    display: flex !important;
    align-items: center !important;
    font-weight: 700 !important;
    overflow-x: auto !important;           /* 가로 스크롤 허용 */
    white-space: nowrap !important;         /* 줄바꿈 금지 */
  }
  .swal2-toast .swal2-icon {
    font-size: 12px !important;
    flex-shrink: 0 !important;
  }
  .swal2-toast .swal2-title {
    white-space: nowrap !important;
    flex: 1 1 auto !important;
  }
`;
