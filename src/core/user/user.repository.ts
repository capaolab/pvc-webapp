import { DevDataSource } from '@/lib/db.lib';

import User from './user.entitie';

class UserRepository {
  async getUserByEmail(userEmail: string): Promise<User | null> {
    const user = await DevDataSource.getRepository(User).findOneBy({
      email: userEmail,
    });
    return user;
  }
}

export default UserRepository;
