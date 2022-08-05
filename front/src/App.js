import "./App.css";
import {Link, Route, Routes, useLocation} from 'react-router-dom'
import Home from "./Home";

function App() {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
