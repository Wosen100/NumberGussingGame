import React, { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import Gameoptions from "./GameOptions";
import Gamestate from "./GameState";

/**
 *
 * @typedef {"running"|"not_running"} iGameState
 */

export default function GameBoard() {
  const MAX_ATTEMPTS = 3;

  const [guess_title, setguessTitle] = useState("");

  const INITIAL_GAME_STATE = {
    /**@type iGameState*/ state: "not_running",
    /**@type number*/ SECRET_PICK: null,
    attempts: 0,
  };

  const [cgame_state, setCGameState] = useState(INITIAL_GAME_STATE);

  let colors = ["orange", "green", "blue", "yellow"];

  function clearGameState() {
    setCGameState(INITIAL_GAME_STATE);
  }

  useEffect(() => {
    clearGameState();
  }, []);

  useEffect(() => {

    let new_color =  colors[Math.floor(Math.random()* colors.length)]
    document.querySelector('body').style.backgroundColor = new_color
    console.log(new_color);
  }, [cgame_state.state]);

  const gameoptions = [...Array(10)].map((opt, index) => index + 1);

  /**
   * game state running, not_running
   *
   * while running:
   * Running algo_
   *  1. pick a number
   *  3. ask player to pick option, while attempts is less than MAX_ATTEMPTS, if attempt is not == CHOSEN_OPTION ? show Your choice is Too low:Your choice Too high
   */

  function startGame(/**@type iGameState*/ game_state) {
    if (game_state != "not_running")
      throw alert("Start game cannot be called on running game");

    console.log("game is not running: start game is initializing");
    const pickRandomOption = Math.floor(Math.random() * 10 + 1);
    setCGameState({
      state: "running",
      SECRET_PICK: pickRandomOption,
      attempts: MAX_ATTEMPTS,
    });
  }

  function checkUserChoice(user_choice) {
    console.log("check user choice fired");

    if (!user_choice) throw alert("user_choice param not valid");

    if (!cgame_state) throw alert("cgame_state param not valid");

    if (!cgame_state.attempts) throw alert("You have exhausted your attempts");

    setCGameState({ ...cgame_state, attempts: cgame_state.attempts - 1 }); //reduce the number of attempts by 1

    if (user_choice == cgame_state.SECRET_PICK) {
      //user won
      alert(`Your choice ${user_choice} is the correct choice`);
      clearGameState();
      return { user_won: true };
    }

    alert(
      `Your choice is too ${
        user_choice < cgame_state.SECRET_PICK ? "low" : "high"
      }`
    );

    return { user_won: false };
  }

  function showStateAndOption(state) {
    if (state != "running") {
      return (
        <>
          <div className="m-auto">
            <button
              className="p-3 border"
              onClick={() => startGame(cgame_state.state)}
            >
              Start game
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <Gamestate
          {...{
            state_title: cgame_state.state,
            attempts: cgame_state.attempts,
            restart: () => startGame(cgame_state.state),
          }}
        />
        <Gameoptions gameoptions={gameoptions} handlerFn={checkUserChoice} />
      </>
    );
  }

  return (
    <div className="flex flex-col  h-full justify-evenly align-center">
      <GameHeader title={"Guess a number"} />
      {showStateAndOption(cgame_state.state)}
      {/* <Gamecontroller /> */}
    </div>
  );
}
