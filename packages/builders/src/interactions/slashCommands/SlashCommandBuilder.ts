import type { JSONEncodable } from '@discordjs/util';
import { ApplicationCommandType, type RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { Mixin } from 'ts-mixer';
import { isValidationEnabled } from '../../util/validation.js';
import { slashCommandPredicate } from './Assertions.js';
import { SharedNameAndDescription } from './mixins/SharedNameAndDescription.js';
import { SharedSlashCommand } from './mixins/SharedSlashCommand.js';
import { SharedSlashCommandOptions } from './mixins/SharedSlashCommandOptions.js';
import { SharedSlashCommandSubcommands } from './mixins/SharedSubcommands.js';

/**
 * A builder that creates API-compatible JSON data for slash commands.
 */
export class SlashCommandBuilder
	extends Mixin(SharedSlashCommandOptions, SharedNameAndDescription, SharedSlashCommandSubcommands, SharedSlashCommand)
	implements JSONEncodable<RESTPostAPIChatInputApplicationCommandsJSONBody>
{
	/**
	 * Serializes this builder to API-compatible JSON data.
	 *
	 * Note that by disabling validation, there is no guarantee that the resulting object will be valid.
	 *
	 * @param validationOverride - Force validation to run/not run regardless of your global preference
	 */
	public toJSON(validationOverride?: boolean): RESTPostAPIChatInputApplicationCommandsJSONBody {
		const { options, ...rest } = this.data;

		const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
			...structuredClone(rest as Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'options'>),
			type: ApplicationCommandType.ChatInput,
			options: options?.map((option) => option.toJSON(validationOverride)),
		};

		if (validationOverride ?? isValidationEnabled()) {
			slashCommandPredicate.parse(data);
		}

		return data;
	}
}
