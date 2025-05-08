import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { TextAreaBox } from "@/Components/Common/ui/TextArea/TextAreaBox";
import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import "@/SCSS/tailwind.scss";
import { GateWayNumber } from "@/types/GateWay/GateWayType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceInsert = () => {
  const [title, settitle] = useState<string>("");
  const [commit, setcommit] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const nativeGate = useNavigate();

  const handleBoard = async () => {
    await POST({
      url: paths.forum.Board.basic.path,
      data: {
        title: title,
        content: commit,
        password: password,
      },
    }).then((res) => {
      if (res.resultType === "success") {
        alert("Q&A 요청 생성 완료");
        nativeGate(
          GateWayNumber.Client + "/" + `editService/${res.data[0].boardId}`
        );
      } else {
        alert("Q&A 요청 생성 도중 오류 발생!! 전화로 문의주세요");
      }
    });
  };

  const handleCancel = () => {
    if (confirm("정말 취소할 건가여?")) {
      console.log("사용자가 확인을 눌렀습니다.");
      nativeGate(-1);
    } else {
      console.log("사용자가 취소를 눌렀습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-300 px-4">
      <div className="w-full max-w-2xl bg-red-200 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          질문 등록
        </h2>

        <InputTextBox name={"제목"} Value={title} setValue2={settitle} />
        <InputTextBox
          name={"패스워드"}
          Value={password}
          setValue2={setpassword}
        />
        <TextAreaBox name={"내용"} Value={commit} setValue2={setcommit} />
        <div className="flex justify-center gap-6 pt-4">
          <button
            onClick={handleBoard}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            생성
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition duration-200"
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
