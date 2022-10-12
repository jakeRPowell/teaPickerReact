import React, { useState } from "react";
import idHandler from "../Helpers/idHandler";

const Form = ({
  players,
  setPlayers,
  playerName,
  setPlayerName,
  playerDrink,
  setPlayerDrink,
  playerStrength,
  setPlayerStrength,
  playerDecaf,
  setPlayerDecaf,
  playerMilk,
  setPlayerMilk,
  playerSugar,
  setPlayerSugar,
  teaColours
}) => {
  const [idState, setIdState] = useState(0),
    submitPlayerHandler = (e) => {
      e.preventDefault();

      setPlayers([
        ...players,
        {
          //define all player attributes
          id: idHandler(),
          name: playerName,
          drink: playerDrink,
          strength: playerStrength,
          decaf: playerDecaf,
          milk: playerMilk,
          sugar: playerSugar,
          wins: 0
        }
      ]);
      //reset values
      setPlayerName("");
      setPlayerStrength(50);
      setPlayerDecaf(false);
      setPlayerMilk("None");
      setPlayerSugar(0);
      setIdState(idState + 1);
    },
    playerNameChangeHandler = (e) => {
      setPlayerName(e.target.value);
    },
    playerDrinkChangeHandler = (e) => {
      setPlayerDrink(e.target.value);
    },
    playerStrengthChangeHandler = (e) => {
      setPlayerStrength(e.target.value);
    },
    playerDecafChangeHandler = (e) => {
      setPlayerDecaf(e.target.checked);
    },
    playerMilkChangeHandler = (e) => {
      setPlayerMilk(e.target.value);
    },
    playerSugarChangeHandler = (e) => {
      setPlayerSugar(e.target.value);
    };

  return (
    <form>
      <div className="formRow">
        <label htmlFor="nameInput">Name</label>
        <input
          autoFocus
          type="text"
          id="nameInput"
          value={playerName}
          onChange={playerNameChangeHandler}
        />
      </div>
      <div className="formRow">
        <label htmlFor="drinkInput">Drink</label>
        <div className="select">
          <select
            name="drinkInput"
            id="drinkInput"
            value={playerDrink}
            onChange={playerDrinkChangeHandler}
          >
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
          </select>
        </div>
      </div>
      <div className="formRow strength">
        <div
          className="strengthIndicator"
          style={{ backgroundColor: teaColours[playerStrength] }}
        ></div>
        <label htmlFor="strengthInput">Strength</label>
        <input
          type="range"
          min="0"
          max="59"
          className="slider"
          id="strengthInput"
          value={playerStrength}
          onChange={playerStrengthChangeHandler}
        />
      </div>
      <div className="formRow">
        <label htmlFor="decafInput">Decaf</label>
        <input
          value=""
          type="checkbox"
          id="decafInput"
          onChange={playerDecafChangeHandler}
        />
      </div>
      <div className="formRow">
        <label htmlFor="milkInput">Milk</label>
        <div className="select">
          <select
            name="milkInput"
            id="milkInput"
            value={playerMilk}
            onChange={playerMilkChangeHandler}
          >
            <option value="None">None</option>
            <option value="Dairy">Dairy</option>
            <option value="Oat">Oat</option>
            <option value="Soy">Soy</option>
          </select>
        </div>
      </div>
      <div className="formRow">
        <label htmlFor="sugarInput">Sugars</label>
        <input
          type="tel"
          id="sugarInput"
          value={playerSugar}
          onChange={playerSugarChangeHandler}
        />
      </div>
      <button
        className="submitButton"
        type="submit"
        onClick={submitPlayerHandler}
      >
        <i className="fas fa-plus-square"></i>Submit
      </button>
    </form>
  );
};

export default Form;
