import { User } from "../app/types";
import { api } from "../app/api";
import { useSelector } from "react-redux";

export function useCurrentUser(): User | undefined {
  const { data: user } = useSelector(api.endpoints.user.select());
  return user;
}
