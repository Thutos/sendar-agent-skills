# Server-side HTTP integration

No SDK is required. In Node.js 20+ (including a Next.js server route):

```js
export async function sendApplicationEmail({eventId, from, to, subject, text}) {
  if (!process.env.SENDAR_API_KEY) throw new Error("SENDAR_API_KEY is missing");
  const response = await fetch("https://sendar.app/api/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SENDAR_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": eventId,
    },
    body: JSON.stringify({from, to: [to], subject, text}),
    signal: AbortSignal.timeout(30000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Sendar request failed (${response.status})`);
  return result;
}
```

`eventId` must be stable per intended message and match `[-A-Za-z0-9_:]{16,128}`. This opt-in API idempotency behaviour stores the first result. A reused key with changed content is rejected. A pending/uncertain result must be inspected, not resent under a new key. Failed attempts may require a deliberate new attempt after diagnosing the cause; do not automatically generate new keys.

Use text or html, or both. HTML from users requires appropriate escaping. The sending domain must be verified. HTTP 201 means acceptance, not inbox delivery. Read `/emails/{id}` for status; a permanent 4xx needs correction, not blind retries. Normal plan caps and suppression checks apply.

Existing copy-in Next.js, Node and Python examples: https://github.com/Thutos/sendar-email-starters. Keep keys out of public client components and redact request headers from logging.
