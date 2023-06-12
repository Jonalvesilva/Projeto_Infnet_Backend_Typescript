import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./routes/login/Login";
import { Appbar } from "./components/Appbar";

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
