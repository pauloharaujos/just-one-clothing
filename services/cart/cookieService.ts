import { cookies } from 'next/headers';

const GUEST_TOKEN_COOKIE = 'guest-cart-token';

/**
 * Get or generate a guest token for cart
 */
export async function getGuestToken(): Promise<string> {
  const cookieStore = await cookies();
  let guestToken = cookieStore.get(GUEST_TOKEN_COOKIE)?.value;
  
  if (!guestToken) {
    guestToken = generateGuestToken();
    cookieStore.set(GUEST_TOKEN_COOKIE, guestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  
  return guestToken;
}

/**
 * Generate a unique guest token
 */
function generateGuestToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
