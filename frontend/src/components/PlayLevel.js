import React from "react";
import { useQuery } from "@apollo/client";
import { STAGES_QUERY } from "../graphql";
import { Spin } from "antd";
import JoJoText from "./JoJoText";
import ladybugColor from "../static/img/ladybug_color.png";
import ladybugGray from "../static/img/ladybug_gray.png";

const Level = ({ src, difficulty, onClick }) => {
  return (
    <div className="level-container">
      <img
        className="round-img"
        style={{ cursor: "pointer" }}
        src={src}
        onClick={onClick}
        alt="level thumbnail"
      />
      <div className="level-difficulty">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={i < difficulty ? ladybugColor : ladybugGray}
            alt="difficulty-indicator"
          />
        ))}
      </div>
    </div>
  );
};

const PlayLevel = ({ onSelect }) => {
  const { data, loading } = useQuery(STAGES_QUERY);
  return (
    <>
      <div className="round-border main-box">
        <JoJoText style={{ fontSize: "35px" }}>CHOOSE LEVEL</JoJoText>
        <div className="level-grid-wrapper">
          {loading ? (
            <div className="column-flex" style={{ height: "100%" }}>
              <Spin size="large" />
            </div>
          ) : (
            <div className="level-grid">
              {data.allStages.edges.map(({ node }) => (
                <Level
                  key={node.id}
                  src={node.thumbnail}
                  difficulty={node.difficulty}
                  onClick={() => onSelect(node.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayLevel;
