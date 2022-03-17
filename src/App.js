
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sign-in.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes,Route} from "react-router-dom";


const App = () => {
  return (
    //anything that is routable is put under routes
    <Routes>
      {/*match with the base url and match with the element */}
      <Route path='/' element= {<Navigation />}>
        <Route index element={<Home />} />
        <Route path ='sign-in' element={<SignIn />} />
      </Route>

     
    
    
    </Routes>
    
  );
}

export default App;
