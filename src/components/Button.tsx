// src/components/Button.tsx
import React from "react";

interface ButtonProps {
  type: "submit" | "button";
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, label, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
    >
      {label}
    </button>
  );
};

export default Button;
