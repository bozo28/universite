const KIE_API_URL = 'https://api.kie.ai/codex/v1/responses';

function parseSSEResponse(raw: string): string {
  const lines = raw.split('\n');
  let resultText = '';

  for (const line of lines) {
    if (!line.startsWith('data:')) continue;
    const jsonStr = line.slice(5).trim();
    if (!jsonStr || jsonStr === '[DONE]') continue;
    try {
      const data = JSON.parse(jsonStr);
      // Handle response.output_text.delta
      if (data.type === 'response.output_text.delta' && data.delta) {
        resultText += data.delta;
      }
      // Handle response.completed with full output
      if (data.type === 'response.completed' && data.response?.output) {
        for (const item of data.response.output) {
          if (item.type === 'message' && item.content) {
            for (const c of item.content) {
              if (c.type === 'output_text') return c.text;
            }
          }
        }
      }
      // Handle delta content
      if (data.choices?.[0]?.delta?.content) {
        resultText += data.choices[0].delta.content;
      }
    } catch {
      // Skip non-JSON data lines
    }
  }

  if (resultText) return resultText;
  throw new Error('Could not parse SSE response');
}

export interface KieMessage {
  role: 'user' | 'system' | 'assistant';
  content: KieContent[];
}

export type KieContent =
  | { type: 'input_text'; text: string }
  | { type: 'input_image'; image_url: string };

export async function callKieAI(
  apiKey: string,
  messages: KieMessage[],
  effort: string = 'low'
): Promise<string> {
  const body = {
    model: 'gpt-5-4',
    input: messages,
    stream: false,
    reasoning: { effort },
    tools: [],
    tool_choice: 'auto'
  };

  const res = await fetch(KIE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Kie AI error (${res.status}): ${err}`);
  }

  const rawText = await res.text();

  // Check if response is SSE (Server-Sent Events) format
  if (rawText.startsWith('event:') || rawText.startsWith('data:')) {
    return parseSSEResponse(rawText);
  }

  const data = JSON.parse(rawText) as any;

  // Extract text from response
  if (data.output && Array.isArray(data.output)) {
    for (const item of data.output) {
      if (item.type === 'message' && item.content) {
        for (const c of item.content) {
          if (c.type === 'output_text') return c.text;
        }
      }
    }
  }

  // Fallback: try common response formats
  if (data.text) return data.text;
  if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;

  throw new Error('Unexpected API response format');
}
