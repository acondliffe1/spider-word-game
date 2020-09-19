import React, { useEffect, useReducer } from "react";
import { Form, InputGroup, Button, Image } from "react-bootstrap";
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
        variant={guessed[letter] ? "light" : "info"}
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
    <div className="container h-100">
      <h1>Spider Word Game</h1>
      {status === "idle" && (
        <React.Fragment>
          <Form className="" onSubmit={() => dispatch({ type: "START" })}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  name="word"
                  type="password"
                  placeholder="Please enter a Word..."
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
          <div className="container web">
            <Image src={web} alt="web" fluid />
            <Spider mistakes={mistakes}></Spider>
            <div className="keypad pb-3 pt-3">{keypad()}</div>
          </div>

          <div className="container text-center">
            <h1>{status === "lost" ? answer : guessedWord}</h1>
          </div>
        </React.Fragment>
      )}

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
        <Button size="sm" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </Button>
      )}
    </div>
  );
};

export default Game;
