import { cookies } from 'next/headers';
import { prisma } from './prisma';

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  chapterId?: string | null;
  chapterSlug?: string | null;
  chapterName?: string | null;
}

const SESSION_COOKIE_NAME = 'yi_session_user';

export async function getCurrentSession(): Promise<AuthSession | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(sessionCookie.value)) as AuthSession;
    return parsed;
  } catch {
    return null;
  }
}

export function setSessionCookie(session: AuthSession) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, encodeURIComponent(JSON.stringify(session)), {
    path: '/',
    httpOnly: false, // accessible to client for fast UX/demo
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
