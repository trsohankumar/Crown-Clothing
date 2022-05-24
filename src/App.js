import { Routes,Route} from "react-router-dom";
import Shop from "./routes/shop/shop.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Navigation from "./routes/navigation/navigation.component";
import Checkout from "./routes/checkout/checkout.component";
import ProductPage from "./components/prouduct-page/product-page.component";


const App = () => {
  return (
    //anything that is routable is put under routes
    <Routes>
      {/*match with the base url and match with the element */}
      <Route path='/' element= {<Navigation />}>
        <Route index element={<Home />} />
        {/* match with shop/anything this is used for nested routing  */}
        <Route path='shop/*' element={<Shop />} />
        <Route path ='auth' element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path='product/*' element={<ProductPage />} />
      </Route>
    </Routes>
    
  );
}

export default App;
