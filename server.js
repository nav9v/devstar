import { Server } from "@hapi/hapi";
import Gun from "gun";

const server = new Server({
  port: 8765,
  host: "localhost",
});

async function runtime() {
  new Gun({
    web: server.listener,
  });

  await server.start();
  console.log("Server running at:", server.info.uri);
}

runtime();