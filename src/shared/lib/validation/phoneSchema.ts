import { z } from 'zod';

// Отдельное регулярное выражение
export const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

// Переиспользуемая схема Zod для поля телефона
export const phoneSchema = z
	.string()
	.regex(phoneRegex, 'Неверный формат телефона');
