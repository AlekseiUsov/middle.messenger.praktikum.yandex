import { TData } from "./HTTPTransport";

export function queryStringify(obj: TData) {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input must be a valid object");
  }

  const queryParts = Object.entries(obj).map(([key, value]) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    return `${encodedKey}=${encodedValue}`;
  });

  return queryParts.join("&");
}
