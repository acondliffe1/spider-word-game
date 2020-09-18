import React, { useEffect, useReducer } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { gameReducer, initialState } from "../reducers/reducer";
import web from "../spider-web.svg";
import Spider from "./spider";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const MAX_MISTAKES = 9;

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { status, answer, guessed, mistakes } = state;

  const getGuessedWord = () => {
    return answer.split("").map((letter) => {
      if (alphabet.includes(letter.toLowerCase())) {
        return guessed[letter] ? letter : " _ ";
      } else return "/";
    });
  };
  const guessedWord = getGuessedWord(answer);

  const keypad = () => {
    return alphabet.split("").map((letter) => (
      <Button
        key={letter}
        variant="info"
        className="btn-lg m-2"
        onClick={() => {
          dispatch({ type: "GUESS", letter });
        }}
        value={letter}
        disabled={guessed[letter]}
      >
        {letter}
      </Button>
    ));
  };

  useEffect(() => {
    if (status === "playing") {
      if (mistakes >= MAX_MISTAKES) {
        dispatch({ type: "FINISH", result: "lose" });
      }

      if (guessedWord.join("").replace("/", "") === answer) {
        dispatch({ type: "FINISH", result: "win" });
      }
    }
  }, [status, mistakes, answer, guessedWord]);

  return (
    <div className="container">
      <h1>Spider Word Game</h1>
      {status === "idle" && (
        <React.Fragment>
          <Form className="" onSubmit={() => dispatch({ type: "START" })}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  name="word"
                  type="password"
                  placeholder="Word"
                  onChange={(event) =>
                    dispatch({ type: "TYPEWORD", answer: event.target.value })
                  }
                  value={answer}
                />
              </InputGroup>
            </Form.Group>
          </Form>
          <Button onClick={() => dispatch({ type: "START" })}>Submit</Button>
        </React.Fragment>
      )}
      {status !== "idle" && (
        <React.Fragment>
          <div className="container">
            <img src={web} alt="web" />
          </div>

          <Spider mistakes={mistakes}></Spider>
          <div className="container">
            <h1>{status === "lost" ? answer : guessedWord}</h1>
          </div>
        </React.Fragment>
      )}
      {status === "playing" && <div className="container">{keypad()}</div>}
      {status === "won" && (
        <div className="container">
          <p>Winner!</p>
        </div>
      )}
      {status === "lost" && (
        <div className="container">
          <p>Oh no! Try again.</p>
        </div>
      )}
      {status !== "idle" && (
        <Button onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      )}
    </div>
  );
};

export default Game;
