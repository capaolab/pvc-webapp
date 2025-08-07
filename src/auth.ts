import { jwtDecode } from 'jwt-decode';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { signInSchema } from './lib/zod.schemas';

// A resposta esperada da sua API de login
interface AuthResponse {
  accessToken?: string;
  accessTokenExpiresAt?: string;
  message?: string;
}

// O payload decodificado do seu token JWT, conforme o exemplo que você forneceu.
interface DecodedUser {
  id: string;
  email: string;
  jti: string;
  iat: number;
  exp: number;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { email, password } = signInSchema.parse(credentials);

          const res: Response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
            },
          );

          if (!res.ok) {
            const errorData: AuthResponse = await res.json();
            const errorMessage =
              errorData.message || 'Unknown error during authentication';
            throw new Error(errorMessage);
          }

          const loginResponse: AuthResponse = await res.json();

          if (loginResponse) {
            // Decode the accessToken to get the user details
            const decoded = jwtDecode<DecodedUser>(
              loginResponse.accessToken as string,
            );
            // Return a User object that matches the next-auth User interface
            return {
              ...decoded,
              accessToken: loginResponse.accessToken as string,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any;
      return session;
    },
  },
});
