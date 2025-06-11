import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { paths } from "@/config/paths/paths";
import { DELETE, GET } from "@/config/request/axios/axiosInstance";
import "@/SCSS/tailwind.scss";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageNavigator } from "./PageNavigator";
import Swal from "sweetalert2";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
const CommentQuestion = () => {
    const [Board, setBoard] = useState([]);
    const [allBoards, setAllBoards] = useState([]); // 전체 데이터 보관
    const selectText = useRef(null);
    const selectText2 = useRef(null);
    const nativeGate = useNavigate();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
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
        }
        else if (selectedField === "content") {
            filtered = allBoards.filter((item) => item.content.includes(selectedValue));
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
            }
            else {
                const uniqueItems = res.pageDTO.list.map((commit) => ({
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
    const handleRowClick = (BoardId) => {
        nativeGate(GateWayNumber.Client + `/editBoard/${BoardId}`);
    };
    const handleDeleteClick = (boardId) => {
        if (boardId !== "") {
            setSelectedBoardId(boardId);
            setInputPassword("");
            setInputPassword2("");
            setShowPasswordModal(true);
        }
        else {
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
            setAllBoards((prev) => prev?.filter((b) => b.boardId !== selectedBoardId));
            setShowPasswordModal(false);
        }
        else {
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
    return (_jsxs("div", { className: "flex flex-col gap-2 p-10 max-sm:p-2", children: [_jsx("div", { className: "flex items-center gap-2 mt-12", children: _jsx("div", { className: "text-gray-800 font-medium text-2xl max-sm:text-xl", children: "\uC9C8\uBB38 \uAC8C\uC2DC\uD310" }) }), _jsx("div", { className: "text-gray-600 text-sm mb-7 font-serif max-sm:mb-3", children: ismobile
                    ? "질문 사항은 게시판에 남겨주셔도 답변드립니다."
                    : "전화는 부끄럽다구요? 게시판에 남겨주세요. 아래에 게시판에 남겨주셔도 최대한 빠르게 답변해드리겠습니다." }), _jsx("div", { className: `${ismobile
                    ? "bg-slate-300 w-full h-2/5"
                    : "flex flex-col gap-4 mt-4 bg-slate-300 w-full h-2/5 p-6"}`, children: _jsxs("div", { className: "flex flex-col gap-2 w-full h-full bg-amber-600 rounded-lg shadow-md p-4 max-sm:p-2", children: [_jsxs("div", { className: "text-gray-700 font-semibold text-base md:text-lg", children: [_jsx("span", { className: "mr-2 font-normal text-gray-500 max-sm:text-sm", children: "\uC804\uCCB4 \uD398\uC774\uC9C0 \uC218:" }), _jsx("span", { className: "text-blue-600 font-bold", children: TotalPage.current || 0 })] }), _jsxs("table", { className: "min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-fixed", children: [_jsx("thead", { className: "bg-gray-200 text-gray-600 text-sm font-semibold uppercase", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 w-1/15 text-center max-sm", children: "No." }), _jsx("th", { className: ismobile
                                                    ? "px-3 py-3 w-3/4 text-left"
                                                    : "px-6 py-3 w-1/4 text-left", children: "\uC81C\uBAA9" }), ismobile ? null : (_jsx("th", { className: "px-6 py-3 text-left w-3/5", children: "\uB0B4\uC6A9" })), _jsx("th", { className: ismobile
                                                    ? "px-2 py-3 w-12 text-left"
                                                    : "px-6 py-3 w-1/2 text-left", children: "\uC0AD\uC81C" })] }) }), _jsx("tbody", { className: "text-gray-700 text-sm", children: Board && Board.length > 0 ? (Board.map((item, index) => (_jsxs("tr", { className: "cursor-pointer hover:bg-gray-100", onClick: () => handleRowClick(item.boardId || ""), children: [_jsx("td", { className: "border px-6 py-3 text-center", children: index + 1 }), _jsx("td", { className: `border py-3 ${ismobile ? "px-3 w-3/4" : "px-6 w-1/4"}`, children: item.title }), ismobile ? null : (_jsx("td", { className: "border px-6 py-3 max-w-[200px] truncate", children: item.content })), _jsx("td", { className: `flex border items-center py-3 ${ismobile ? "px-2 w-12 justify-center" : "px-6"}`, onClick: (e) => e.stopPropagation(), children: _jsx("button", { onClick: () => handleDeleteClick(item.boardId || ""), className: `h-5 rounded-[5px] ${ismobile
                                                        ? "w-10 bg-teal-100 text-xs"
                                                        : "w-20 bg-teal-100"}`, children: "\uC0AD\uC81C" }) })] }, item.boardId)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "text-center py-10 text-blue-600 font-bold text-lg border-t max-sm:text-sm", children: "\uAD00\uB9AC\uD574\uC57C \uD560 \uC9C8\uBB38\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] }), _jsx(PageNavigator, { CurrentPage: CurrentPage, setCurrentPage: setCurrentPage, TotalPage: TotalPage }), _jsxs("div", { className: `flex items-center w-full ${ismobile ? "justify-around gap-2" : "justify-center gap-10 "}`, children: [ismobile ? (_jsx("button", { onClick: onMobileSearchClick, className: "h-8 text-sm  bg-blue-500 text-white px-3 rounded-lg hover:bg-blue-600 transition \r\n             max-sm:h-8 sm-max:w-[100px] max-sm:px-6", children: "\uAC80\uC0C9" })) : (_jsxs(_Fragment, { children: [_jsxs("select", { ref: selectText2, className: "w-[120px] h-[40px] border border-gray-300 rounded-lg px-2", children: [_jsx("option", { value: "title", children: "\uC81C\uBAA9" }), _jsx("option", { value: "content", children: "\uB0B4\uC6A9" })] }), _jsx("input", { type: "text", className: "w-[250px] h-[40px] border border-gray-300 rounded-lg px-3", placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694", ref: selectText, onKeyDown: (e) => {
                                                if (e.key === "Enter") {
                                                    selectTitle();
                                                }
                                            } }), _jsx("button", { onClick: selectTitle, className: "h-[40px] bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition", children: "\uAC80\uC0C9" })] })), _jsx("button", { onClick: handlewriting, className: `bg-green-500 text-white rounded-lg hover:bg-green-600 transition ${ismobile ? "h-8 w-[100px] px-3 text-sm" : "h-[40px] px-4"}`, children: "\uAE00\uC4F0\uAE30" })] }), showSearchModal && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[90%] max-w-sm", children: [_jsx("h3", { className: "text-lg font-semibold", children: "\uAC80\uC0C9\uD558\uAE30" }), _jsxs("select", { ref: selectText2, className: "w-full h-[40px] border border-gray-300 rounded-lg px-2", defaultValue: "title", children: [_jsx("option", { value: "title", children: "\uC81C\uBAA9" }), _jsx("option", { value: "content", children: "\uB0B4\uC6A9" })] }), _jsx("input", { type: "text", className: "w-full h-[40px] border border-gray-300 rounded-lg px-3", placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694", ref: selectText, onKeyDown: (e) => {
                                            if (e.key === "Enter") {
                                                selectTitle();
                                                setShowSearchModal(false);
                                            }
                                        } }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { onClick: () => {
                                                    selectTitle();
                                                    setShowSearchModal(false);
                                                }, className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600", children: "\uAC80\uC0C9" }), _jsx("button", { onClick: () => setShowSearchModal(false), className: "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400", children: "\uCDE8\uC18C" })] })] }) })), showPasswordModal && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[90%] max-w-sm", children: [_jsx("h3", { className: "text-lg font-semibold", children: "\uAC8C\uC2DC\uD310 \uC0AD\uC81C \uBE44\uBC00\uBC88\uD638 \uC785\uB825" }), _jsx("input", { type: "password", className: "w-full h-[40px] border border-gray-300 rounded-lg px-3", placeholder: "\uBE44\uBC00\uBC88\uD638", value: inputPassword, onChange: (e) => setInputPassword(e.target.value) }), _jsx("input", { type: "password", className: "w-full h-[40px] border border-gray-300 rounded-lg px-3", placeholder: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778", value: inputPassword2, onChange: (e) => setInputPassword2(e.target.value) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { onClick: confirmDelete, className: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600", children: "\uC0AD\uC81C" }), _jsx("button", { onClick: () => setShowPasswordModal(false), className: "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400", children: "\uCDE8\uC18C" })] })] }) }))] }) })] }));
};
export default CommentQuestion;
