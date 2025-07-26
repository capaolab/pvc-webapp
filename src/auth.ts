import { TypeORMAdapter } from '@auth/typeorm-adapter';
import NextAuth from 'next-auth';

import {
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
} from '@/core/user/user.entitie';

const entities = {
  UserEntity,
  AccountEntity,
  SessionEntity,
  VerificationTokenEntity,
};

const authConfig = {
  adapter: TypeORMAdapter({
    type: 'postgres',
    url: process.env.AUTH_TYPEORM_CONNECTION as string,
    entities,
  }),
  providers: [],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
