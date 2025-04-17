import { useState } from "react";

const useIsDirectAccess = () => {
  const [isDirect] = useState(() => {
    const entries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const navType = entries?.[0]?.type;
    return navType === "navigate" || navType === "reload";
  });

  return isDirect;
};

export default useIsDirectAccess;
