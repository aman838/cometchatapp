
import React from "react"
import { Route,  BrowserRouter as Router, Routes } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import SearchPage from "./Pages/SearchPage";
import ChatPage from "./Pages/ChatPage";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
            <Routes>
                <Route exact path="/" element={ <RegistrationPage/> } />
                <Route exact path="/search" element={<SearchPage />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/chat/:id" element={<ChatPage />} />
            </Routes>
      </Router>
  );
}

export default App;
