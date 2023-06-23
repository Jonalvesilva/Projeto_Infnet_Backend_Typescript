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
import { IntegrantesView } from "./routes/integrantes/IntegrantesView";
import { IntegranteView } from "./routes/integrantes/IntegranteView";
import { IntegranteEdit } from "./routes/integrantes/IntegranteEdit";
import { CreateIntegrante } from "./routes/integrantes/CreateIntegrante";
import { DependentesView } from "./routes/dependentes/DependentesView";
import { DependenteView } from "./routes/dependentes/DependenteView";
import { DependenteEdit } from "./routes/dependentes/DependenteEdit";
import { CreateDependente } from "./routes/dependentes/CreateDependente";

function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <AuthChecker />
      <Appbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/integrantes" element={<IntegrantesView />}></Route>
        <Route path="/integrantes/:id" element={<IntegranteView />}></Route>
        <Route
          path="/integrantes/:id/editar"
          element={<IntegranteEdit />}
        ></Route>
        <Route
          path="/integrantes/addIntegrantes"
          element={<CreateIntegrante />}
        ></Route>
        <Route path="/dependentes/:id" element={<DependentesView />}></Route>
        <Route
          path="/dependentes/:id/:idDep"
          element={<DependenteView />}
        ></Route>
        <Route
          path="/dependentes/:id/:idDep/editar"
          element={<DependenteEdit />}
        ></Route>
        <Route
          path="/dependentes/:id/addDependente"
          element={<CreateDependente />}
        ></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
