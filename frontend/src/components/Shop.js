import React from "react";
import JoJoText from "./JoJoText";

const Shop = ({ onToMenu }) => {
  return (
    <>
      <div className="button">
        <JoJoText style={{ fontSize: "35px" }} onClick={onToMenu}>
          back
        </JoJoText>
      </div>
    </>
  );
};

export default Shop;
