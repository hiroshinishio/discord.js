import {
	Locale,
	ApplicationIntegrationType,
	InteractionContextType,
	ApplicationCommandOptionType,
} from 'discord-api-types/v10';
import type { ZodTypeAny } from 'zod';
import { z } from 'zod';
import { allowedChannelTypes } from './mixins/ApplicationCommandOptionChannelTypesMixin.js';

export const namePredicate = z
	.string()
	.min(1)
	.max(32)
	.regex(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u);

export const descriptionPredicate = z.string().min(1).max(100);

export const localeMapPredicate = z
	.object(
		Object.fromEntries(Object.values(Locale).map((loc) => [loc, z.string().optional()])) as Record<
			Locale,
			z.ZodOptional<z.ZodString>
		>,
	)
	.strict();

export const sharedNameAndDescriptionPredicate = z.object({
	name: namePredicate,
	name_localizations: localeMapPredicate.optional(),
	description: descriptionPredicate,
	description_localizations: localeMapPredicate.optional(),
});

export const numericMixinNumberOptionPredicate = z.object({
	max_value: z.number().optional(),
	min_value: z.number().optional(),
});

export const numericMixinIntegerOptionPredicate = z.object({
	max_value: z.number().int().optional(),
	min_value: z.number().int().optional(),
});

export const channelMixinOptionPredicate = z.object({
	channel_types: z
		.union(allowedChannelTypes.map((type) => z.literal(type)) as unknown as [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]])
		.array()
		.optional(),
});

export const autocompleteMixinOptionPredicate = z.object({
	autocomplete: z.literal(true),
	choices: z.union([z.never(), z.never().array(), z.undefined()]),
});

export const choiceStringPredicate = z.string().min(1).max(100);
export const choiceNumberPredicate = z.number().min(Number.NEGATIVE_INFINITY).max(Number.POSITIVE_INFINITY);
export const choicePredicate = z.object({
	name: choiceStringPredicate,
	name_localizations: localeMapPredicate.optional(),
	value: z.union([choiceStringPredicate, choiceNumberPredicate]),
});

export const choicesOptionMixinPredicate = z.object({
	autocomplete: z.literal(false).optional(),
	choices: choicePredicate.array().max(25).optional(),
});

export const basicOptionTypes = [
	ApplicationCommandOptionType.Attachment,
	ApplicationCommandOptionType.Boolean,
	ApplicationCommandOptionType.Channel,
	ApplicationCommandOptionType.Integer,
	ApplicationCommandOptionType.Mentionable,
	ApplicationCommandOptionType.Number,
	ApplicationCommandOptionType.Role,
	ApplicationCommandOptionType.String,
	ApplicationCommandOptionType.User,
] as const;

export const basicOptionTypesPredicate = z.union(
	basicOptionTypes.map((type) => z.literal(type)) as unknown as [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]],
);

export const basicOptionPredicate = sharedNameAndDescriptionPredicate.extend({
	required: z.boolean().optional(),
	type: basicOptionTypesPredicate,
});

export const autocompleteOrChoicesMixinOptionPredicate = z.discriminatedUnion('autocomplete', [
	autocompleteMixinOptionPredicate,
	choicesOptionMixinPredicate,
]);

export const channelOptionPredicate = basicOptionPredicate.merge(channelMixinOptionPredicate);

export const integerOptionPredicate = basicOptionPredicate
	.merge(numericMixinIntegerOptionPredicate)
	.and(autocompleteOrChoicesMixinOptionPredicate);

export const numberOptionPredicate = basicOptionPredicate
	.merge(numericMixinNumberOptionPredicate)
	.and(autocompleteOrChoicesMixinOptionPredicate);

export const stringOptionPredicate = basicOptionPredicate
	.extend({
		max_length: z.number().optional(),
		min_length: z.number().optional(),
	})
	.and(autocompleteOrChoicesMixinOptionPredicate);

export const baseSlashCommandPredicate = sharedNameAndDescriptionPredicate.extend({
	contexts: z.array(z.nativeEnum(InteractionContextType)).optional(),
	default_member_permissions: z
		.string()
		.refine((str) => !str.includes('.'), { message: 'Permissions must not contain decimal points' })
		.optional(),
	integration_types: z.array(z.nativeEnum(ApplicationIntegrationType)).optional(),
	nsfw: z.boolean().optional(),
});

// Because you can only add options via builders, there's no need to validate whole objects here otherwise
export const slashCommandOptionsPredicate = z.union([
	z.object({ type: basicOptionTypesPredicate }).array(),
	z.object({ type: z.literal(ApplicationCommandOptionType.Subcommand) }).array(),
	z.object({ type: z.literal(ApplicationCommandOptionType.SubcommandGroup) }).array(),
]);

export const slashCommandPredicate = baseSlashCommandPredicate.extend({
	options: slashCommandOptionsPredicate.optional(),
});

export const slashCommandSubcommandGroupPredicate = sharedNameAndDescriptionPredicate.extend({
	type: z.literal(ApplicationCommandOptionType.SubcommandGroup),
	options: z
		.array(z.object({ type: z.literal(ApplicationCommandOptionType.Subcommand) }))
		.min(1)
		.max(25),
});

export const slashCommandSubcommandPredicate = sharedNameAndDescriptionPredicate.extend({
	type: z.literal(ApplicationCommandOptionType.Subcommand),
	options: z.array(z.object({ type: basicOptionTypesPredicate })).max(25),
});
