import React, { useState, useEffect, useReducer } from "react";
import { Form, InputGroup, Button, Image } from "react-bootstrap";
import { gameReducer, initialState } from "../reducers/reducer";
import web from "../spider-web.svg";
import Spider from "./spider";
import Message from "./message";
import Confetti from "react-dom-confetti";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const MAX_MISTAKES = 9;

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { status, answer, guessed, mistakes } = state;
  const [endgameShow, setEndgameShow] = useState(false);

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
        disabled={status !== "playing" || guessed[letter]}
      >
        {letter}
      </Button>
    ));
  };

  useEffect(() => {
    if (status === "playing") {
      if (mistakes >= MAX_MISTAKES) {
        dispatch({ type: "FINISH", result: "lose" });
        setTimeout(() => setEndgameShow(true), 3500);
      }

      if (guessedWord.join("").replace("/", "") === answer) {
        dispatch({ type: "FINISH", result: "win" });
        setTimeout(() => setEndgameShow(true), 3500);
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
          <Button
            onClick={() => {
              dispatch({ type: "START" });
            }}
          >
            Submit
          </Button>
        </React.Fragment>
      )}
      {status !== "idle" && (
        <React.Fragment>
          <div className="container web">
            <Image src={web} alt="web" fluid />
            <Spider mistakes={mistakes}></Spider>
            <Confetti active={status === "won"} config={config} />
            <div className="keypad pb-3 pt-3">{keypad()}</div>
          </div>

          <div className="container text-center">
            <h1>{status === "lost" ? answer : guessedWord}</h1>
          </div>
        </React.Fragment>
      )}
      <Message
        show={endgameShow}
        onHide={() => {
          setEndgameShow(false);
          dispatch({ type: "RESET" });
        }}
        title={status === "won" ? "Great Job!" : "Oh No!"}
        message={
          status === "won" ? "You solved the word!" : "Better luck next time!"
        }
      ></Message>

      {status !== "idle" && (
        <Button size="sm" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </Button>
      )}
    </div>
  );
};

export default Game;
