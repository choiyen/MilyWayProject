import apartments from "@/Components/Common/assets/clean_type/건물청소.png";
import step from "@/Components/Common/assets/clean_type/계단청소.png";
import tenants from "@/Components/Common/assets/clean_type/입주청소.png";
import advice from "@/Components/Common/assets/clean_type/주거청소.png";
import newhome from "@/Components/Common/assets/clean_type/새집증후군.png";
import movein from "@/Components/Common/assets/clean_type/이사청소.png";
import construction from "@/Components/Common/assets/clean_type/준공청소.png";
import depart from "@/Components/Common/assets/clean_type/부분청소.png";
export const cleanType = [
    "주거청소",
    "입주청소",
    "이사청소",
    "계단청소",
    "새집증후군",
    "건물청소",
    "준공청소",
    "부분청소",
];
export const cleaning = [
    {
        cleanType: "주거청소",
        description: "일상적인 주거 공간 청소 서비스입니다.",
        icon: advice,
    },
    {
        cleanType: "부분청소",
        description: "특정 부분만 청소하는 서비스입니다.",
        icon: depart,
    },
    {
        cleanType: "계단청소",
        description: "건물 내 계단 청소 서비스입니다.",
        icon: step,
    },
    {
        cleanType: "새집증후군",
        description: "새로 지은 집에서 발생하는 증후군을 예방하는 청소 서비스입니다.",
        icon: newhome,
    },
    {
        cleanType: "건물청소",
        description: "상업용 건물의 청소 서비스입니다.",
        icon: apartments,
    },
    {
        cleanType: "준공청소",
        description: "건축 완료 후 필요한 청소 서비스입니다.",
        icon: construction,
    },
    {
        cleanType: "이사청소",
        description: "이사 전후에 필요한 청소 서비스입니다.",
        icon: movein,
    },
    {
        cleanType: "입주청소",
        description: "새로운 집으로 이사할 때 필요한 청소 서비스입니다.",
        icon: tenants,
    },
];
