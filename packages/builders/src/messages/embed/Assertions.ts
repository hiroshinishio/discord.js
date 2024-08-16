import { Result, s } from '@sapphire/shapeshift';
import type { APIEmbedField } from 'discord-api-types/v10';

const namePredicate = s.string().lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(256);

const iconURLPredicate = s.string().url({
	allowedProtocols: ['http:', 'https:', 'attachment:'],
});

const URLPredicate = s.string().url({
	allowedProtocols: ['http:', 'https:'],
});

export const embedFieldPredicate = s.object<APIEmbedField>({
	name: namePredicate,
	value: s.string().lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(1_024),
	inline: s.boolean().optional(),
});

export const embedAuthorPredicate = s.object({
	name: namePredicate,
	icon_url: iconURLPredicate.optional(),
	proxy_icon_url: iconURLPredicate.optional(),
	url: URLPredicate.optional(),
});

export const embedFooterPredicate = s.object({
	text: s.string().lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(2_048),
	icon_url: iconURLPredicate.optional(),
	proxy_icon_url: iconURLPredicate.optional(),
});

export const embedPredicate = s
	.object({
		title: namePredicate.optional(),
		description: s.string().lengthGreaterThanOrEqual(1).lengthLessThanOrEqual(4_096).optional(),
		url: URLPredicate.optional(),
		timestamp: s.string().optional(),
		color: s.number().int().greaterThanOrEqual(0).lessThanOrEqual(0xffffff).optional(),
		footer: embedFooterPredicate.optional(),
		image: s.object({ url: URLPredicate }).optional(),
		thumbnail: s.object({ url: URLPredicate }).optional(),
		author: embedAuthorPredicate.optional(),
		fields: s.array(embedFieldPredicate).lengthLessThanOrEqual(25).optional(),
	})
	.reshape((value) => {
		if (!Object.keys(value).length) return Result.err(new Error('Embed must have at least one property set.'));
		return Result.ok(value);
	});
