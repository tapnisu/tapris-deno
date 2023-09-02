export const defaultCharset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Generate new password
 * @param length Length of new password
 * @param charset Charset for new password. If not used, will use default one: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
 * @returns Password
 */
export const generatePassword = (
  length: number,
  charset = defaultCharset,
): string => {
  let password = "";

  for (let i = 0; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};
