// src/components/common/GlobalErrorBoundary.tsx

import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const GlobalErrorBoundary: React.FC = () => {
  const error = useRouteError();

  // React Router에서 발생한 에러라면
  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>
          🚨 {error.status} - {error.statusText}
        </h1>
        <p>{error.data ?? "페이지를 찾을 수 없습니다."}</p>
      </div>
    );
  }

  // 일반 JS Error
  if (error instanceof Error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>😵 오류 발생!</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  // 알 수 없는 에러
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>❗ 예기치 않은 오류</h1>
      <p>문제가 발생했습니다. 다시 시도해주세요.</p>
    </div>
  );
};

export default GlobalErrorBoundary;
