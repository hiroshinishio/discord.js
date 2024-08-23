import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';

/**
 * A slash command attachment option.
 */
export class SlashCommandAttachmentOption extends ApplicationCommandOptionBase {
	public constructor() {
		super(ApplicationCommandOptionType.Attachment);
	}
}
