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
  const { describe, it, expect, beforeEach, vi } = import.meta.vitest;

  describe('User service - ', () => {
    beforeEach(() => {
      vi.restoreAllMocks(); // Reset all mocks before each test
    });

    describe('storeUser - ', () => {
      it('should call fetch with correct URL and options', async () => {
        const newUser = {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          password: 'password123',
        };

        // Mock the global fetch function
        vi.spyOn(global, 'fetch').mockResolvedValueOnce(
          new Response(JSON.stringify({ id: '123' })),
        );

        const userId = await storeUser(newUser);
        expect(userId).toBe('123'); // Expect the returned ID to be '123'
        expect(global.fetch).toHaveBeenCalledWith(API_USER_URL, {
          method: 'POST',
          headers: getHeaders,
          body: JSON.stringify(newUser),
        });
      });
    });

    describe('getUserById - ', () => {
      it('should call fetch with correct URL', async () => {
        const userId = '123';
        const expectedUser = {
          id: userId,
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
        };

        // Mock the global fetch function
        vi.spyOn(global, 'fetch').mockResolvedValueOnce(
          new Response(JSON.stringify(expectedUser)),
        );

        const user = await getUserById(userId);
        expect(user).toEqual(expectedUser); // Expect the fetched user to match the mock
      });
    });

    describe('getUserByAttribute - ', () => {
      it.each([
        [
          'firstName',
          'Jane',
          {
            id: '123',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@example.com',
          },
        ],
        [
          'email',
          'jane@example.com',
          {
            id: '123',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@example.com',
          },
        ],
      ])(
        'should call fetch with correct URL for attribute %s',
        async (attribute, value, expectedUser) => {
          // Mock the global fetch function
          vi.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(JSON.stringify(expectedUser)),
          );

          const user = await getUserByAttribute(attribute as keyof User, value);
          expect(user).toEqual(expectedUser); // Expect the fetched user to match the mock
        },
      );
    });
  });
}
