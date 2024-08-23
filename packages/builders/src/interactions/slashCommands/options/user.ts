import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';

/**
 * A slash command user option.
 */
export class SlashCommandUserOption extends ApplicationCommandOptionBase {
	public constructor() {
		super(ApplicationCommandOptionType.User);
	}
}
