// app/api/image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSafeFilePath, readFileSafe, getMimeType } from '@/shared/lib/file-storage';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const filePath = searchParams.get('filePath');

	if (!filePath) {
		return new NextResponse('Missing file path', { status: 400 });
	}

	// 1. Проверка прав (опционально). Например, только авторизованные админы могут видеть определённые изображения.
	// const session = await auth(); // если используется NextAuth
	// if (!session) return new NextResponse('Unauthorized', { status: 401 });

	// 2. Получаем безопасный абсолютный путь
	const safeFilePath = getSafeFilePath(filePath);
	if (!safeFilePath) {
		return new NextResponse('Forbidden', { status: 403 });
	}

	// 3. Читаем файл
	const buffer = readFileSafe(safeFilePath);
	if (!buffer) {
		return new NextResponse('Not found', { status: 404 });
	}

	// 4. Определяем MIME-тип и возвращаем ответ с кешированием
	const mimeType = getMimeType(safeFilePath);
	return new NextResponse(buffer, {
		status: 200,
		headers: {
			'Content-Type': mimeType,
			'Cache-Control': 'public, max-age=31536000, immutable', // Кеш на год для статичных изображений
		},
	});
}