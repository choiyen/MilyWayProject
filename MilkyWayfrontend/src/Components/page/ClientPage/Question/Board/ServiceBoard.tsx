import { useParams } from "react-router-dom";
import "@/SCSS/tailwind.scss";
import { useEffect, useRef, useState } from "react";
import { BoardType } from "@/types/Feature/Boards/Board";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/config/reduxstore";
import { LoginCheck } from "@/Components/Common/header/api/Logincheck";
import { logout } from "@/config/request/ReduxList/userlogin";
import { setSession } from "@/config/request/ReduxList/useauthSlice";
import { DELETE, GET, POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { CommentValueType } from "@/types/Feature/Boards/Comment";

interface Commit {
  commentId: number;
  type: string;
  comment: string;
  password: string;
  createdAt?: string; // 추가
}

const ServiceBoard = () => {
  const param = useParams();
  const [dummy, setDummy] = useState<BoardType>();
  const [commit, setCommit] = useState<Commit[]>();
  const ref1 = useRef<HTMLInputElement | null>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);
  const authSlice = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();
  const [Model, setModel] = useState<boolean>(false);
  const [deleteid, setdeleteid] = useState<number>(0);

  useEffect(() => {
    LoginCheck().then((res) => {
      if (res.resultType === "success") {
        console.log("로그인 성공:", res);
        dispatch(logout()); // 세션 상태를 false로 설정
        dispatch(
          setSession({
            isAuthenticated: true,
            userId: res.data.userid,
          })
        ); // 세션 상태를 true로 설정
      }
    });
  }, []);

  const BoardPOST = async (boardId: string) => {
    return await GET({
      url: paths.forum.Board.search.path,
      params: {
        BoardId: boardId,
      },
    });
  };

  const CommentPOST = async (boardId: string) => {
    return await GET({
      url: paths.forum.Comment.search.Board.path,
      params: {
        BoardId: boardId,
      },
    });
  };

  useEffect(() => {
    const boardId = param.BoardId;
    if (boardId) {
      BoardPOST(boardId).then((res) => {
        console.log(res.data[0]);
        setDummy({
          boardId: res.data[0].boardId,
          title: res.data[0].title,
          content: res.data[0].content,
          password: res.data[0].password,
        });
      });

      CommentPOST(boardId).then((res) => {
        console.log(res.data);
        setCommit(res.data); // 전체 배열을 한 번에 상태에 넣음
      });
    }
  }, [param]);

  const DateUpdate = (isoString: string) => {
    const date = new Date(isoString);
    console.log("현재 날짜 :" + isoString);
    const formatted =
      `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}월 ${String(date.getDate()).padStart(2, "0")}일 ` +
      `${String(date.getHours()).padStart(2, "0")}시 ${String(
        date.getMinutes()
      ).padStart(2, "0")}분 ${String(date.getSeconds()).padStart(2, "0")}초`;

    return formatted;
  };

  const handleInput = () => {
    const inputCommit = ref1.current ? ref1.current.value : "";
    const password = ref2.current ? ref2.current.value : "";

    console.log(authSlice.isAuthenticated);
    let comment: CommentValueType;
    if (inputCommit !== "" && password !== "") {
      if (authSlice.isAuthenticated === true) {
        comment = {
          boardId: param.BoardId || "",
          comment: inputCommit,
          password: password,
          type: "관리자",
        };
      } else {
        comment = {
          boardId: param.BoardId || "",
          comment: inputCommit,
          password: password,
          type: "고객",
        };
      }
      SaveComment(comment);
    }
    if (ref1.current) {
      ref1.current.value = "";
    }
    if (ref2.current) {
      ref2.current.value = "";
    }
  };

  const SaveComment = async (input: CommentValueType) => {
    return await POST({
      url: paths.forum.Comment.basic.path,
      data: {
        boardId: input.boardId,
        type: input.type,
        comment: input.comment,
        password: input.password,
      },
    }).then((res) => {
      console.log(res.data);
      if (res.resultType === "success") {
        setCommit((prev) => [
          ...(prev || []),
          {
            commentId: Number(input.commentId) || 0, // Ensure commentId is number
            type: input.type,
            comment: input.comment,
            password: input.password,
            createdAt: new Date().toISOString(),
          },
        ]);
      } else {
        alert("댓글 저장 불가");
      }
    });
  };

  const handCommentDelete = async (code: number) => {
    setModel(!Model);
    console.log(code);
    setdeleteid(code);
  };

  const handleInputdelete = async () => {
    const password = ref1.current?.value;
    const password2 = ref2.current?.value;
    if (password === password2) {
      console.log("실행");
      await DELETE({
        url: paths.forum.Comment.basic.path,
        data: {
          boardId: param.BoardId || "",
          commentId: deleteid,
          password: password,
        },
      }).then((res) => {
        console.log(res);
        setCommit(commit?.filter((state) => state.commentId !== deleteid));
        setdeleteid(0);
        setModel(false);
      });
    } else {
      alert("삭제 명령을 수행할 수 없습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-screen-md mx-auto space-y-6">
        {/* 게시글 섹션 */}
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

        {/* 댓글 입력창 */}
        <div className="flex items-center justify-center gap-4 bg-yellow-100 shadow-md rounded-lg p-4">
          <input
            className="flex-1 bg-white text-gray-800 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
            type="text"
            placeholder="댓글을 입력하세요"
            ref={ref1}
          />
          <input
            className="flex-1 bg-white text-gray-800 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
            type="password"
            placeholder="게시판 비밀번호를 입력하세요"
            ref={ref2}
          />
          <button
            onClick={handleInput}
            className="bg-red-500 text-white px-6 h-12 rounded-lg font-semibold hover:bg-red-600 transition duration-200 shadow"
          >
            작성
          </button>
        </div>

        {Model && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-semibold text-center mb-4">
                정말로 댓글을 삭제하실 건가요?
              </h2>
              <input
                type="password"
                placeholder="삭제하기 위한 비밀번호"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                ref={ref1}
              />
              <input
                type="password"
                placeholder="삭제하기 위한 비밀번호 확인"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
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

        {/* 댓글 섹션 */}
        <div className="bg-white rounded-lg shadow p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">댓글</h2>
          {commit && commit.length > 0 ? (
            <div className="space-y-4">
              {commit.map((item, index) => (
                <div
                  key={index}
                  className={`group p-4 rounded-lg shadow-sm border relative ${
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
                  <div className="flex justify-end">
                    <div className="text-sm text-gray-800">
                      {item.createdAt ? DateUpdate(item.createdAt) : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">
              현재 해당 게시판에는 댓글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceBoard;
