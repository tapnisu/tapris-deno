import { defaultCharset, generatePassword } from "@utils/generatePassword.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("generatePassword length test", () => {
  assertEquals(generatePassword(8).length, 8);
  assertEquals(generatePassword(16).length, 16);
  assertEquals(generatePassword(4).length, 4);
});

Deno.test("generatePassword symbols test", () => {
  generatePassword(8)
    .split("")
    .forEach((char) => {
      assertEquals(defaultCharset.includes(char), true);
    });

  const customCharset = "abcdefg1234";

  generatePassword(16, customCharset)
    .split("")
    .forEach((char) => {
      assertEquals(customCharset.includes(char), true);
    });
});
