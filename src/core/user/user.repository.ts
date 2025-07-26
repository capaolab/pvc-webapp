import { AppDataSource } from '@/lib/db.lib';

import { UserEntity } from './user.entitie';

class UserRepository {
  async getUserByEmail(userEmail: string): Promise<UserEntity | null> {
    const user = await AppDataSource.getRepository(UserEntity).findOneBy({
      email: userEmail,
    });
    return user;
  }
}

export default UserRepository;
