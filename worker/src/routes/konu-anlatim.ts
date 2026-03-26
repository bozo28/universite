import { Env } from '../index';
import { callKieAI } from '../services/kie-ai';

export async function handleKonuAnlatim(request: Request, env: Env, headers: Record<string, string>): Promise<Response> {
  const body = await request.json() as any;
  const { subjectName, topicName, detailed } = body;

  if (!subjectName || !topicName) {
    return new Response(JSON.stringify({ error: 'subjectName ve topicName gerekli' }), { status: 400, headers });
  }

  const systemPrompt = `Sen bir universite sinav hazirlik ogretmenisin. TYT ve AYT sinavlarina hazirlanan ogrencilere konu anlatimi yapiyorsun.

Kurallarin:
- Sade, anlasilir ve ogretici bir dil kullan
- Gerektiginde orneklerle destekle
- Gorsel uretme, sadece metin kullan
- Emin olmadigin bilgilerde "Kontrol edilmesi onerilir" ifadesini kullan
- Tarih ve edebiyatta uydurma bilgi uretme
- Onemli kavramlari **kalin** yaz
- Formulleri ve onemli bilgileri vurgula
- KESINLIKLE sonuna "istersen su konuda da yardimci olabilirim", "sana su sekilde de hazirlayabilirim" gibi oneri veya teklif cumlesi EKLEME. Sadece konu anlatimini yap ve bitir. Hicbir ek teklif, oneri veya soru sorma.`;

  let userPrompt: string;
  if (detailed) {
    userPrompt = `${subjectName} dersi, "${topicName}" konusunu COK DETAYLI ve KAPSAMLI anlat. Ileri duzey bilgiler, coklu ornekler, sinav ipuclari, sik yapilan hatalar, karsilastirmali tablolar, onemli tarihler/formullerin tamamini ekle. Konunun tum alt basliklarini derinlemesine isle. Onceki temel anlatimin uzerine ciddi sekilde derinlestir.`;
  } else {
    userPrompt = `${subjectName} dersi, "${topicName}" konusunu ORTA DETAYDA anlat. Temel kavramlari, onemli formulleri, ornekleri ve sinav icin bilinmesi gereken kritik bilgileri icersin. Sadece yuzeysel degil, konunun onemli noktalarini da acikla. Sinav odakli, ogrencinin iyi anlayabilecegi sekilde anlat.`;
  }

  const messages = [
    { role: 'system' as const, content: [{ type: 'input_text' as const, text: systemPrompt }] },
    { role: 'user' as const, content: [{ type: 'input_text' as const, text: userPrompt }] }
  ];

  const text = await callKieAI(env.KIE_AI_API_KEY, messages, detailed ? 'high' : 'medium');

  return new Response(JSON.stringify({ explanation: text }), { status: 200, headers });
}
