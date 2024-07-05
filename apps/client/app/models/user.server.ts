import { User } from '~/types/auth';

// Simulate a user database
// TODO: Replace this with an API call to a real database
const usersMap = new Map<string, User>();

export function storeUser(user: User) {
  usersMap.set(user.id, user);
  return user.id;
}

export function getUserById(userId: string | undefined) {
  if (!userId) {
    return undefined;
  }

  return usersMap.get(userId);
}

/**
 * Retrieves a user based on the specified attribute and value.
 * @param attribute - The attribute of the user object to search for.
 * @param value - The value to match against the specified attribute.
 * @returns The user object if found, or null if not found.
 */
export function getUserByAttribute(attribute: keyof User, value: unknown) {
  for (const user of usersMap.values()) {
    if (user[attribute] === value) {
      return user;
    }
  }
  return null;
}

// In-Source test suites
// https://vitest.dev/guide/in-source.html
if (import.meta.vitest) {
  const { describe, expect, test } = import.meta.vitest;
  const { default: bcrypt } = await import('bcryptjs');

  describe('User model - ', () => {
    const exampleUser = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: bcrypt.hashSync('password123', 10)};

    describe('storeUser - ', () => {
      test('should store provided user in Map', () => {

        storeUser(exampleUser);

        expect(usersMap.size).toEqual(1);
        expect(usersMap.get('1')).toEqual(exampleUser);
      });
    });

    describe('getUserById - ', () => {
      test('should return a user by ID', () => {
        const user = getUserById('1');
        expect(user).toEqual(exampleUser);
      });
    });

    describe('getUserByAttribute - ', () => {
      test.each([
        ['firstName', 'John'],
        ['email', 'john@example.com'],
      ])('should return a user by %s attribute', (attribute, value) => {
        const user = getUserByAttribute(attribute as keyof User, value);
        expect(user).toEqual(exampleUser);
      });
  
      test('should return null for a non-existent attribute value', () => {
        const user = getUserByAttribute('email', 'nonexistent@example.com');
        expect(user).toBeNull();
      });
    });
  });
}
