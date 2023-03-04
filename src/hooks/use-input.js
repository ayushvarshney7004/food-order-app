import { useReducer } from "react";
const initialValue = {
  value: "",
  isTouched: false,
};
const intialStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return intialStateReducer;
};
const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(intialStateReducer, initialValue);

  // const [isTouched, setIsTouched] = useState(false);
  // const [enteredValue, setEnteredValue] = useState("");

  const valueisValid = validateValue(inputState.value);
  const hasError = !valueisValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ value: event.target.value, type: "INPUT" });
    // setEnteredValue(event.target.value);
  };
  const InputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    // setIsTouched(true);
  };
  const reset = () => {
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  };

  return {
    value: inputState.value,
    isValid: valueisValid,
    hasError,
    valueChangeHandler,
    InputBlurHandler,
    reset,
  };
};

export default useInput;
