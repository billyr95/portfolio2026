// src/app/api/revalidate/route.ts
// Point your Sanity webhook at: https://yourdomain.com/api/revalidate
// Set the shared secret in your Sanity webhook config and SANITY_REVALIDATE_SECRET env var.

import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _type, slug } = body;

    if (_type === 'project') {
      // Revalidate the projects list and the specific project page
      revalidateTag('projects');
      if (slug?.current) {
        revalidateTag(`project:${slug.current}`);
      }
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}