import bathsrooms from "@/Components/Common/assets/bathsrooms.png";
import { Notice } from "./type";

const ReviewCards = ({ notices }: { notices: Notice[] }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        justifyContent: "center",
        padding: "40px 0",
        backgroundColor: "#F0F4F8",
      }}
    >
      {notices.map((data: Notice, index: number) => (
        <div
          key={index}
          style={{
            width: "280px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            transition: "transform 0.2s ease",
            cursor: "pointer",
          }}
        >
          <img
            src={data.titleimg}
            alt={data.title}
            onError={(e) => {
              e.currentTarget.src = bathsrooms;
            }}
            style={{ width: "100%", height: "160px", objectFit: "cover" }}
          />
          <div style={{ padding: "16px" }}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                marginBottom: "8px",
                lineHeight: "1.4",
              }}
            >
              {data.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCards;
