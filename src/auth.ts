import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import User from '@/core/user/user.entitie';
// Your own logic for dealing with plaintext password strings; be careful!
import { handleAuthentication } from '@/lib/auth.lib';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        let user: User | null = null;

        if (
          typeof credentials?.password !== 'string' ||
          typeof credentials?.email !== 'string'
        ) {
          throw new Error('Invalid credentials.');
        }

        user = await handleAuthentication(
          credentials.email,
          credentials.password,
        );

        if (!user) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
        };
      },
    }),
  ],
});
