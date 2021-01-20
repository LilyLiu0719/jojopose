import React from "react";

const JoJoText = (prop) => {
  return (
    <span
      className={`jojo-font ${prop.className}`}
      style={prop.style || {}}
      title={prop.children}
      onClick={prop.onClick}
    >
      {prop.children}
    </span>
  );
};

export default JoJoText;
