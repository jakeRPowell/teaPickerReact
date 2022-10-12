import { useState, useEffect } from "react";

import "./styles/styles.css";
import "./styles/header.css";
import "./styles/buttons.css";
import "./styles/wheel.css";
import dummy from "./data/dummy.json";
import Wheel from "./Wheel/Wheel";
import Controls from "./Controls/Controls";
import Stats from "./Stats/Stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faXmark,
  faPeopleGroup,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  console.log("app");

  const [controlsVisible, setControlsVisible] = useState(false),
    [statsVisible, setStatsVisible] = useState(false),
    [wheelVisible, setWheelVisible] = useState(true),
    [winner, setWinner] = useState(""),
    [displayWinner, setDisplayWinner] = useState(false),
    [players, setPlayers] = useState([]),
    [playerName, setPlayerName] = useState(""),
    [playerDrink, setPlayerDrink] = useState("tea"),
    [playerStrength, setPlayerStrength] = useState("30"),
    [playerDecaf, setPlayerDecaf] = useState(false),
    [playerMilk, setPlayerMilk] = useState("None"),
    [playerSugar, setPlayerSugar] = useState(0),
    [playerWins, setPlayerWins] = useState(0),
    teaColours = [
      "#fbf8f5",
      "#f9f4ef",
      "#f7f0e9",
      "#f5ece3",
      "#f3e8dd",
      "#f1e4d7",
      "#efe0d1",
      "#eddcca",
      "#ebd8c4",
      "#e9d3be",
      "#e7cfb8",
      "#e5cbb2",
      "#e3c7ac",
      "#e1c3a6",
      "#dfbfa0",
      "#db9",
      "#dbb793",
      "#d9b38d",
      "#d7af87",
      "#d5ab81",
      "#d3a67b",
      "#d1a275",
      "#cf9e6e",
      "#cd9a68",
      "#cb9662",
      "#c9925c",
      "#c78e56",
      "#c3864a",
      "#c58a50",
      "#c18244",
      "#bd7d3e",
      "#b7793c",
      "#b1753a",
      "#ab7138",
      "#a56d36",
      "#9f6934",
      "#996532",
      "#8c5d2e",
      "#86592c",
      "#936130",
      "#80552a",
      "#7a5128",
      "#744d26",
      "#6e4924",
      "#684522",
      "#624120",
      "#5b3c1e",
      "#55381c",
      "#4f341a",
      "#493018",
      "#432c16",
      "#3d2814",
      "#372412",
      "#312010",
      "#2a1c0e",
      "#24180c",
      "#1e140a",
      "#181008",
      "#120c06",
      "#0c0804"
    ],
    toggleControls = () => {
      setControlsVisible(!controlsVisible);
      setStatsVisible(false);
      toggleWheel(controlsVisible);
    },
    toggleStats = () => {
      setStatsVisible(!statsVisible);
      setControlsVisible(false);
      toggleWheel(statsVisible);
    },
    toggleWheel = (check) => {
      setWheelVisible(check);
    },
    setWinnerHandler = (winnerRef) => {
      const updateState = () => {
        const newState = players.map((player) => {
          if (player.id === winnerRef) {
            return { ...player, wins: player.wins + 1 };
          }

          return player;
        });

        setPlayers(newState);
      };
      updateState();
    };
  useEffect(() => {
    //retrieve Stored Players
    setPlayers(JSON.parse(localStorage.getItem("players") || "[]"));
  }, []);
  useEffect(() => {
    //write Platers To Local Storage
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);
  return (
    <div className={players.length < 2 ? "App addPlayers" : "App"}>
      <div className="header">
        <div className="title">
          <h1>Tea Roulette</h1>

          <FontAwesomeIcon icon={faMugHot} />
        </div>
        <div
          className={
            players.length < 2
              ? "headerButton toggleControls pulse"
              : "headerButton toggleControls"
          }
          onClick={toggleControls}
        >
          <FontAwesomeIcon icon={controlsVisible ? faXmark : faPeopleGroup} />
        </div>
        <div className="headerButton toggleStats" onClick={toggleStats}>
          <FontAwesomeIcon icon={statsVisible ? faXmark : faChartLine} />
        </div>
      </div>
      <Controls
        useDummyData={() => setPlayers(dummy.data)}
        removeAllPlayers={() => setPlayers([])}
        players={players}
        setPlayers={setPlayers}
        playerName={playerName}
        setPlayerName={setPlayerName}
        playerDrink={playerDrink}
        setPlayerDrink={setPlayerDrink}
        playerStrength={playerStrength}
        setPlayerStrength={setPlayerStrength}
        playerDecaf={playerDecaf}
        setPlayerDecaf={setPlayerDecaf}
        playerMilk={playerMilk}
        setPlayerMilk={setPlayerMilk}
        playerSugar={playerSugar}
        setPlayerSugar={setPlayerSugar}
        teaColours={teaColours}
        controlsVisible={controlsVisible}
      />
      <Stats statsVisible={statsVisible} players={players} />
      <Wheel
        players={players}
        setControlsVisible={() => toggleControls()}
        wheelVisible={wheelVisible}
        winner={winner}
        setWinnerHandler={(winnerRef) => setWinnerHandler(winnerRef)}
      />
    </div>
  );
}
