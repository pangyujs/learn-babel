const { transformFileSync } = require("@babel/core");
const insertParamerersPlugin = require("./plugins/add-line-column-info");
const path = require("path");

const { code } = transformFileSync(
  path.join(__dirname, "./src/helloworld.js"),
  {
    plugins: [insertParamerersPlugin],
    parserOpts: {
      sourceType: "unambiguous",
      plugins: ["jsx"],
    },
  }
);

console.log(code);
