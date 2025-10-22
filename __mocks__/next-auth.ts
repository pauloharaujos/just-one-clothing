// Mock for next-auth
export default function NextAuth() {
  return {};
}

export function auth() {
  return Promise.resolve({
    user: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
}

