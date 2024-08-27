import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from 'discord-api-types/v10';
import { z } from 'zod';
import { localeMapPredicate, memberPermissionsPredicate } from '../Assertions.js';

export const namePredicate = z
	.string()
	.min(1)
	.max(32)
	// eslint-disable-next-line prefer-named-capture-group
	.regex(/^( *[\p{P}\p{L}\p{N}\p{sc=Devanagari}\p{sc=Thai}]+ *)+$/u);
export const typePredicate = z.union([
	z.literal(ApplicationCommandType.User),
	z.literal(ApplicationCommandType.Message),
]);

export const contextsPredicate = z.array(z.nativeEnum(InteractionContextType));
export const integrationTypesPredicate = z.array(z.nativeEnum(ApplicationIntegrationType));

export const contextMenuPredicate = z.object({
	type: typePredicate,
	contexts: contextsPredicate.optional(),
	default_member_permissions: memberPermissionsPredicate.optional(),
	name: namePredicate,
	name_localizations: localeMapPredicate.optional(),
	integration_types: integrationTypesPredicate.optional(),
	nsfw: z.boolean().optional(),
});
