import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const canonical = process.env.NEXT_PUBLIC_SITE_BASE_PATH === "/studio-halden-website"
  ? '    <link rel="canonical" href="https://thesantaana.github.io/studio-halden-website/zh/">\n'
  : "";

const html = `<!doctype html>
<html lang="zh">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0; url=./zh/">
${canonical}    <title>MĒTIS — 独立设计工作室</title>
    <script>window.location.replace("./zh/");</script>
    <style>
      html,body{margin:0;min-height:100%;background:#11110f;color:#f0eee8;font-family:system-ui,sans-serif}
      body{display:grid;min-height:100vh;place-items:center}
      a{color:#d6b28f;text-underline-offset:4px}
    </style>
  </head>
  <body>
    <p>正在进入 MĒTIS 中文网站… <a href="./zh/">点击继续</a></p>
  </body>
</html>
`;

await writeFile(resolve("out", "index.html"), html, "utf8");
