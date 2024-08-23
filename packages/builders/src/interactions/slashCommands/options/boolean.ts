import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';

/**
 * A slash command boolean option.
 */
export class SlashCommandBooleanOption extends ApplicationCommandOptionBase {
	public constructor() {
		super(ApplicationCommandOptionType.Boolean);
	}
}
