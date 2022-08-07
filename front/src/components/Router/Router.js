import {Route, Routes} from 'react-router-dom'
import NotFound from "../Errors/NotFound";
import App from "../App/App";
import Signup from "../Signup/Signup";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="*" exact element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default Main;
