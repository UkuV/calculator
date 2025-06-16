import { createServer, Model } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      record: Model,
    },

    seeds(server) {
      server.db.loadData({
        records: [],
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/history", "records");

      this.post("/history", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        schema.records.create(data);
      });

      this.get(
        "/rates",
        () => ({
          USD: { EUR: 0.94, AUD: 1.56, CAD: 1.38, JPY: 154.525 },
          EUR: { USD: 1.07, AUD: 1.66, CAD: 1.47, JPY: 164.132 },
          AUD: { EUR: 0.61, USD: 0.64, CAD: 0.89, JPY: 99.0964 },
          CAD: { EUR: 0.68, USD: 0.72, AUD: 1.13, JPY: 111.885 },
          JPY: { EUR: 0.00609, USD: 0.00647, AUD: 0.01009, CAD: 0.00894 },
        }),
        { timing: 6000 },
      );
    },
  });
}
