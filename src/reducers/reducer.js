export function gameReducer(state, event) {
  switch (event.type) {
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
      const letter = event.letter;
      return {
        ...state,
        guessed: { ...state.guessed, [letter]: letter },
        mistakes: state.mistakes + (state.answer.includes(letter) ? 0 : 1),
        // Guess
      };
    case "RESET":
      return {
        ...state,
        status: "idle",
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

// status "idle - playing - win - lose"
