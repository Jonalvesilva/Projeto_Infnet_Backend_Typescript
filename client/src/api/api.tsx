import axios from "axios";
import { AuthToken } from "../authToken";
import { browserHistory } from "../browserHistory";
import { useGlobalStore, initialFuncionario } from "../useGlobalStore";
import toast from "react-simple-toasts";
import { Toast } from "../components/Toast";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});
const setIsLoading = useGlobalStore.getState().setIsLoading;

const setIsAuthenticated = useGlobalStore.getState().setIsAuthenticated;
const setFuncionario = useGlobalStore.getState().setFuncionario;

api.interceptors.request.use((config) => {
  const token = AuthToken.get();
  setIsLoading(true);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  (error) => {
    setIsLoading(false);
    if (error.response.status === 401) {
      toast(texts.sessionExpiredError, {
        render(error) {
          return (
            <Toast
              message={error}
              className="bg-blue-600 py-1 px-4 text-white text-lg rounded-full"
            />
          );
        },
      });
      AuthToken.remove();
      setFuncionario(initialFuncionario);
      setIsAuthenticated(false);
      browserHistory.push("/");
    }

    if (error.response.status === 400) {
      if (error.response.data.errors) {
        const errors: string[] = error.response.data.errors
          .map(({ constraints }: any) => Object.values(constraints))
          .flat();
        errors.forEach((error) => {
          toast(error, {
            render(error) {
              return (
                <Toast
                  message={error}
                  className="bg-red-600 py-1 px-4 text-white text-lg rounded-full"
                />
              );
            },
          });
        });
      } else if (error.response.data.message) {
        toast(error.response.data.message, {
          render(error) {
            return (
              <Toast
                message={error}
                className="bg-red-600 py-1 px-4 text-white text-lg rounded-full"
              />
            );
          },
        });
      }
    }
  }
);

const texts = {
  sessionExpiredError: "Sua sessão expirou. Entre novamente",
};
