// Mock for next/headers
export function headers() {
  return Promise.resolve({
    get: (name: string) => {
      if (name === 'host') return 'localhost:3000';
      return null;
    },
  });
}

