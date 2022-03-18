import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";


import { UserProvider } from "./contexts/user.context";
import { ProductProvider } from "./contexts/product.context";
import { CartProvider } from "./contexts/cart.context";

import App from "./App";

import "./index.scss";

const rootElement = document.getElementById("root");
// the order of wrapping depends upon who needs access to the provider 
render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);