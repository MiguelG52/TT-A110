import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const token = body.token;

    if (!token) {
        return NextResponse.json({ message: 'Token requerido' }, { status: 400 });
    }

    cookies().set('token', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 día
    });

    return NextResponse.json({ message: 'Token guardado' });
}
