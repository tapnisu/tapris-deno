export const defaultCharset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generatePassword = (
  length: number,
  charset = defaultCharset
): string => {
  let password = "";

  for (let i = 0; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};
