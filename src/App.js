import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Update from "./Components/Update";
import Add from "./Components/Add";
import Show from "./Components/Show";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/show" element={<Show />} />
          <Route path="/update/:projectId" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
