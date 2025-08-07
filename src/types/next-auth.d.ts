// types/next-auth.d.ts

import 'next-auth';
import 'next-auth/jwt';

/**
 * A forma do payload decodificado do seu JWT, conforme o exemplo que você forneceu.
 */
interface DecodedUser {
  id: string;
  email: string;
  jti: string;
  iat: number;
  exp: number;
}

declare module 'next-auth' {
  /**
   * Retornado por `authorize`, e recebido como `user` no callback `jwt`.
   */
  interface User extends DecodedUser {
    accessToken: string;
  }

  /**
   * O objeto de sessão retornado por `useSession`, `getSession`, etc.
   */
  interface Session {
    user: DecodedUser;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  /** O token que é passado entre os callbacks e salvo no cookie. */
  interface JWT extends DecodedUser {
    accessToken: string;
  }
}
