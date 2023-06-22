import { browserHistory } from "./browserHistory";
import { AuthToken } from "./authToken";
import toast from "react-simple-toasts";
import { useGlobalStore, initialFuncionario } from "./useGlobalStore";
import { createToast } from "react-simple-toasts";

const setIsLoading = useGlobalStore.getState().setIsLoading;
const setIsAuthenticated = useGlobalStore.getState().setIsAuthenticated;
const setFuncionario = useGlobalStore.getState().setFuncionario;

export function logout() {
  const customToast = createToast({ theme: "dark" });
  customToast("Você encerrou sua sessão. Até logo");
  AuthToken.remove();
  setFuncionario(initialFuncionario);
  setIsAuthenticated(false);
  browserHistory.push("/");
}
