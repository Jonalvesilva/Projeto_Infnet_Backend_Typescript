import { create } from "zustand";
import type { Funcionario } from "../../shared/types";

type GlobalState = {
  funcionario: Funcionario;
  setFuncionario: (funcionario: Partial<Funcionario>) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const initialFuncionario: Funcionario = {
  id: 0,
  email: "",
  created_at: "",
  nome: "",
  sobrenome: "",
  senha: "",
};

const initialGlobalState = {
  funcionario: initialFuncionario,
  isAuthenticated: false,
  isLoading: false,
};

export const useGlobalStore = create<GlobalState>((set) => {
  return {
    ...initialGlobalState,
    setFuncionario(funcionario: Partial<Funcionario>) {
      set((state) => ({
        funcionario: {
          ...state.funcionario,
          ...funcionario,
        },
      }));
    },

    setIsAuthenticated(isAuthenticated: boolean) {
      set((state) => {
        return {
          isAuthenticated,
        };
      });
    },

    setIsLoading(isLoading: boolean) {
      set((state) => {
        return {
          isLoading,
        };
      });
    },
  };
});
