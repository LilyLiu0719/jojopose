import React from "react";

const JoJoText = (prop) => {
  return (
    <span className="jojo-font" style={prop.style || {}} title={prop.children}>
      {prop.children}
    </span>
  );
};

export default JoJoText;
