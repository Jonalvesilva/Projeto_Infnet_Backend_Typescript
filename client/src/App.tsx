import React from "react";
import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SignIn } from "./routes/login/SignIn";
import { Appbar } from "./components/Appbar";
import { Home } from "./routes/Home";
import { SignUp } from "./routes/login/SignUp";
import { AuthChecker } from "./components/AuthChecker";
import { browserHistory } from "./browserHistory";

function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <Appbar />
      <AuthChecker />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
