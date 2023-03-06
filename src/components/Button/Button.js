import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      style={{
        padding: "0.25rem 0.5rem",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
