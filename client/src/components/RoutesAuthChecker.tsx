import { useEffect } from "react";
import { getMyself } from "../api/getMyself";

export function RoutesAuthChecker() {
  async function authChecker() {
    await getMyself();
  }

  useEffect(() => {
    authChecker();
  }, []);
  return null;
}
