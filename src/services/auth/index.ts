'use server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const COOKIES_KEY = '@codeleap';

export async function signUp(username: string) {
  try {
    const id = uuidv4();

    const token = (await cookies()).get(`${COOKIES_KEY}:token`)?.value;

    if (token) {
      return {
        message: 'User signed up successfully',
        ok: true,
        user: { id, username },
      };
    }

    (await cookies()).set(`${COOKIES_KEY}:token`, id, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      message: 'User signed up successfully',
      ok: true,
      user: { id, username },
    };
  } catch (error) {
    console.error('Error setting cookie:', error);
    return { error: 'Failed to set cookie', ok: false, user: null };
  }
}

export async function logout() {
  try {
    (await cookies()).delete(`${COOKIES_KEY}:token`);

    return { message: 'User logged out successfully', ok: true };
  } catch (error) {
    console.error('Error deleting cookie:', error);
    return { error: 'Failed to delete cookie', ok: false };
  }
}
