import { useParams } from "react-router-dom";
import "@/SCSS/tailwind.scss";
import { useEffect, useRef, useState } from "react";
import { BoardType } from "@/types/Feature/Boards/Board";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/config/reduxstore";
import { LoginCheck } from "@/Components/Common/header/api/Logincheck";
import { logout } from "@/config/request/ReduxList/userlogin";
import { setSession } from "@/config/request/ReduxList/useauthSlice";
import { DELETE } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { CommentValueType } from "@/types/Feature/Boards/Comment";
import {
  BoardPOST,
  CommentInsert,
  CommentPOST,
  DateUpdate,
} from "./API/BoardAPI";
import Swal from "sweetalert2";

interface Commit {
  commentId: number;
  type: string;
  comment: string;
  password: string;
  createdAt?: string;
}

const ServiceBoard = () => {
  const param = useParams();
  const [dummy, setDummy] = useState<BoardType>();
  const [commit, setCommit] = useState<Commit[]>();
  const ref1 = useRef<HTMLInputElement | null>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const authSlice = useSelector((state: RootState) => state.auth.value);
  const [Model, setModel] = useState<boolean>(false);
  const [deleteid, setdeleteid] = useState<number>(0);
  const [mobileModal, setMobileModal] = useState(false);

  useEffect(() => {
    LoginCheck().then((res) => {
      if (res.resultType === "success") {
        dispatch(logout());
        dispatch(
          setSession({
            isAuthenticated: true,
            userId: res.data.userid,
          })
        );
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
      const comment: CommentValueType = {
        boardId: param.BoardId || "",
        comment: inputCommit,
        password,
        type: authSlice.isAuthenticated ? "관리자" : "고객",
      };
      SaveComment(comment);
    }

    if (ref1.current) ref1.current.value = "";
    if (ref2.current) ref2.current.value = "";
    setMobileModal(false); // 모달 닫기 (모바일용)
  };

  const SaveComment = async (input: CommentValueType) => {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "동의 필요",
          text: "개인정보 수집 및 이용 동의를 해주세요.",
          confirmButtonText: "확인",
        });
      }
    });
  };

  const handCommentDelete = async (code: number) => {
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
        } else {
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
    } else {
      Swal.fire({
        icon: "error",
        title: "비밀번호 불일치",
        text: "두 비밀번호가 일치하지 않습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="w-screen overflow-x-hidden min-h-screen bg-gray-50 p-6">
      <div className="max-w-screen-md mx-auto space-y-6">
        {/* 게시글 */}
        <div className="bg-white rounded-lg shadow p-6 border">
          {dummy ? (
            <>
              <div className="flex justify-between items-center text-gray-600 mb-4">
                <div className="text-sm">NO. {dummy.boardId}</div>
                <div className="text-xl font-semibold text-gray-800">
                  {dummy.title}
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md min-h-[150px] text-gray-700">
                {dummy.content}
              </div>
            </>
          ) : (
            <div className="text-gray-500">데이터가 없습니다.</div>
          )}
        </div>

        {/* 댓글 입력 (PC) */}
        <div className="hidden sm:flex items-center justify-center gap-4 bg-yellow-100 shadow-md rounded-lg p-4">
          <input
            className="flex-1 bg-white h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 shadow-sm"
            type="text"
            placeholder="댓글을 입력하세요"
            ref={ref1}
          />
          <input
            className="flex-1 bg-white h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 shadow-sm"
            type="password"
            placeholder="비밀번호를 입력하세요"
            ref={ref2}
          />
          <button
            onClick={handleInput}
            className="bg-red-500 text-white px-6 h-12 rounded-lg font-semibold hover:bg-red-600 transition shadow"
          >
            작성
          </button>
        </div>

        {/* 모바일 작성 버튼 */}
        <div className="sm:hidden flex justify-center mt-6 px-4">
          <button
            onClick={() => setMobileModal(true)}
            className="w-full bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg max-w-md"
          >
            댓글 작성
          </button>
        </div>
        {/* 모바일 모달 */}
        {mobileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm space-y-4">
              <h2 className="text-lg font-bold">댓글 작성</h2>
              <input
                ref={ref1}
                type="text"
                placeholder="댓글을 입력하세요"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                ref={ref2}
                type="password"
                placeholder="비밀번호 입력"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleInput}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  작성
                </button>
                <button
                  onClick={() => setMobileModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 삭제 모달 */}
        {Model && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-semibold text-center mb-4">
                정말로 댓글을 삭제하실 건가요?
              </h2>
              <input
                type="password"
                placeholder="삭제용 비밀번호"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                ref={ref1}
              />
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                ref={ref2}
              />
              <div className="flex justify-between">
                <button
                  onClick={handleInputdelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  삭제
                </button>
                <button
                  onClick={() => setModel(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 댓글 리스트 */}
        <div className="bg-white rounded-lg shadow p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">댓글</h2>
          {commit && commit.length > 0 ? (
            <div className="space-y-4">
              {commit.map((item) => (
                <div
                  key={item.commentId}
                  className={`group p-4 rounded-lg border shadow-sm relative ${
                    item.type === "관리자"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {item.type}
                    </span>
                    {item.type === "고객" ? (
                      <button
                        onClick={() => handCommentDelete(item.commentId)}
                        className="text-xs text-red-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        삭제
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">삭제불가</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-800">{item.comment}</div>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {item.createdAt ? DateUpdate(item.createdAt) : ""}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">현재 댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceBoard;
