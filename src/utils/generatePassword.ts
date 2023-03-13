export const defaultCharset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function generatePassword(
  length: number,
  charset = defaultCharset,
) {
  let password = "";

  for (let i = 0; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}
