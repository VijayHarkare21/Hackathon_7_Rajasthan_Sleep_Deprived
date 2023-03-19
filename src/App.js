import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from './components/Courses';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/courses" element={<><Courses/></>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
