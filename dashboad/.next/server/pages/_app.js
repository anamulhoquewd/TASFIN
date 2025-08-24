const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root-of-the-server]__2c641e49._.js");
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/.pnpm/next@15.4.5_react-dom@19.1._ef4523c3cd30f1376607630843a96a70/node_modules/next/app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
