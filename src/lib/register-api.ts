import { registry } from "../../server/registry.mjs";
import { localStorageAdapter } from "../../server/local-db.mjs";
export function useRegistry(request: Request) {
  return registry(request, localStorageAdapter());
}
