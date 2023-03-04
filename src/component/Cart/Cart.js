import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./checkOut";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const hasItem = cartCtx.items.length > 0;

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderItemHandler = () => {
    setIsCheckOut(true);
  };
  const submitOrderHandler = (userData) => {
    setSubmiting(true);
    fetch(
      "https://react-movie-app-5b5aa-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        {" "}
        Close{" "}
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderItemHandler}>
          {" "}
          Order{" "}
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span> total amount</span>
        <span> {totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );
  const submitingHandler = <p>Sending order data</p>;
  const didSubmitingHandler = (
    <React.Fragment>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          {" "}
          Close{" "}
        </button>
      </div>
      <p>Order submitted Successfully , Thank you </p>
    </React.Fragment>
  );

  return (
    <Modal onCloseModal={props.onCloseCart}>
      {!submiting && !didSubmit && cartModalContent}
      {submiting && submitingHandler}
      {!submiting && didSubmit && didSubmitingHandler}
    </Modal>
  );
};
export default Cart;
