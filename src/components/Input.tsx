import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange, required }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={label} style={{ display: "block", fontWeight: "bold", marginBottom: "8px", textAlign: "left" }}>
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default Input;
