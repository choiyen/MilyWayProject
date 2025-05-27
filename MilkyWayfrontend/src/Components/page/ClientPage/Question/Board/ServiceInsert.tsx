import { paths } from "@/config/paths/paths";
import { RootState } from "@/config/reduxstore";
import { POST } from "@/config/request/axios/axiosInstance";
import { setBoardData } from "@/config/request/ReduxList/BoardReducer";
import "@/SCSS/tailwind.scss";
import { GateWayNumber } from "@/types/GateWay/GateWayType";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ServiceInsert = () => {
  const [password, setpassword] = useState<string>("");
  const [Check, setCheck] = useState<string>("");
  const nativeGate = useNavigate();
  const dispatch = useDispatch();
  const BoardData = useSelector((state: RootState) => state.Board.value);
  const checkEmptyFields = () => {
    if (
      BoardData.title === "" ||
      BoardData.content === "" ||
      password === "" ||
      Check === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "입력되지 않은 데이터가 존재합니다.",
        text: "모든 필드를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return false;
    }

    return true;
  };

  const handleBoard = async () => {
    if (checkEmptyFields()) {
      if (password === Check) {
        dispatch(setBoardData({ ...BoardData, password: password }));
        await POST({
          url: paths.forum.Board.basic.path,
          data: {
            title: BoardData.title,
            content: BoardData.content,
            password: BoardData.password,
          },
        }).then((res) => {
          if (res.resultType === "success") {
            Swal.fire({
              icon: "success",
              title: "Q&A 요청 생성 완료",
              text: "요청이 성공적으로 생성되었습니다.",
              confirmButtonText: "확인",
            });
            nativeGate(
              GateWayNumber.Client + "/" + `editService/${res.data[0].boardId}`
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Q&A 요청 생성 실패",
              text: "요청 생성 중 오류가 발생했습니다. 전화로 문의해주세요.",
              confirmButtonText: "확인",
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "비밀번호 불일치",
          text: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
          confirmButtonText: "확인",
        });
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm("정말 취소할 건가여?")) {
      Swal.fire({
        icon: "info",
        title: "취소됨",
        text: "질문 등록이 취소되었습니다.",
        confirmButtonText: "확인",
      });
      nativeGate(-1);
    } else {
      toast.error("사용자가 취소를 눌렀습니다.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          질문 등록
        </h2>

        <div className="space-y-6">
          {/* 제목 입력 */}
          <div className="flex items-center">
            <label
              htmlFor="title"
              className="w-24 text-lg font-medium text-gray-700"
            >
              제목
            </label>
            <input
              id="title"
              type="text"
              value={BoardData.title}
              placeholder="제목을 입력하세요"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                dispatch(setBoardData({ ...BoardData, title: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="w-24 text-lg font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="제목을 입력하세요"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="check"
              className="w-24 text-lg font-medium text-gray-700"
            >
              비번확인
            </label>
            <input
              id="check"
              type="password"
              value={Check}
              placeholder="비밀번호를 다시 입력하세요"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCheck(e.target.value)}
            />
          </div>
          {/* 내용 입력 */}
          <div className="flex items-start">
            <label
              htmlFor="commit"
              className="mt-30 w-24 pt-2 text-lg font-medium text-gray-700"
            >
              내용
            </label>
            <textarea
              id="commit"
              value={BoardData.content}
              placeholder="질문 내용을 입력하세요"
              className="flex-1 h-60 border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                dispatch(
                  setBoardData({ ...BoardData, content: e.target.value })
                )
              }
            />
          </div>
        </div>

        <div className="flex justify-evenly gap-4 pt-6">
          <button
            onClick={handleBoard}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            생성
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

// 고객 질문 등록 페이지
export default ServiceInsert;
