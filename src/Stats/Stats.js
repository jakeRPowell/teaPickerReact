import { useState } from "react";

export default function ControlPanel(props) {
  const leaderboard = props.players
    // .sort((a, b) => (a.wins < b.wins ? 1 : -1))
    .map((p, index) => {
      return (
        <div key={p.id} className="player">
          <div>{p["name"]}</div>
          <div>{p["wins"]}</div>
        </div>
      );
    });

  return (
    <div
      className={
        props.statsVisible
          ? "statsContainer viewPanel open"
          : "statsContainer viewPanel"
      }
    >
      <div className="stats">
        <h2>Leaderboard</h2>
        {leaderboard}
      </div>
    </div>
  );
}
