import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async(password:string, hash:string) => {
  return await bcrypt.compare(password, hash)
}

export const extractTokenFromHeader = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) return null;
  const [, token] = authorizationHeader.split(" ");
  return token || null;
};



