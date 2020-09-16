import React, { useReducer } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { gameReducer, initialState } from "../reducers/reducer";
import web from "../spider-web.svg";

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { status, answer, guessed, mistakes } = state;

  const guessedWord = () => {
    return answer
      .split("")
      .map((letter) => (guessed.hasOwnProperty(letter) ? letter : " _ "));
  };

  const keypad = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <Button
        key={letter}
        variant="info"
        className="btn-lg m-2"
        onClick={(e) => {
          // setGuessed(new Set([...guessed, letter]));
          dispatch({ type: "GUESS", letter });
        }}
        value={letter}
        disabled={guessed.hasOwnProperty(letter)}
      >
        {letter}
      </Button>
    ));
  };

  return (
    <div className="container">
      <h1>Spider Word Game</h1>
      {status === "idle" && (
        <React.Fragment>
          <Form className="">
            <Form.Group>
              <InputGroup>
                <Form.Control
                  name="driver"
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
          <Button
            onClick={(event) =>
              dispatch({ type: "START", answer: event.target.value })
            }
          >
            Submit
          </Button>
        </React.Fragment>
      )}
      {status !== "idle" && (
        <React.Fragment>
          <div className="container">
            <img src={web} alt="web" />
          </div>
          <div className="container">
            <h1>{guessedWord(answer)}</h1>
            <p>Mistakes: {mistakes}</p>
          </div>
          <div className="container">{keypad()}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Game;
