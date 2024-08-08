import { NewUser, User } from '~/models';
import { API_BASE_URL, API_ROUTES } from '~/constants/api.constants';

const API_USER_URL = `${API_BASE_URL}${API_ROUTES.USERS}`;

const getHeaders = {
  'Content-Type': 'application/json',
};

export async function storeUser(user: NewUser) {
  try {
    const response = await fetch(API_USER_URL, {
      method: 'POST',
      headers: getHeaders,
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to store user: ${response.statusText}`);
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error storing user:', error);
    throw new Error('Failed to store user');
  }
}

export async function getUserById(userId: string | null) {
  if (!userId) {
    return undefined;
  }
  try {
    const response = await fetch(`${API_USER_URL}?id=${userId}`, {
      headers: getHeaders,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user by ID: ${response.statusText}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

export async function getUserByAttribute(
  attribute: keyof User,
  value: unknown,
) {
  try {
    const encodedValue = encodeURIComponent(String(value));
    const response = await fetch(
      `${API_USER_URL}?${attribute}=${encodedValue}`,
      {
        headers: getHeaders,
      },
    );

    if (!response.ok) {
      const errorDetail = await response.json();
      throw new Error(
        `Failed to fetch user by ${attribute}: ${response.statusText}, Details: ${JSON.stringify(errorDetail)}`,
      );
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error(`Error fetching user by ${attribute}:`, error);
    throw new Error(`Failed to fetch user getUserByAttribute ${attribute}`);
  }
}

// In-Source test suites
// https://vitest.dev/guide/in-source.html
if (import.meta.vitest) {
  const { describe, expect, test } = import.meta.vitest;
  const { default: bcrypt } = await import('bcryptjs');

  describe('User model - ', () => {
    const exampleUser = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('password123', 10),
    };

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
