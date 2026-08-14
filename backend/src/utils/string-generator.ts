import { randomInt } from "node:crypto";

function stringGenerator(length: number): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("Invalid string length provided.");
  }

  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let output = "";

  for (let i = 0; i < length; i++) {
    output += characters[randomInt(characters.length)];
  }

  return output;
}

export { stringGenerator };
