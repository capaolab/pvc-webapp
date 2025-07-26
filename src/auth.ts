import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { handleAuthentication } from './lib/auth.lib';
import { signInSchema } from './lib/zod.schemas';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        let user = null;

        const { email, password } = await signInSchema.parseAsync(credentials);

        // logic to verify if the user exists
        // user = await handleAuthentication(email, password)
        user = 'viriato';

        if (!user) {
          throw new Error('Invalid credentials.');
        }

        return user;
      },
    }),
  ],
});
