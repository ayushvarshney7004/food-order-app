import classes from "./checkOut.module.css";
import useInput from "../../hooks/use-input";

const isEmpty = (value) => value.trim() !== "";
const hasFiveChars = (value) => value.trim().length === 6;
const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    InputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isEmpty);

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    InputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(isEmpty);
  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    InputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCode,
  } = useInput(hasFiveChars);
  const {
    value: enteredCity,
    isValid: cityInputIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityInputChangeHandler,
    InputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput(isEmpty);

  const confirmHandler = (event) => {
    event.preventDefault();

    const formIsValid =
      nameIsValid && streetIsValid && postalCodeIsValid && cityInputIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });

    resetName();
    resetStreetInput();
    resetPostalCode();
    resetCityInput();
  };

  const nameInputClasses = `${classes.control} ${
    nameIsValid ? "" : classes.invalid
  }`;
  const StreetInputClasses = `${classes.control} ${
    streetIsValid ? "" : classes.invalid
  }`;
  const PostalCodeInputClasses = `${classes.control} ${
    postalCodeIsValid ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    cityInputIsValid ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      {nameHasError && <p>Name can not be empty !!</p>}
      <div className={StreetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
      </div>
      {streetHasError && <p> field is empty </p>}
      <div className={PostalCodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
      </div>
      {postalCodeHasError && (
        <p> field is empty or the entered value is more than or less than 5</p>
      )}
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={enteredCity}
        />
      </div>
      {cityInputHasError && <p> field is empty</p>}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
