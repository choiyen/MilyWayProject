import { paths } from "@/config/paths/paths";
import { DELETE, POST } from "@/config/request/axios/axiosInstance";
import "@/SCSS/tailwind.scss";
import { BoardType } from "@/types/Feature/Boards/Board";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentQuestion = () => {
  const [Board, setBoard] = useState<BoardType[]>([]);
  const [allBoards, setAllBoards] = useState<BoardType[]>([]); // 전체 데이터 보관

  const selectText = useRef<HTMLInputElement>(null);
  const selectText2 = useRef<HTMLSelectElement>(null);
  const nativeGate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [inputPassword2, setInputPassword2] = useState("");

  const handleSearch = async () => {
    return await POST({
      url: paths.forum.Board.search.path,
    });
  };

  const selectTitle = useCallback(() => {
    const selectedValue = selectText.current?.value || "";
    const selectedField = selectText2.current?.value;

    if (!selectedValue.trim()) {
      alert("검색어를 입력해주세요.");
      setBoard(allBoards);
      return;
    }

    let filtered = allBoards;

    if (selectedField === "title") {
      filtered = allBoards.filter((item) => item.title.includes(selectedValue));
    } else if (selectedField === "content") {
      filtered = allBoards.filter((item) =>
        item.content.includes(selectedValue)
      );
    }

    setBoard(filtered);
  }, [allBoards]);

  useEffect(() => {
    handleSearch().then((res) => {
      const uniqueItems = res.data.map((commit: BoardType) => ({
        boardId: commit.boardId || "",
        title: commit.title || "",
        content: commit.content || "",
      }));
      setAllBoards(uniqueItems);
      setBoard(uniqueItems);
    });
  }, []);

  const handlewriting = () => {
    nativeGate(GateWayNumber.Client + "/" + ClientGateWayType.ServiceInsert);
  };

  const handleRowClick = (BoardId: string) => {
    nativeGate(GateWayNumber.Client + `/editService/${BoardId}`);
  };

  const handleDeleteClick = (boardId: string) => {
    if (boardId !== "") {
      setSelectedBoardId(boardId);
      setInputPassword("");
      setInputPassword2("");
      setShowPasswordModal(true);
    } else {
      alert("서버로부터 게시판 아이디를 가져오는데 실패했습니다.");
    }
  };

  const confirmDelete = async () => {
    if (!inputPassword || !inputPassword2) {
      alert("비밀번호와 비밀번호 확인을 입력해주세요.");
      return;
    }

    if (inputPassword !== inputPassword2) {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
      return;
    }

    const res = await DELETE({
      url: paths.forum.Board.basic.path,
      data: {
        boardId: selectedBoardId,
        password: inputPassword,
      },
    });

    if (res.resultType === "success") {
      alert("삭제되었습니다.");
      setBoard((prev) => prev?.filter((b) => b.boardId !== selectedBoardId));
      setAllBoards((prev) =>
        prev?.filter((b) => b.boardId !== selectedBoardId)
      );
      setShowPasswordModal(false);
    } else {
      alert("비밀번호가 일치하지 않거나 삭제에 실패했습니다.");
    }
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
                <th className="px-6 py-3 w-1/15 text-center">번호</th>
                <th className="px-6 py-3 text-left w-1/4">제목</th>
                <th className="px-6 py-3 text-left w-3/5">내용</th>
                <th className="px-6 py-3 text-left w-1/2">삭제</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {Board && Board.length > 0 ? (
                Board.map((item, index) => (
                  <tr
                    key={item.boardId}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(item.boardId || "")}
                  >
                    <td className="border px-6 py-3 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-6 py-3">{item.title}</td>
                    <td className="border px-6 py-3 max-w-[200px] truncate">
                      {item.content}
                    </td>
                    <td
                      className="flex border px-6 items-center py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDeleteClick(item.boardId || "")}
                        className="h-5 w-20 bg-teal-100 rounded-[5px]"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-blue-600 font-bold text-lg border-t"
                  >
                    관리해야 할 질문이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center items-center mt-2 gap-4">
            <select
              ref={selectText2}
              className="w-[120px] h-[40px] border border-gray-300 rounded-lg px-2"
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>

            <input
              type="text"
              className="w-[250px] h-[40px] border border-gray-300 rounded-lg px-3"
              placeholder="검색어를 입력하세요"
              ref={selectText}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  selectTitle();
                }
              }}
            />

            <button
              onClick={selectTitle}
              className="h-[40px] bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
            >
              검색
            </button>

            <button
              onClick={handlewriting}
              className="h-[40px] bg-green-500 text-white px-4 rounded-lg hover:bg-green-600 transition"
            >
              글쓰기
            </button>
          </div>

          {showPasswordModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[300px]">
                <h3 className="text-lg font-semibold">비밀번호</h3>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="border px-3 py-2 rounded-md"
                />
                <h3 className="text-lg font-semibold">비밀번호 확인</h3>
                <input
                  type="password"
                  value={inputPassword2}
                  onChange={(e) => setInputPassword2(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="border px-3 py-2 rounded-md"
                />
                <div className="flex justify-around gap-2">
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentQuestion;
