// ServiceProfiling.ts
import bathsroom from "@/Components/Common/assets/bathroom.jpg";
import cleaningroom from "@/Components/Common/assets/cleaningroom.jpg";
import divcleaning from "@/Components/Common/assets/divcleaning.jpg";
import bathsrooms from "@/Components/Common/assets/bathsrooms.png";
import RoomClean from "@/Components/Common/assets/RoomClean.jpg";
import two_image from "@/Components/Common/assets/cleaning_blog_assets/two_image.jpg";
import there_image from "@/Components/Common/assets/cleaning_blog_assets/there_image.jpg";
import building from "@/Components/Common/assets/cleaning_blog_assets/building.png";
import post_construction from "@/Components/Common/assets/cleaning_blog_assets/post-construction.png";

export interface Service {
  Service: string;
  image: string;
  target: string;
}

export const ServiceProfiling: Service[] = [
  {
    Service: "전체보기",
    image: bathsrooms,
    target: "View All Services",
  },
  {
    Service: "이사청소",
    image: cleaningroom,
    target: "Post-tenant Cleaning",
  },
  {
    Service: "입주청소",
    image: divcleaning,
    target: "Post-construction Cleaning",
  },
  {
    Service: "주거청소",
    image: two_image,
    target: "Residential Cleaning",
  },
  {
    Service: "계단청소",
    image: there_image,
    target: "Stairwell Cleaning",
  },
  {
    Service: "새집증후군",
    image: RoomClean,
    target: "New Home Syndrome Removal",
  },
  {
    Service: "건물청소",
    image: building,
    target: "Commercial Cleaning",
  },
  {
    Service: "준공청소",
    image: post_construction,
    target: "Post-construction Cleaning",
  },
  {
    Service: "부분청소",
    image: bathsroom,
    target: "Partial Cleaning",
  },
];
