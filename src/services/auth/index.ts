import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const COOKIES_KEY = '@codeleap';

export async function signUp(username: string) {
  try {
    (await cookies()).set(`${COOKIES_KEY}:username`, username);
    redirect('/');
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}
