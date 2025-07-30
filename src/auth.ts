import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { signInSchema } from './lib/zod.schemas';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const user = null;
        const { email, password } = await signInSchema.parseAsync(credentials);

        if (!user) {
          throw new Error('Invalid credentials.');
        }
        return user;
      },
    }),
  ],
});
