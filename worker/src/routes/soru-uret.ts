import { Env } from '../index';
import { callKieAI } from '../services/kie-ai';

export async function handleSoruUret(request: Request, env: Env, headers: Record<string, string>): Promise<Response> {
  const body = await request.json() as any;
  const { subjectName, topicName, count } = body;
  const questionCount = count || 10;

  if (!subjectName || !topicName) {
    return new Response(JSON.stringify({ error: 'subjectName ve topicName gerekli' }), { status: 400, headers });
  }

  const systemPrompt = `Sen bir universite sinav soru yazarisin. TYT ve AYT formatinda sorular uretiyorsun.

Kurallarin:
- Zorluk dagilimi: %20 kolay, %60 orta, %20 zor seviyede olmali
- 5 sikli coktan secmeli (A, B, C, D, E)
- Sorular tutarli ve sinav formatina uygun olmali
- Ayni test icinde tekrar eden soru olmamali
- Sayisal sorularda tutarli cozumu olan sorular uret
- Tarih ve edebiyatta uydurma bilgi uretme
- Kolay sorular temel kavramlari olcsun, orta sorular uygulama gerektirsin, zor sorular analiz ve yorum istesin

ONEMLI: Cevabini SADECE JSON formatinda ver, baska hicbir sey yazma.`;

  const userPrompt = `${subjectName} dersi, "${topicName}" konusundan ${questionCount} adet soru uret.

JSON formati:
[
  {
    "text": "Soru metni",
    "options": ["A secenegi", "B secenegi", "C secenegi", "D secenegi", "E secenegi"],
    "correctIndex": 0
  }
]

correctIndex 0-4 arasi olmali (0=A, 1=B, 2=C, 3=D, 4=E). Sadece JSON array dondur.`;

  const messages = [
    { role: 'system' as const, content: [{ type: 'input_text' as const, text: systemPrompt }] },
    { role: 'user' as const, content: [{ type: 'input_text' as const, text: userPrompt }] }
  ];

  const text = await callKieAI(env.KIE_AI_API_KEY, messages, 'medium');

  // Parse JSON from response
  let questions;
  try {
    // Try to extract JSON array from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      questions = JSON.parse(jsonMatch[0]);
    } else {
      questions = JSON.parse(text);
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Soru uretiminde hata olustu, tekrar deneyin' }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ questions }), { status: 200, headers });
}
