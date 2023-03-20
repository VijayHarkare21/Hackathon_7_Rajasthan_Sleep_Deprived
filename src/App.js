import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from "./components/Courses";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Interest from "./components/Interest";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
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
            path="/interest_form"
            element={
              <>
                <Interest/>
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
