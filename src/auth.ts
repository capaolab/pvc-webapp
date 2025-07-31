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
        let user = null;

        //eslint ignore
        const { email, password } = await signInSchema.parseAsync(credentials);

        user = {
          id: '1',
          name: 'admin',
          email,
          password,
        };

        if (!user) {
          throw new Error('Invalid credentials.');
        }
        return user;
      },
    }),
  ],
});
