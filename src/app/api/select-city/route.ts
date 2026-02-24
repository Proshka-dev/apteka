// app/api/select-city/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
	const { cityId } = await request.json()

	if (!cityId || typeof cityId !== 'number') {
		return NextResponse.json({ error: 'Invalid cityId' }, { status: 400 })
	}

	// Устанавливаем куку
	const cookieStore = await cookies();
	cookieStore.set({
		name: 'selectedCityId',
		value: String(cityId),
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 365, // 1 год
		path: '/',
	})

	return NextResponse.json({ success: true })
}