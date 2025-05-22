import { Key } from "react";
import { theme } from "@/SCSS/typecss";
import { Service, ServiceProfiling } from "../ServiceProfileing";

const ServiceSelector = ({
  setSelect,
}: {
  setSelect: (service: string) => void;
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "40px",
        justifyItems: "center",
      }}
    >
      {ServiceProfiling.map((service: Service, index: Key) => (
        <div
          key={index}
          style={{
            width: "400px",
            height: "180px",
            backgroundImage: `url(${service.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "flex-end",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setSelect(service.Service)}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              color: `${theme.colors.charcoalBlack}`,
              backgroundColor: "rgba(198, 169, 169, 0.4)",
              padding: "6px 10px",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {service.Service}
            <span style={{ color: `${theme.colors.cloudGrey}` }}>
              {service.target}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelector;
