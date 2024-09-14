import React from "react";
import "../css/button.css";

function Button({ text, onClick }) {
  return (
    <button className="button" onClick={() => onClick(text)}>
      {text}
    </button>
  );
}

export default Button;
