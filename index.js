const express = require("express");
const app = express();
const child_process = require("child_process");
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("Listening to port");
  console.log(port);
  const terminal = child_process.spawn("python", ["test.py"]);
  terminal.stdout.on("data", (data) => {
    console.log(data.toString());
  });
  terminal.stderr.on("data", (data) => {
    console.log(data.toString());
  });
  terminal.on("close", (code) => {
    if (code !== 0) {
      console.log(`ps process exited with code ${code}`);
    }
    terminal.stdin.end();
  });
});
