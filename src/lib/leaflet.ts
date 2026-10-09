// Lazy leaflet instance to avoid SSR issues
let leafletInstance: typeof import("leaflet") | null = null;

export const getLeaflet = (): typeof import("leaflet") => {
  if (!leafletInstance) {
    if (typeof window === "undefined") {
      throw new Error("Leaflet can only be used on the client side");
    }
    // Leaflet must load only in the browser; ESM import would run on the server.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    leafletInstance = require("leaflet");
  }
  return leafletInstance!;
};
