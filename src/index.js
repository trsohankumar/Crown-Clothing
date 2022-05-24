import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";


import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";
import { ProductProvider } from "./contexts/product.context";

import App from "./App";

import "./index.scss";

const rootElement = document.getElementById("root");
// the order of wrapping depends upon who needs access to the provider 
render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);