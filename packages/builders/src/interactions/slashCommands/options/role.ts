import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';

/**
 * A slash command role option.
 */
export class SlashCommandRoleOption extends ApplicationCommandOptionBase {
	public constructor() {
		super(ApplicationCommandOptionType.Role);
	}
}
