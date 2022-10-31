import * as bcrypt from 'bcryptjs';
export const hassPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
