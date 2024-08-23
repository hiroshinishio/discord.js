import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';

/**
 * A slash command mentionable option.
 */
export class SlashCommandMentionableOption extends ApplicationCommandOptionBase {
	public constructor() {
		super(ApplicationCommandOptionType.Mentionable);
	}
}
