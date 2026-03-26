export interface Env {
  KIE_AI_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  ALLOWED_ORIGINS: string;
}

import { handleCors, corsHeaders } from './middleware/cors';
import { verifyAuth } from './middleware/auth';
import { handleKonuAnlatim } from './routes/konu-anlatim';
import { handleSoruUret } from './routes/soru-uret';
import { handleSoruCoz } from './routes/soru-coz';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCors(request, env);
    }

    // Health check
    if (url.pathname === '/health') {
      return new Response('OK', { headers: corsHeaders(request, env) });
    }

    // All API routes require auth
    const authResult = await verifyAuth(request, env);
    if (!authResult.ok) {
      return new Response(JSON.stringify({ error: authResult.error }), {
        status: 401,
        headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' }
      });
    }

    const headers = { ...corsHeaders(request, env), 'Content-Type': 'application/json' };

    try {
      // POST /api/konu-anlatim
      if (url.pathname === '/api/konu-anlatim' && request.method === 'POST') {
        return await handleKonuAnlatim(request, env, headers);
      }

      // POST /api/soru-uret
      if (url.pathname === '/api/soru-uret' && request.method === 'POST') {
        return await handleSoruUret(request, env, headers);
      }

      // POST /api/soru-coz
      if (url.pathname === '/api/soru-coz' && request.method === 'POST') {
        return await handleSoruCoz(request, env, headers);
      }

      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || 'Internal error' }), { status: 500, headers });
    }
  }
};
