import React, { useState } from "react";
import Cart from "./component/Cart/Cart";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/meals";
import CartProvider from "./store/cartprovider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showcartHandler = () => {
    setCartIsShown(true);
  };
  const hideCarthandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={hideCarthandler} />}
      <Header onShowCart={showcartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}
export default App;
