import { Env } from '../index';
import { callKieAI, KieContent } from '../services/kie-ai';

export async function handleSoruCoz(request: Request, env: Env, headers: Record<string, string>): Promise<Response> {
  const body = await request.json() as any;
  const { questionText, imageUrl } = body;

  if (!questionText && !imageUrl) {
    return new Response(JSON.stringify({ error: 'questionText veya imageUrl gerekli' }), { status: 400, headers });
  }

  const systemPrompt = `Sen bir universite sinav cozum ogretmenisin. Ogrencilerin sordugu sorulari adim adim cozuyorsun.

Kurallarin:
- Adim adim cozum yap
- Her adimi acikla
- Emin degilsen "Kontrol edilmesi onerilir" de
- Sayisal sorularda tutarli cozum uret
- Tarih ve edebiyatta uydurma bilgi uretme

ONEMLI: Cevabini SADECE JSON formatinda ver, baska hicbir sey yazma.

JSON formati:
{
  "steps": [
    { "title": "Adim basligi", "content": "Adim aciklamasi" }
  ],
  "finalAnswer": "Son cevap",
  "note": "Varsa ek not (opsiyonel)"
}`;

  const userContent: KieContent[] = [];

  if (imageUrl) {
    userContent.push({ type: 'input_image', image_url: imageUrl });
    userContent.push({ type: 'input_text', text: questionText || 'Bu soruyu adim adim coz ve JSON formatinda cevap ver.' });
  } else {
    userContent.push({ type: 'input_text', text: `Su soruyu adim adim coz ve JSON formatinda cevap ver:\n\n${questionText}` });
  }

  const messages = [
    { role: 'system' as const, content: [{ type: 'input_text' as const, text: systemPrompt }] },
    { role: 'user' as const, content: userContent }
  ];

  const text = await callKieAI(env.KIE_AI_API_KEY, messages, 'medium');

  // Parse JSON from response
  let solution;
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      solution = JSON.parse(jsonMatch[0]);
    } else {
      solution = JSON.parse(text);
    }
  } catch {
    // If JSON parse fails, create structured response from text
    solution = {
      steps: [{ title: 'Cozum', content: text }],
      finalAnswer: 'Yukaridaki cozume bakiniz.',
      note: null
    };
  }

  return new Response(JSON.stringify({ solution }), { status: 200, headers });
}
