import { z } from 'zod';


export const nameSchema = z
	.string()
	.length(0, { message: 'Имя должно быть либо пустым, либо длиннее 1 буквы' })
	.or(z.string().min(2, 'Имя слишком короткое'));



