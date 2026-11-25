import {cpSync,mkdirSync,rmSync,writeFileSync} from "node:fs";
rmSync("dist",{recursive:true,force:true});
mkdirSync("dist/server",{recursive:true});
mkdirSync("dist/.openai",{recursive:true});
cpSync("website","dist/client",{recursive:true});
cpSync(".openai/hosting.json","dist/.openai/hosting.json");
for (const file of ["registry.mjs","legacy-api.mjs"]) cpSync("server/"+file,"dist/server/"+file);
cpSync("server/sites-worker.mjs","dist/server/index.js");
writeFileSync("dist/server/wrangler.json",JSON.stringify({
  main:"index.js",compatibility_date:"2025-06-01",
  assets:{directory:"../client",binding:"ASSETS",run_worker_first:true}
},null,2)+"\n");
