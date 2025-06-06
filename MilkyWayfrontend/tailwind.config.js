/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "1/15": "6.666667%", // 100%의 1/15
        30: "7.5rem", // mt-30 = 120px
      },
      colors: {
        galaxy: {
          midnight: "#2C3E50", // 로고 메인
          silver: "#C7CED4", // 로고 서브
          aurora: "#7FB6D5", // 버튼/포인트
          lavender: "#B7B0C9", // 감성 서브
          coral: "#F4C4C4", // 가족적 따뜻함
          rose: "#EADBE1", // 은은한 감성
          beige: "#EFE7DA", // 내추럴함
          charcoal: "#333333", // 텍스트
          cloud: "#E4E8EB", // 테두리/보조
          background: "#F7F9FA", // 배경
        },
      },
      screens: {
        "max-sm": { max: "639px" }, // 639px 이하일 때
      },
    },
  },
  plugins: [],
};
