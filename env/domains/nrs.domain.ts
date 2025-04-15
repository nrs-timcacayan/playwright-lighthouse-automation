type NrsDomain = {
  baseUrl: string;
  loginUrl: string;
  endUserEmail: string;
  endUserEncryptedPassword: string;
  underwriterEmail: string;
  underwriterEncryptedPassword: string;
  adminEmail: string;
  adminEncryptedPassword: string;
};

export const nrsDomain: NrsDomain = {
  baseUrl: process.env.NRS_BASE_URL!,
  loginUrl: process.env.NRS_LOGIN_URL!,
  endUserEmail: process.env.ENDUSER_EMAIL!,
  endUserEncryptedPassword: process.env.ENDUSER_ENCRYPTED_PASSWORD!,
  underwriterEmail: process.env.UNDERWRITER_EMAIL!,
  underwriterEncryptedPassword: process.env.UNDERWRITER_ENCRYPTED_PASSWORD!,
  adminEmail: process.env.ADMIN_EMAIL!,
  adminEncryptedPassword: process.env.ADMIN_ENCRYPTED_PASSWORD!,
};
