import "@/SCSS/tailwind.scss";
import { toast } from "react-toastify";

interface PageNavigate {
  CurrentPage: number;
  setCurrentPage: (Page: number) => void;
  TotalPage: React.RefObject<number>;
}

export const PageNavigator = ({
  CurrentPage,
  setCurrentPage,
  TotalPage,
}: PageNavigate) => {
  return (
    <div>
      <div className="flex justify-center mt-3">
        <div className="flex items-center space-x-6 gap-10">
          <div className="flex items-center space-x-2 gap-5">
            <button
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
              aria-label="이전 페이지"
              onClick={() => {
                if (CurrentPage > 0) {
                  setCurrentPage(CurrentPage - 1);
                }
              }}
            >
              &lt;
            </button>
            {Array.from({ length: TotalPage.current }, (_, index) => (
              <button
                key={index}
                className="px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-blue-100 focus:outline-none"
                onClick={() => {
                  setCurrentPage(index);
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
              aria-label="다음 페이지"
              onClick={() => {
                if (TotalPage.current > CurrentPage + 1) {
                  setCurrentPage(CurrentPage + 1);
                } else {
                  toast("페이지 변경 불가 : 전체 페이지 수 초과", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
