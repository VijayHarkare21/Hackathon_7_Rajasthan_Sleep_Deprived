import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from "./components/Courses";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Game from "./components/Games/Game";
import New from "./components/New";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/courses"
            element={
              <>
                <Courses />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <SignUpPage />
              </>
            }
          ></Route>
          <Route
            path="/game"
            element={
              <>
                <Game />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
