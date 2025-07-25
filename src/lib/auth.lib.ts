'use server';

import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

import User from '@/core/user/user.entitie';
import UserRepository from '@/core/user/user.repository';

const userRepository = new UserRepository();

/**
 * Hashes a password with a random salt using scrypt.
 * @param password The plain text password to hash.
 * @returns The salt and hashed password, joined by a dot.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}.${hash}`;
}

/**
 * Checks if a plain password matches the hashed password from the database.
 * @param password The plain text password to check.
 * @param hashed The hashed password from the database (format: salt.hash).
 * @returns True if the password is valid, false otherwise.
 */
export function isPasswordValid(password: string, hashed: string): boolean {
  const [salt, hash] = hashed.split('.');
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, 'hex');
  const passwordHashBuffer = scryptSync(password, salt, 64);
  return timingSafeEqual(hashBuffer, passwordHashBuffer);
}

export function handleAuthentication(
  userEmail: string,
  userPassword: string,
): Promise<User | null> {
  if (!userEmail) {
    throw new Error('Email is required to fetch user.');
  }
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userRepository.getUserByEmail(userEmail);
      if (!user) {
        return reject(new Error('User not found'));
      }
      const isValid = isPasswordValid(userPassword, user.password);
      if (!isValid) {
        return reject(new Error('Invalid password'));
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}
