import generatePassword from "@utils/generatePassword.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("generatePassword length test", () => {
  assertEquals(generatePassword(8).length, 8);
  assertEquals(generatePassword(16).length, 16);
  assertEquals(generatePassword(4).length, 4);
});
