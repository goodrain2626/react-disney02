import { QueryFunctionContext } from "@tanstack/react-query";

const BASE_URL = "https://disney_api.nomadcoders.workers.dev";

export function fetchCharacterList() {
  return fetch(`${BASE_URL}/characters`).then((response) => {
    return response.json()});
}

export const fetchCharacter = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;
  return fetch(`${BASE_URL}/characters/${id}`).then((response) => response.json());
};
