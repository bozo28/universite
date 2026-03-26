import { Env } from '../index';

export async function verifyAuth(request: Request, env: Env): Promise<{ ok: boolean; userId?: string; error?: string }> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { ok: false, error: 'Missing authorization token' };
  }

  const token = authHeader.slice(7);

  try {
    // Verify JWT with Supabase
    const res = await fetch(env.SUPABASE_URL + '/auth/v1/user', {
      headers: {
        'Authorization': 'Bearer ' + token,
        'apikey': env.SUPABASE_ANON_KEY
      }
    });

    if (!res.ok) {
      return { ok: false, error: 'Invalid token' };
    }

    const user = await res.json() as any;
    return { ok: true, userId: user.id };
  } catch {
    return { ok: false, error: 'Auth verification failed' };
  }
}
