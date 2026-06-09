// src/shared/lib/file-storage.ts
import path from 'path';
import fs from 'fs';

// 1. Гарантируем, что корневой путь ВСЕГДА будет абсолютным, независимо от env
const RAW_UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'storage/images');
const UPLOAD_DIR = path.resolve(RAW_UPLOAD_DIR);

/**
 * Возвращает абсолютный путь к файлу по его имени (или id) и папке.
 * Проверяет, что путь не выходит за пределы UPLOAD_DIR (защита от path traversal).
 */
export function getSafeFilePath(subPath: string): string | null {
	// На всякий случай проверяем, что на входе есть строка
	if (!subPath) return null;

	// Получаем абсолютный путь к запрашиваемому файлу
	const resolved = path.resolve(UPLOAD_DIR, subPath);

	// Специфика Windows: если UPLOAD_DIR — это корень диска (например, "C:\"), 
	// то path.sep добавлять не нужно, иначе получится "C:\\"
	const trailingSep = UPLOAD_DIR.endsWith(path.sep) ? '' : path.sep;
	const safePrefix = UPLOAD_DIR + trailingSep;

	// 2. Безопасная проверка: итоговый путь должен либо строго совпадать с папкой, 
	// либо находиться внутри неё (благодаря разделителю safePrefix)
	if (resolved !== UPLOAD_DIR && !resolved.startsWith(safePrefix)) {
		return null; // Попытка выхода за пределы
	}

	return resolved;
}

/**
 * Читает файл и возвращает буфер. Возвращает null, если файл не существует.
 */
export function readFileSafe(filePath: string): Buffer | null {
	try {
		if (fs.existsSync(filePath)) {
			return fs.readFileSync(filePath);
		}
		return null;
	} catch {
		return null;
	}
}

/**
 * Определяет MIME-тип по расширению файла. 
 * В реальном проекте можно использовать библиотеку 'mime-types', но для старта достаточно.
 */
export function getMimeType(filePath: string): string {
	const ext = path.extname(filePath).toLowerCase();
	const mimeMap: Record<string, string> = {
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.png': 'image/png',
		'.webp': 'image/webp',
		'.gif': 'image/gif',
		'.svg': 'image/svg+xml',
	};
	return mimeMap[ext] || 'application/octet-stream';
}