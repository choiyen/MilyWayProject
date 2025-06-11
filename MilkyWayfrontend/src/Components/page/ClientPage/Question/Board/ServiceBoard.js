import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import "@/SCSS/tailwind.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginCheck } from "@/Components/Common/header/api/Logincheck";
import { logout } from "@/config/request/ReduxList/userlogin";
import { setSession } from "@/config/request/ReduxList/useauthSlice";
import { DELETE } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { BoardPOST, CommentInsert, CommentPOST, DateUpdate, } from "./API/BoardAPI";
import Swal from "sweetalert2";
const ServiceBoard = () => {
    const param = useParams();
    const [dummy, setDummy] = useState();
    const [commit, setCommit] = useState();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const dispatch = useDispatch();
    const authSlice = useSelector((state) => state.auth.value);
    const [Model, setModel] = useState(false);
    const [deleteid, setdeleteid] = useState(0);
    const [mobileModal, setMobileModal] = useState(false);
    useEffect(() => {
        LoginCheck().then((res) => {
            if (res.resultType === "success") {
                dispatch(logout());
                dispatch(setSession({
                    isAuthenticated: true,
                    userId: res.data.userid,
                }));
            }
        });
    }, []);
    useEffect(() => {
        const boardId = param.BoardId;
        if (boardId) {
            BoardPOST(boardId).then((res) => {
                setDummy(res.data[0]);
            });
            CommentPOST(boardId).then((res) => {
                setCommit(res.data);
            });
        }
    }, [param]);
    const handleInput = () => {
        const inputCommit = ref1.current?.value || "";
        const password = ref2.current?.value || "";
        if (inputCommit && password) {
            const comment = {
                boardId: param.BoardId || "",
                comment: inputCommit,
                password,
                type: authSlice.isAuthenticated ? "관리자" : "고객",
            };
            SaveComment(comment);
        }
        if (ref1.current)
            ref1.current.value = "";
        if (ref2.current)
            ref2.current.value = "";
        setMobileModal(false); // 모달 닫기 (모바일용)
    };
    const SaveComment = async (input) => {
        CommentInsert(input).then((res) => {
            if (res.resultType === "success") {
                setCommit((prev) => [
                    ...(prev || []),
                    {
                        commentId: Number(input.commentId) || Date.now(),
                        type: input.type,
                        comment: input.comment,
                        password: input.password,
                        createdAt: new Date().toISOString(),
                    },
                ]);
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "동의 필요",
                    text: "개인정보 수집 및 이용 동의를 해주세요.",
                    confirmButtonText: "확인",
                });
            }
        });
    };
    const handCommentDelete = async (code) => {
        setModel(true);
        setdeleteid(code);
    };
    const handleInputdelete = async () => {
        const password = ref1.current?.value;
        const password2 = ref2.current?.value;
        if (password === password2) {
            await DELETE({
                url: paths.forum.Comment.basic.path,
                data: {
                    boardId: param.BoardId || "",
                    commentId: deleteid,
                    password,
                },
            }).then((res) => {
                if (res.resultType === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "삭제 실패",
                        text: "비밀번호가 일치하지 않습니다.",
                        confirmButtonText: "확인",
                    });
                }
                else {
                    Swal.fire({
                        icon: "success",
                        title: "삭제 완료",
                        text: "댓글이 삭제되었습니다.",
                        confirmButtonText: "확인",
                    });
                    setCommit(commit?.filter((c) => c.commentId !== deleteid));
                    setModel(false);
                }
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "비밀번호 불일치",
                text: "두 비밀번호가 일치하지 않습니다.",
                confirmButtonText: "확인",
            });
        }
    };
    return (_jsx("div", { className: "w-screen overflow-x-hidden min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-screen-md mx-auto space-y-6", children: [_jsx("div", { className: "bg-white rounded-lg shadow p-6 border", children: dummy ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center text-gray-600 mb-4", children: [_jsxs("div", { className: "text-sm", children: ["NO. ", dummy.boardId] }), _jsx("div", { className: "text-xl font-semibold text-gray-800", children: dummy.title })] }), _jsx("div", { className: "bg-gray-100 p-4 rounded-md min-h-[150px] text-gray-700", children: dummy.content })] })) : (_jsx("div", { className: "text-gray-500", children: "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) }), _jsxs("div", { className: "hidden sm:flex items-center justify-center gap-4 bg-yellow-100 shadow-md rounded-lg p-4", children: [_jsx("input", { className: "flex-1 bg-white h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 shadow-sm", type: "text", placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694", ref: ref1 }), _jsx("input", { className: "flex-1 bg-white h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 shadow-sm", type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694", ref: ref2 }), _jsx("button", { onClick: handleInput, className: "bg-red-500 text-white px-6 h-12 rounded-lg font-semibold hover:bg-red-600 transition shadow", children: "\uC791\uC131" })] }), _jsx("div", { className: "sm:hidden flex justify-center mt-6 px-4", children: _jsx("button", { onClick: () => setMobileModal(true), className: "w-full bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg max-w-md", children: "\uB313\uAE00 \uC791\uC131" }) }), mobileModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white rounded-lg p-6 w-11/12 max-w-sm space-y-4", children: [_jsx("h2", { className: "text-lg font-bold", children: "\uB313\uAE00 \uC791\uC131" }), _jsx("input", { ref: ref1, type: "text", placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694", className: "w-full border border-gray-300 p-2 rounded" }), _jsx("input", { ref: ref2, type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uC785\uB825", className: "w-full border border-gray-300 p-2 rounded" }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { onClick: handleInput, className: "bg-yellow-500 text-white px-4 py-2 rounded", children: "\uC791\uC131" }), _jsx("button", { onClick: () => setMobileModal(false), className: "bg-gray-300 px-4 py-2 rounded", children: "\uCDE8\uC18C" })] })] }) })), Model && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-80", children: [_jsx("h2", { className: "text-lg font-semibold text-center mb-4", children: "\uC815\uB9D0\uB85C \uB313\uAE00\uC744 \uC0AD\uC81C\uD558\uC2E4 \uAC74\uAC00\uC694?" }), _jsx("input", { type: "password", placeholder: "\uC0AD\uC81C\uC6A9 \uBE44\uBC00\uBC88\uD638", className: "w-full px-4 py-2 border border-gray-300 rounded-md mb-4", ref: ref1 }), _jsx("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778", className: "w-full px-4 py-2 border border-gray-300 rounded-md mb-4", ref: ref2 }), _jsxs("div", { className: "flex justify-between", children: [_jsx("button", { onClick: handleInputdelete, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md", children: "\uC0AD\uC81C" }), _jsx("button", { onClick: () => setModel(false), className: "bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-md", children: "\uCDE8\uC18C" })] })] }) })), _jsxs("div", { className: "bg-white rounded-lg shadow p-6 border", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-gray-800", children: "\uB313\uAE00" }), commit && commit.length > 0 ? (_jsx("div", { className: "space-y-4", children: commit.map((item) => (_jsxs("div", { className: `group p-4 rounded-lg border shadow-sm relative ${item.type === "관리자"
                                    ? "bg-blue-50 border-blue-200"
                                    : "bg-gray-50 border-gray-200"}`, children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("span", { className: "text-sm font-semibold text-gray-700", children: item.type }), item.type === "고객" ? (_jsx("button", { onClick: () => handCommentDelete(item.commentId), className: "text-xs text-red-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: "\uC0AD\uC81C" })) : (_jsx("span", { className: "text-xs text-gray-400", children: "\uC0AD\uC81C\uBD88\uAC00" }))] }), _jsx("div", { className: "text-sm text-gray-800", children: item.comment }), _jsx("div", { className: "text-right text-xs text-gray-500 mt-1", children: item.createdAt ? DateUpdate(item.createdAt) : "" })] }, item.commentId))) })) : (_jsx("div", { className: "text-gray-500", children: "\uD604\uC7AC \uB313\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }))] })] }) }));
};
export default ServiceBoard;
