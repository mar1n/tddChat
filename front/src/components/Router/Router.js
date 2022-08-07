import {Route, Routes} from 'react-router-dom'
import NotFound from "../Errors/NotFound";
import App from "../App/App";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default Router;
