import {prepareRegister} from "../server/prepare.mjs";
await prepareRegister();
import { spawn } from "node:child_process";
const args = process.argv.slice(2);
const value = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", value("--host", "127.0.0.1"), "--port", value("--port", process.env.PORT || "3000")], { stdio: "inherit" });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", code => process.exit(code ?? 0));
