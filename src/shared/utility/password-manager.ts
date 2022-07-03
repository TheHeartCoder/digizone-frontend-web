import * as bcrypt from 'bcrypt';

// hashed user provided password
export const generateHashPassword = async (
  password: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// compare hashed password with user provided password
export const comaprePassword = async (
  hashedPassword: string,
  userPassword: string,
): Promise<any> => {
  return await bcrypt.compare(userPassword, hashedPassword);
};
