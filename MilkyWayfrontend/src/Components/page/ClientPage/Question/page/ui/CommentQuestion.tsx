import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import "@/SCSS/tailwind.scss";
import { BoardType } from "@/types/Feature/Boards/Board";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentQuestion = () => {
  const [Board, setBoard] = useState<BoardType[]>();
  const selectText = useRef<HTMLInputElement>(null);
  const selectText2 = useRef<HTMLSelectElement>(null);
  const nativeGate = useNavigate();
  let Boards: BoardType[] = [];

  useEffect(() => {
    const handleSearch = async () => {
      return await POST({
        url: paths.forum.Board.search.path,
      });
    };

    handleSearch().then((res) => {
      console.log(res);
      for (const commit of res.data) {
        // Process each commit here
        console.log(commit);
        setBoard((prev) => {
          const existingIds = new Set((prev || []).map((item) => item.boardId));
          const newItems = res.data
            .filter(
              (commit: { boardId: string | undefined }) =>
                !existingIds.has(commit.boardId)
            )
            .map(
              (commit: {
                boardId: string;
                title: string;
                content: string;
              }) => ({
                boardId: commit.boardId || "",
                title: commit.title || "",
                content: commit.content || "",
              })
            );
          return [...(prev || []), ...newItems];
        });
      }
    });
  }, []);

  const selectTitle = () => {
    const selectedValue = selectText.current?.value;
    const selectTitle = selectText2.current?.value;
    console.log(selectTitle);
    if (selectedValue !== "") {
      // 검색어가 비어있지 않은 경우에만 필터링
      Boards = Board || [];
      if (selectTitle === "title") {
        setBoard(
          Board?.filter(
            (item) => selectedValue && item.title.includes(selectedValue)
          ) || []
        );
      } else if (selectTitle === "content") {
        setBoard(
          Board?.filter(
            (item) => selectedValue && item.content.includes(selectedValue)
          ) || []
        );
      }
    } else {
      alert("검색어를 입력해주세요.");
      setBoard(Boards);
    }
  };

  const handlewriting = () => {
    nativeGate(GateWayNumber.Client + "/" + ClientGateWayType.ServiceInsert);
  };

  const handleRowClick = (BoardId: string) => {
    nativeGate(GateWayNumber.Client + `/editService/${BoardId}`);
  };

  return (
    <div className="flex flex-col gap-2 p-10">
      <div className="flex items-center gap-2 mt-12">
        <div className="text-gray-800 font-medium text-2xl">질문 게시판</div>
      </div>
      <div className="text-gray-600 text-sm mb-7 font-serif">
        전화는 부끄럽다구요? 게시판에 남겨주세요. 아래에 게시판에 남겨주셔도
        최대한 빠르게 답변해드리겠습니다.
      </div>
      <div className="flex flex-col gap-4 mt-4 bg-slate-300 w-full h-2/5 p-6">
        <div className="flex flex-col gap-2 w-full h-full bg-amber-600 rounded-lg shadow-md p-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-fixed">
            <thead className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase">
              <tr>
                <th className="px-6 py-3  w-1/15 text-center">번호</th>
                <th className="px-6 py-3 text-left w-1/4">제목</th>
                <th className="px-6 py-3 text-left w-1/2">내용</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {Board != null ? (
                Board.map((item, index) => (
                  <tr
                    key={item.boardId}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(item.boardId || "")}
                  >
                    <td className="border px-6 py-3 whitespace-nowrap text-center">
                      {index + 1}
                    </td>
                    <td className="border px-6 py-3 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                      {item.content}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-10 text-blue-600 font-bold text-lg border-t"
                  >
                    관리해야 할 질문이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-2 gap-7">
            <select ref={selectText2}>
              <option value={"title"}>제목</option>
              <option value={"content"}>내용</option>
            </select>
            <input
              type="text"
              className="w-80 border border-gray-300 rounded-lg p-2"
              placeholder="제목을 입력하세요"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // 검색 실행 로직
                  console.log("Enter 입력됨, 검색 실행");
                  selectTitle();
                }
              }}
              ref={selectText}
            />
            <button
              onClick={selectTitle}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              검색
            </button>
            <button
              onClick={handlewriting}
              className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-green-600 transition"
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentQuestion;
