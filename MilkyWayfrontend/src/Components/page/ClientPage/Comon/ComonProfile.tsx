import save2 from "@/Components/Common/assets/save2.gif";

export const ComonProfile = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={save2}
        alt="profile-animation"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "25%",
          transform: "translate(-50%, -50%)",
          color: "#ffffff",
          fontWeight: "bold",
          borderRadius: "10px",
        }}
      >
        <span
          style={{ fontSize: "15px", fontWeight: "bold", color: "#00B0FF" }}
        >
          고객 모두를 하나의 가족 같은 마음으로!!!
        </span>
        <br />
        <span style={{ fontSize: "20px" }}>
          <span style={{ color: "#FF6F61" }}>은하수 홈케어</span>는 고객님의
          소중한 공간을 깨끗하게 만들어 드립니다.
        </span>
        <br />
        <span style={{ fontSize: "20px", color: "#FFA07A" }}>
          고객, 여러분의 방문을 진심으로 환영합니다.
        </span>
      </div>
    </div>
  );
};
