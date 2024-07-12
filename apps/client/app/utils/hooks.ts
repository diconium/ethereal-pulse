import { useMemo } from "react";
import { useMatches } from "@remix-run/react";
import { User } from "~/models";

interface RootData {
  csrf: string;
  user?: User;
}

/**
 * Retrieves the data associated with a specific route ID from the matching routes.
 * @param id - The ID of the route.
 * @returns The data associated with the route ID, or undefined if no matching route is found.
 */
export function useMatchesData(
  id: string
): RootData | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data as RootData;
}

/**
 * Fetches user data from root and returns the user object.
 * @returns The user object if available, otherwise undefined.
 */
export function useFetchUser(): User | undefined {
  const data = useMatchesData("root");
  return data?.user;
}
