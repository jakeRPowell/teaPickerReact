import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUserPlus,
  faRobot,
  faSkullCrossbones,
  faTrash,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import Form from "./form";
export default function ControlPanel(props) {
  const [openPlayerInfos, setOpenPlayerInfos] = useState([]),
    [addPlayerVisible, setAddPlayerVisible] = useState(false),
    [allPlayersVisible, setAllPlayersVisible] = useState(false),
    toggleAddPlayer = () => {
      setAddPlayerVisible(!addPlayerVisible);
    },
    deletePlayerHandler = (id) => {
      props.setPlayers(props.players.filter((el) => el.id !== id));
    },
    //players list

    players = props.players.map((p, index) => {
      return (
        <div key={p.id} className="playerInfo">
          <div>
            <div className="iconContainer">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deletePlayerHandler(p.id)}
              />
              <span>Delete player</span>
            </div>
            <div>{p["name"]}</div>
          </div>
          <ul className="fullInfo">
            <li>{p["drink"]}</li>
            <li>
              <div
                className="strengthIndicator"
                style={{
                  backgroundColor: props.teaColours[p.strength]
                }}
              ></div>
            </li>
            <li>{p["milk"]}</li>
            {p["decaf"] ? <li>Decaf</li> : ""}
            <li>{p["sugar"]} Sugars</li>
          </ul>
        </div>
      );
    });

  return (
    <div
      className={
        props.controlsVisible
          ? "controlsContainer viewPanel open"
          : "controlsContainer viewPanel"
      }
    >
      <div className="controls">
        <div className="controlsInner">
          <div
            className={
              addPlayerVisible ? "playerControlForm open" : "playerControlForm"
            }
          >
            <div className="controlsHeader">
              <h2>Player Management</h2>
              <div className="playerControlButtons">
                <div className="iconContainer">
                  <FontAwesomeIcon
                    className="removeAllButton"
                    icon={players.length > 1 ? faSkullCrossbones : faRobot}
                    onClick={
                      players.length > 1
                        ? props.removeAllPlayers
                        : props.useDummyData
                    }
                  />
                  <span>
                    {players.length > 1
                      ? "Delete all players"
                      : "Use dummy data"}
                  </span>
                </div>
                <div
                  className="iconContainer toggleButton toggleAddPlayerButton"
                  onClick={toggleAddPlayer}
                >
                  <FontAwesomeIcon
                    icon={addPlayerVisible ? faXmark : faUserPlus}
                  />
                  <span>Add new player</span>
                </div>
              </div>
            </div>

            <Form
              data={props.data}
              players={props.players}
              setPlayers={props.setPlayers}
              playerName={props.playerName}
              setPlayerName={props.setPlayerName}
              playerDrink={props.playerDrink}
              setPlayerDrink={props.setPlayerDrink}
              playerStrength={props.playerStrength}
              setPlayerStrength={props.setPlayerStrength}
              playerDecaf={props.playerDecaf}
              setPlayerDecaf={props.setPlayerDecaf}
              playerMilk={props.playerMilk}
              setPlayerMilk={props.setPlayerMilk}
              playerSugar={props.playerSugar}
              setPlayerSugar={props.setPlayerSugar}
              teaColours={props.teaColours}
            />
          </div>

          <div className="playersPanel">{players}</div>
        </div>
      </div>
    </div>
  );
}
