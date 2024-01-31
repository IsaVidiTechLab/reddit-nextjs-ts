import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get('token')?.value;

  if (!userToken) {
    return NextResponse.redirect(new URL('http://localhost:3000/login', request.url));
  } else {
    return NextResponse.redirect(new URL('http://localhost:3000/', request.url));
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default middleware;