import { User } from "../app/api/types";
import { api } from "../app/api/api";
import { useSelector } from "react-redux";

/**
 * Get the current logged-in user from the central Redux state. Does not trigger a request.
 */
export function useCurrentUser(): User | undefined {
  const { data: user } = useSelector(api.endpoints.user.select());
  return user;
}
