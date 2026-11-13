/**
 * Runs every practice/0X-*.js file's manual test block in sequence
 * (each as a child process, so one file's crash/throw doesn't stop the rest).
 */

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const files = fs
  .readdirSync(__dirname)
  .filter((f) => /^\d{2}-.*\.js$/.test(f))
  .sort();

for (const file of files) {
  console.log(`\n=== ${file} ===`);
  try {
    const output = execFileSync(process.execPath, [path.join(__dirname, file)], {
      encoding: "utf-8",
    });
    console.log(output.trim());
  } catch (err) {
    console.log((err.stdout || "").trim());
    console.log(`Errored: ${err.message.split("\n")[0]}`);
  }
}
