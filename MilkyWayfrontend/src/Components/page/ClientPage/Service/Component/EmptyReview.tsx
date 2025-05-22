const EmptyReview = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        backgroundColor: "#f9f9f9",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "16px",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "40px 30px",
          width: "70vw",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>📭</div>
        아직 등록된 후기가 없습니다.
        <br />
        <strong>운영자님,</strong> 은하수 홈케어의 첫 번째 후기를 직접
        올려보세요!
        <br />첫 후기, 고객에게 가장 큰 신뢰가 됩니다 :)
      </div>
    </div>
  );
};

export default EmptyReview;
