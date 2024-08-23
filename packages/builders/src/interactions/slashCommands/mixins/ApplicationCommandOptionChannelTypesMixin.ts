import type { APIApplicationCommandChannelOption } from 'discord-api-types/v10';
import { normalizeArray, type RestOrArray } from '../../../util/normalizeArray';

/**
 * The type of allowed channel types used for a channel option.
 */
export type ApplicationCommandOptionAllowedChannelTypes = Exclude<
	APIApplicationCommandChannelOption['channel_types'],
	undefined
>[number];

export interface ApplicationCommandOptionChannelTypesData
	extends Pick<APIApplicationCommandChannelOption, 'channel_types'> {}

/**
 * This mixin holds channel type symbols used for options.
 */
export class ApplicationCommandOptionChannelTypesMixin {
	protected declare readonly data: ApplicationCommandOptionChannelTypesData;

	/**
	 * Adds channel types to this option.
	 *
	 * @param channelTypes - The channel types
	 */
	public addChannelTypes(...channelTypes: RestOrArray<ApplicationCommandOptionAllowedChannelTypes>) {
		this.data.channel_types ??= [];
		this.data.channel_types.push(...normalizeArray(channelTypes));

		return this;
	}
}
