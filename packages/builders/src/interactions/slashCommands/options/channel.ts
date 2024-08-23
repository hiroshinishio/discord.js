import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { Mixin } from 'ts-mixer';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';
import { ApplicationCommandOptionChannelTypesMixin } from '../mixins/ApplicationCommandOptionChannelTypesMixin.js';

/**
 * A slash command channel option.
 */
export class SlashCommandChannelOption extends Mixin(
	ApplicationCommandOptionBase,
	ApplicationCommandOptionChannelTypesMixin,
) {
	public constructor() {
		super(ApplicationCommandOptionType.Channel);
	}
}
