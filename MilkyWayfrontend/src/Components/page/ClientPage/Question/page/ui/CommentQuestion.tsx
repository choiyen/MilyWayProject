import { paths } from "@/config/paths/paths";
import { DELETE, GET } from "@/config/request/axios/axiosInstance";
import "@/SCSS/tailwind.scss";
import { BoardType } from "@/types/Feature/Boards/Board";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageNavigator } from "./PageNavigator";
import Swal from "sweetalert2";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";

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
  const TotalPage = useRef(0);
  const [CurrentPage, setCurrentPage] = useState(0);

  // 모바일 검색 모달 관련 상태
  const [showSearchModal, setShowSearchModal] = useState(false);

  const width = useWindowWidth();
  const ismobile = width <= 600;

  const handleSearch = async () => {
    return await GET({
      url: paths.forum.Board.search.path,
      params: {
        page: CurrentPage,
      },
    });
  };

  const selectTitle = useCallback(() => {
    const selectedValue = selectText.current?.value || "";
    const selectedField = selectText2.current?.value;

    if (!selectedValue.trim()) {
      Swal.fire({
        icon: "warning",
        title: "검색어 입력",
        text: "검색어를 입력해주세요.",
      });
      // 검색어가 비어있을 경우 전체 게시판 데이터로 초기화
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
      if (res.resultType == "empty") {
        Swal.fire({
          icon: "info",
          title: "게시판 없음",
          text: "현재 관리해야 할 게시판이 없습니다.",
        });
        setBoard([]);
      } else {
        const uniqueItems = res.pageDTO.list.map((commit: BoardType) => ({
          boardId: commit.boardId || "",
          title: commit.title || "",
          content: commit.content || "",
        }));
        TotalPage.current = res.pageDTO.pageCount;
        setAllBoards(uniqueItems);
        setBoard(uniqueItems);
      }
    });
  }, [CurrentPage]);

  const handlewriting = () => {
    nativeGate(GateWayNumber.Client + "/" + ClientGateWayType.ServiceInsert);
  };

  const handleRowClick = (BoardId: string) => {
    nativeGate(GateWayNumber.Client + `/editBoard/${BoardId}`);
  };

  const handleDeleteClick = (boardId: string) => {
    if (boardId !== "") {
      setSelectedBoardId(boardId);
      setInputPassword("");
      setInputPassword2("");
      setShowPasswordModal(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "오류",
        text: "게시판 아이디를 가져오는데 실패했습니다.",
      });
    }
  };

  const confirmDelete = async () => {
    if (!inputPassword || !inputPassword2) {
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: "비밀번호와 비밀번호 확인을 모두 입력해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }

    if (inputPassword !== inputPassword2) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 불일치",
        text: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        confirmButtonText: "확인",
      });
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
      Swal.fire({
        icon: "success",
        title: "삭제 성공",
        text: "게시판이 성공적으로 삭제되었습니다.",
        confirmButtonText: "확인",
      });
      setBoard((prev) => prev?.filter((b) => b.boardId !== selectedBoardId));
      setAllBoards((prev) =>
        prev?.filter((b) => b.boardId !== selectedBoardId)
      );
      setShowPasswordModal(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text: res.message || "비밀번호가 일치하지 않거나 삭제에 실패했습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  const onMobileSearchClick = () => {
    setShowSearchModal(true);
  };

  return (
    <div className="flex flex-col gap-2 p-10 max-sm:p-2">
      <div className="flex items-center gap-2 mt-12">
        <div className="text-gray-800 font-medium text-2xl max-sm:text-xl">
          질문 게시판
        </div>
      </div>
      <div className="text-gray-600 text-sm mb-7 font-serif max-sm:mb-3">
        {ismobile
          ? "질문 사항은 게시판에 남겨주셔도 답변드립니다."
          : "전화는 부끄럽다구요? 게시판에 남겨주세요. 아래에 게시판에 남겨주셔도 최대한 빠르게 답변해드리겠습니다."}
      </div>

      <div
        className={`${
          ismobile
            ? "bg-slate-300 w-full h-2/5"
            : "flex flex-col gap-4 mt-4 bg-slate-300 w-full h-2/5 p-6"
        }`}
      >
        <div className="flex flex-col gap-2 w-full h-full bg-amber-600 rounded-lg shadow-md p-4 max-sm:p-2">
          <div className="text-gray-700 font-semibold text-base md:text-lg">
            <span className="mr-2 font-normal text-gray-500 max-sm:text-sm">
              전체 페이지 수:
            </span>
            <span className="text-blue-600 font-bold">
              {TotalPage.current || 0}
            </span>
          </div>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-fixed">
            <thead className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase">
              <tr>
                <th className="px-6 py-3 w-1/15 text-center max-sm">No.</th>
                {/* 모바일일 때 제목 넓게 */}
                <th
                  className={
                    ismobile
                      ? "px-3 py-3 w-3/4 text-left"
                      : "px-6 py-3 w-1/4 text-left"
                  }
                >
                  제목
                </th>
                {ismobile ? null : (
                  <th className="px-6 py-3 text-left w-3/5">내용</th>
                )}
                {/* 모바일일 때 삭제 버튼 셀 최소화 */}
                <th
                  className={
                    ismobile
                      ? "px-2 py-3 w-12 text-left"
                      : "px-6 py-3 w-1/2 text-left"
                  }
                >
                  삭제
                </th>
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
                    {/* 제목 셀 너비 조건부 */}
                    <td
                      className={`border py-3 ${
                        ismobile ? "px-3 w-3/4" : "px-6 w-1/4"
                      }`}
                    >
                      {item.title}
                    </td>
                    {ismobile ? null : (
                      <td className="border px-6 py-3 max-w-[200px] truncate">
                        {item.content}
                      </td>
                    )}
                    {/* 삭제 버튼 셀 최소화 + 클릭 이벤트 전파 막기 */}
                    <td
                      className={`flex border items-center py-3 ${
                        ismobile ? "px-2 w-12 justify-center" : "px-6"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDeleteClick(item.boardId || "")}
                        className={`h-5 rounded-[5px] ${
                          ismobile
                            ? "w-10 bg-teal-100 text-xs"
                            : "w-20 bg-teal-100"
                        }`}
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
                    className="text-center py-10 text-blue-600 font-bold text-lg border-t max-sm:text-sm"
                  >
                    관리해야 할 질문이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PageNavigator
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            TotalPage={TotalPage}
          />

          <div
            className={`flex items-center w-full ${
              ismobile ? "justify-around gap-2" : "justify-center gap-10 "
            }`}
          >
            {/* 모바일일 땐 검색 버튼 왼쪽 끝, 아니면 기존 UI */}
            {ismobile ? (
              <button
                onClick={onMobileSearchClick}
                className="h-8 text-sm  bg-blue-500 text-white px-3 rounded-lg hover:bg-blue-600 transition 
             max-sm:h-8 sm-max:w-[100px] max-sm:px-6"
              >
                검색
              </button>
            ) : (
              <>
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
              </>
            )}

            {/* 글쓰기 버튼은 항상 오른쪽 끝에 위치 */}
            <button
              onClick={handlewriting}
              className={`bg-green-500 text-white rounded-lg hover:bg-green-600 transition ${
                ismobile ? "h-8 w-[100px] px-3 text-sm" : "h-[40px] px-4"
              }`}
            >
              글쓰기
            </button>
          </div>

          {/* 모바일 검색 모달 */}
          {showSearchModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[90%] max-w-sm">
                <h3 className="text-lg font-semibold">검색하기</h3>

                <select
                  ref={selectText2}
                  className="w-full h-[40px] border border-gray-300 rounded-lg px-2"
                  defaultValue="title"
                >
                  <option value="title">제목</option>
                  <option value="content">내용</option>
                </select>

                <input
                  type="text"
                  className="w-full h-[40px] border border-gray-300 rounded-lg px-3"
                  placeholder="검색어를 입력하세요"
                  ref={selectText}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      selectTitle();
                      setShowSearchModal(false);
                    }
                  }}
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      selectTitle();
                      setShowSearchModal(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    검색
                  </button>
                  <button
                    onClick={() => setShowSearchModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 비밀번호 입력 모달 */}
          {showPasswordModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[90%] max-w-sm">
                <h3 className="text-lg font-semibold">
                  게시판 삭제 비밀번호 입력
                </h3>
                <input
                  type="password"
                  className="w-full h-[40px] border border-gray-300 rounded-lg px-3"
                  placeholder="비밀번호"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full h-[40px] border border-gray-300 rounded-lg px-3"
                  placeholder="비밀번호 확인"
                  value={inputPassword2}
                  onChange={(e) => setInputPassword2(e.target.value)}
                />
                <div className="flex justify-end gap-2">
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
