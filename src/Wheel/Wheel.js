import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowsSpin,
  faMugHot
} from "@fortawesome/free-solid-svg-icons";
import Players from "./Players";
import { useReward } from "react-rewards";

export default function Wheel(props) {
  let winnerRef = useRef();
  const players = props.players,
    [wheelTransition, setWheelTransition] = useState(0),
    [wheelRotation, setWheelRotation] = useState(0),
    [segmentResult, setSegmentResult] = useState(
      Math.floor(Math.random() * players.length)
    ),
    [showWinner, setShowWinner] = useState(),
    { reward, isAnimating } = useReward("rewardId", "confetti"),
    segmentSize = 360 / players.length,
    minSpins = 8,
    maxSpins = 12,
    spinButton = () => {
      if (players.length) {
        return (
          <FontAwesomeIcon
            className="spinButton"
            icon={faArrowsSpin}
            onClick={() => spinWheel()}
          />
        );
      } else {
        return (
          <div className="startMessage" onClick={props.setControlsVisible}>
            <FontAwesomeIcon
              className="spinButton"
              icon={faMugHot}
              onClick={() => spinWheel()}
            />
            <span>Add some players to get started</span>
          </div>
        );
      }
    },
    spinWheel = () => {
      setShowWinner(false);
      // choose a winner!

      winnerRef.current = Math.floor(Math.random() * players.length);

      //begin the process by adding a transition, this allows user to see wheel spinning
      setWheelTransition(5);
      //randomly decide how many spins we see (could expand this by linking it to transition time? eg more time more spins)
      const spins =
        Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;

      //spin the wheel!

      setWheelRotation(spins * 360 + segmentSize * winnerRef.current);
    },
    endOfSpin = () => {
      //then when it stops, remove the transition
      setWheelTransition(0);
      //this is so that we can reset the wheel to a lower value of same result (without user seeing)
      //this means next spin we'll see lots and lots of spins, instead of 1 or 2
      setWheelRotation(segmentSize * winnerRef.current);

      props.setWinnerHandler(winnerRef.current);
      setShowWinner(true);
      reward();
    },
    winnerAlert = () => {
      if (showWinner && props.players.length) {
        return <h2>{players[winnerRef.current].name} Wins!</h2>;
      }
    };
  return (
    <div
      className={
        props.wheelVisible
          ? "wheelContainer viewPanel open"
          : "wheelContainer viewPanel"
      }
    >
      <div
        id="rewardId"
        className="wheel"
        style={{
          transitionDuration: `${wheelTransition}s`,
          transform: `rotate(-${wheelRotation}deg)`
        }}
        onTransitionEnd={endOfSpin}
      >
        <Players players={players} winner={props.winner} />
        {winnerAlert}
      </div>

      {spinButton()}

      {winnerAlert()}
    </div>
  );
}
