import { ApplicationFactory } from "./infra";

async function start() {
  const app = ApplicationFactory.create();
  await app.start();
}

start();
