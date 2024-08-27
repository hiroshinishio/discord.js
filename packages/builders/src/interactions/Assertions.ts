import { Locale } from 'discord-api-types/v10';
import { z } from 'zod';

export const customIdPredicate = z.string().min(1).max(100);

export const memberPermissionsPredicate = z
	.string()
	.refine((str) => !str.includes('.'), { message: 'Permissions must not contain decimal points' });

export const localeMapPredicate = z
	.object(
		Object.fromEntries(Object.values(Locale).map((loc) => [loc, z.string().optional()])) as Record<
			Locale,
			z.ZodOptional<z.ZodString>
		>,
	)
	.strict();
