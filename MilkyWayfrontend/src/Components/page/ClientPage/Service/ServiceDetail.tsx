import { paths } from "@/config/paths/paths";
import { GET } from "@/config/request/axios/axiosInstance";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Notice } from "./Component/type";
import { Greeting } from "./Component/Greeting";
import { NoticeDetailType } from "@/types/Feature/Notice/NoticeAll";
import { Slider } from "@/Components/Common/ui/Slider/Slider";
import maincart from "./Type/cb61434e-cdfa-41d3-9b4e-79f14556d81b.png";
import { InquireText } from "../Main/Component/InquireText";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";
const ServiceDetail = () => {
  const { ServiceId } = useParams<{ ServiceId: string }>();
  console.log("Service ID:", ServiceId);
  const [notice, setNotice] = useState<Notice>();
  const [noticeDetails, setNoticeDetails] = useState<NoticeDetailType[]>([]);

  const fetchServiceDetails = async (id: string) => {
    try {
      await GET({
        url: paths.Notice.serach.path,
        params: { NoticeId: id },
      }).then((res) => {
        if (res.resultType === "success") {
          // 여기에 서비스 세부 정보를 처리하는 로직을 추가하세요.
          setNotice({
            noticeId: res.data[0].noticeId,
            title: res.data[0].title,
            type: res.data[0].type,
            titleimg: res.data[0].titleimg || "",
            greeting: res.data[0].greeting || "",
          });
          console.log("Notice Data:", res.data[0].noticeDetailEntities);
          setNoticeDetails(res.data[0].noticeDetailEntities);
        } else {
          console.error("Failed to fetch service details:", res);
        }
      });
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  useEffect(() => {
    fetchServiceDetails(ServiceId || "");
  }, [ServiceId]);

  useEffect(() => {
    console.log("Notice Details:", noticeDetails);
  }, [noticeDetails]);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="p-10 max-sm:p-0">
        {notice && (
          <div className="bg-slate-200">
            <h1 className="text-2xl font-bold text-center bg-yellow-50 rounded-t-lg p-5 max-sm:p-2">
              {notice.title}
            </h1>
            {notice.titleimg && (
              <img
                src={notice.titleimg}
                alt="Title Image"
                className="w-full h-[500px] object-cover p-5 max-sm:h-[400px]"
              />
            )}
            <p className="text-gray-700 text-right bg-orange-100 p-3 font-">
              Type: {notice.type}
            </p>
            <Greeting GreetingText={notice.greeting || ""} />
          </div>
        )}
        {noticeDetails.length > 0 ? (
          <div>
            {noticeDetails.map((detail, index) => (
              <div key={index}>
                <div className="bg-gray-100 p-5 flex flex-col justify-center items-center">
                  <Slider URL={detail.beforeURL} />
                  <h2 className="text-center font-bold">
                    {detail.direction} 청소 이전 사진
                  </h2>
                </div>
                <div className="bg-gray-100 p-5 flex flex-col justify-center items-center">
                  <Slider URL={detail.afterURL} />
                  <h2 className="text-center font-bold">
                    {detail.direction} 청소 이후 사진
                  </h2>
                </div>
                <div className="text-gray-600">
                  <Greeting GreetingText={detail.comment || ""} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No service details available.
          </div>
        )}
        <div className="grid grid-cols-3 gap-4 mt-10 px-4 max-sm:grid-cols-2 max-sm:gap-2 max-sm:px-2 mb-10">
          {/* 소개 카드 */}
          <div className="bg-blue-500 text-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 text-[10px] md:text-sm w-full max-sm:col-span-2">
            <div className="flex items-center max-sm:flex-col max-sm:text-center">
              {/* 이미지 영역 */}
              <div className="w-1/3 flex justify-center max-sm:w-full max-sm:mb-4">
                <img
                  className="w-3/4 max-sm:w-2/4"
                  src={maincart}
                  alt="마스코트이미지"
                />
              </div>
              {/* 텍스트 영역 */}
              <div className="w-2/3 max-sm:w-full max-sm:text-xl">
                <div>가족 같은 마음으로, 청소에 임합니다.</div>
                <div>입주, 이사, 거주, 준공 청소의 모든 것!</div>
                <div className="font-semibold mt-2 max-sm:text-[18px]">
                  청소는 <strong className="text-black">은하수홈케어</strong>와
                  함께!
                </div>
              </div>
            </div>
          </div>

          {/* Information 버튼 */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:bg-slate-100 hover:shadow-lg cursor-pointer transition-all duration-200 text-[10px] md:text-sm w-full">
            <Link to={GateWayNumber.Client + "/" + ClientGateWayType.Service}>
              <span className="block text-sm md:text-lg font-semibold mb-1 text-slate-800">
                Information
              </span>
              <span className="text-gray-600">이용안내</span>
            </Link>
          </div>

          {/* Contact 버튼 */}
          <div
            onClick={() => setOpenModal(true)}
            className="bg-slate-200 p-4 md:p-6 rounded-xl shadow-md hover:bg-slate-100 hover:shadow-lg cursor-pointer transition-all duration-200 text-[10px] md:text-sm w-full"
          >
            <span className="block text-sm md:text-lg font-semibold mb-1 text-slate-800">
              Contact
            </span>
            <span className="text-gray-600">견적 문의</span>
          </div>
        </div>

        {openModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="relative w-full md:w-auto md:min-w-[700px] bg-white rounded-t-2xl md:rounded-xl shadow-lg animate-slide-up md:animate-fade-in">
              {/* 닫기 버튼 */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
              >
                ✕
              </button>

              {/* 문의 입력 폼 */}
              <InquireText />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceDetail;
