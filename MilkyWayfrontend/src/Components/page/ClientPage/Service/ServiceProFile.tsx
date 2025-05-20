import { SelectBox } from "@/Components/Common/ui/Select/SelectBox";
import { paths } from "@/config/paths/paths";
import { GET, POST } from "@/config/request/axios/axiosInstance";
import "@/SCSS/tailwind.scss";
import { cleanType } from "@/types/cleanspace/cleanType";
import { useEffect, useState } from "react";

type SelectType = "전체" | (typeof cleanType)[number]; // Define SelectType directly using cleanType

const ServiceProFile = () => {
  const [select, setSelect] = useState<SelectType>("전체");
  const Typeconfig = ["전체", ...cleanType];
  console.log(select);
  const SelectType = async (type: string) => {
    if (type === "전체") {
      return await POST({
        url: paths.Notice.serach.path,
      });
    } else {
      return await GET({
        url: paths.Notice.Type.path,
        params: {
          type: type,
        },
      });
    }
  };
  useEffect(() => {
    SelectType(select).then((res) => {
      console.log(res);
    });
  }, [select]);
  return (
    <>
      <div>
        <SelectBox
          name={"분류 기준"}
          append={Typeconfig}
          value={select}
          setValue={setSelect}
        />
        서비스 소개와 관련된 페이지입니다. []
        <br /> (Advice 폴터와 관련 있음, 즉 청소 후기와 어떤 청소인지가 표시됨)
      </div>
    </>
  );
};

export default ServiceProFile;
