import { Routes,Route} from "react-router-dom";
import Shop from "./routes/shop/shop.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Navigation from "./routes/navigation/navigation.component";



const App = () => {
  return (
    //anything that is routable is put under routes
    <Routes>
      {/*match with the base url and match with the element */}
      <Route path='/' element= {<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path ='auth' element={<Authentication />} />
      </Route>
    </Routes>
    
  );
}

export default App;
