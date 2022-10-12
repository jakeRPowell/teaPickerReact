import { useState } from "react";

export default function Players(props) {
  const players = props.players.map((p, index) => {
    const rotation = (360 / props.players.length) * index;

    return (
      <div
        key={p.id}
        className={props.winner === index ? "winner player" : "player"}
      >
        <div style={{ transform: "rotate(" + rotation + "deg)" }}>
          {p["name"]}
        </div>
      </div>
    );
  });

  return <div>{players}</div>;
}
