import { paths } from "@/config/paths/paths";
import { GET } from "@/config/request/axios/axiosInstance";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Notice } from "./Component/type";
import { Greeting } from "./Component/Greeting";
import { NoticeDetailType } from "@/types/Feature/Notice/NoticeAll";
import { Slider } from "@/Components/Common/ui/Slider/Slider";

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

  return (
    <>
      <div className="p-10">
        {notice && (
          <div>
            <h1 className="text-2xl font-bold text-center bg-yellow-50 rounded-t-lg p-5">
              {notice.title}
            </h1>
            {notice.titleimg && (
              <img
                src={notice.titleimg}
                alt="Title Image"
                className="w-full h-[300px] object-cover"
              />
            )}
            <p className="text-gray-700 text-right bg-orange-100 p-3">
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
        <div className="flex flex-col md:flex-row items-start mt-10 gap-5 px-4">
          {/* 소개 영역 */}
          <div className="bg-slate-400 text-white p-10 rounded-xl shadow-md flex-1 hover:shadow-lg cursor-pointer transition-all duration-200">
            <div className="text-xl font-bold mb-2 text-blue-500">
              Clean & Cleaning Service
            </div>
            <div className="text-sm text-[10px]">
              가족 같은 마음으로, 청소에 임합니다.
            </div>
            <div className="text-sm text-[10px]">
              입주, 이사, 거주, 준공 청소의 모든 것!
            </div>
            <div className="text-sm text-[10px] font-semibold mt-2">
              청소는{" "}
              <strong className="font-bold text-black">은하수홈케어</strong>와
              함께!
            </div>
          </div>

          {/* Information 버튼 */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1 hover:bg-slate-100 hover:shadow-lg cursor-pointer transition-all duration-200">
            <span className="block text-lg font-semibold mb-1 text-slate-800">
              Information
            </span>
            <span className="text-sm text-gray-600">이용안내</span>
          </div>

          {/* Contact 버튼 */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1 hover:bg-slate-100 hover:shadow-lg cursor-pointer transition-all duration-200">
            <span className="block text-lg font-semibold mb-1 text-slate-800">
              Contact
            </span>
            <span className="text-sm text-gray-600">견적 문의</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
