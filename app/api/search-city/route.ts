import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q') || '';

  const meiliUrl = 'https://getmeilimeilisearchv190-production-6c20.up.railway.app';
  const meiliApiKey = process.env.MEILI_MASTER_KEY!;

  const res = await fetch(`${meiliUrl}/indexes/cities/search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${meiliApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
