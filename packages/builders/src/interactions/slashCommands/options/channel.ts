import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { Mixin } from 'ts-mixer';
import { channelOptionPredicate } from '../Assertions.js';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';
import { ApplicationCommandOptionChannelTypesMixin } from '../mixins/ApplicationCommandOptionChannelTypesMixin.js';

/**
 * A slash command channel option.
 */
export class SlashCommandChannelOption extends Mixin(
	ApplicationCommandOptionBase,
	ApplicationCommandOptionChannelTypesMixin,
) {
	protected override readonly predicate = channelOptionPredicate;

	public constructor() {
		super(ApplicationCommandOptionType.Channel);
	}
}
