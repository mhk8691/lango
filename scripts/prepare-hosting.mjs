import { cp, mkdir, readFile, rm, writeFile, access } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const standalone = join(root, ".next", "standalone");
const destination = join(root, "deploy", "lango");
const archive = join(root, "deploy", "lango-node.tar.gz");
await access(join(standalone, "server.js"));
await access(join(root, ".next", "static"));
await mkdir(join(root, "deploy"), { recursive: true });
await rm(destination, { recursive: true, force: true });
await cp(standalone, destination, {
  recursive: true,
  dereference: true,
  filter: source => !/^\.env(?:\.|$)/.test(basename(source)),
});
await cp(join(root, "public"), join(destination, "public"), { recursive: true });
await cp(join(root, ".next", "static"), join(destination, ".next", "static"), { recursive: true });
await mkdir(join(destination, ".next", "cache"), { recursive: true });
const sourcePackage = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
await writeFile(join(destination, "package.json"), JSON.stringify({
  name: "lango-production",
  version: sourcePackage.version,
  private: true,
  scripts: { start: "node server.js" },
  engines: { node: ">=20.9.0" },
}, null, 2) + "\n");
await writeFile(join(destination, "HOSTING-README.txt"), `Lango — Node.js hosting\n\nUpload the contents of this folder into the Node.js application's root.\nInclude the hidden .next directory and node_modules directory.\n\nNode.js: 20.9 or newer\nApplication mode: production\nStartup file: server.js\nStart command (when supported): npm start\nEnvironment: NODE_ENV=production, HOSTNAME=0.0.0.0\nPORT: use the port assigned by the hosting panel; do not override it unnecessarily.\n\nNo npm install or build is needed on the host: dependencies and static files are included.\nThe domain must point to the configured Node.js application.\nThis is a Node.js bundle, not a static public_html export.\nBuild again locally with npm run build:hosting after source changes.\n`);
execFileSync("tar", ["-czf", archive, "-C", destination, "."], { stdio: "inherit" });
console.log("Hosting folder ready: deploy/lango");
console.log("Upload archive ready: deploy/lango-node.tar.gz");
