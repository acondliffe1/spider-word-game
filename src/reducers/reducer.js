export function gameReducer(state, event) {
  const { type, letter } = event;
  switch (type) {
    case "TYPEWORD":
      return {
        ...state,
        answer: event.answer,
      };
    case "START":
      return {
        ...state,
        status: "playing",
      };
    case "GUESS":
      return {
        ...state,
        guessed: {
          ...state.guessed,
          [letter]: letter,
          [letter.toUpperCase()]: letter,
        },
        mistakes:
          state.mistakes +
          (state.answer.toLowerCase().includes(letter) ? 0 : 1),
      };
    case "RESET":
      return initialState;
    case "FINISH":
      return {
        ...state,
        status: event.result === "win" ? "won" : "lost",
      };

    default:
      return state;
  }
}

export const initialState = {
  status: "idle",
  answer: "",
  guessed: {},
  mistakes: 0,
  error: null,
};

// status "idle - playing - won - lost"
