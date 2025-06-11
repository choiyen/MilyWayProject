import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import bathsrooms from "@/Components/Common/assets/bathsrooms.png";
import { useNavigate } from "react-router-dom";
import { GateWayNumber } from "@/types/GateWay/GateWayType";
const ReviewCards = ({ notices }) => {
    const navigator = useNavigate();
    return (_jsx("div", { style: {
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
            padding: "40px 0",
            backgroundColor: "#F0F4F8",
        }, children: notices.map((data, index) => (_jsxs("div", { style: {
                width: "280px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
                transition: "transform 0.2s ease",
                cursor: "pointer",
            }, onClick: () => {
                navigator(GateWayNumber.Client + `/ServiceDetail/${data.noticeId}`);
            }, children: [_jsx("img", { src: data.titleimg, alt: data.title, onError: (e) => {
                        e.currentTarget.src = bathsrooms;
                    }, style: { width: "100%", height: "160px", objectFit: "cover" } }), _jsx("div", { style: { padding: "16px" }, children: _jsx("h4", { style: {
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#333",
                            marginBottom: "8px",
                            lineHeight: "1.4",
                        }, children: data.title }) })] }, index))) }));
};
export default ReviewCards;
