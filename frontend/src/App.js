import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import UserPage from "./Pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Signup" element={<Register />} />
        <Route exact path="/User" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
