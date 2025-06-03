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
      <div>
        {notice && (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {notice.title}
            </h1>
            <p className="text-gray-700 mb-2 text-right">Type: {notice.type}</p>
            {notice.titleimg && (
              <img
                src={notice.titleimg}
                alt="Title Image"
                className="w-full h-[300px] object-cover rounded-lg mb-4"
              />
            )}
            <Greeting GreetingText={notice.greeting || ""} />
          </div>
        )}
        {noticeDetails.length > 0 ? (
          <div className="p-4">
            {noticeDetails.map((detail, index) => (
              <div key={index} className="space-y-2 gap-10">
                <h2 className="text-center font-bold">
                  {detail.direction} 청소 이전 사진
                </h2>
                <div className="mb-4 p-4 flex justify-center">
                  <Slider URL={detail.beforeURL} />
                </div>
                <h2 className="text-center font-bold">
                  {detail.direction} 청소 이후 사진
                </h2>
                <div className="mb-4 p-4 flex justify-center">
                  <Slider URL={detail.afterURL} />
                </div>
                <div className="text-gray-600  p-10">
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
      </div>
    </>
  );
};

export default ServiceDetail;
