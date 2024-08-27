import type { JSONEncodable } from '@discordjs/util';
import type {
	APIApplicationCommandSubcommandOption,
	APIApplicationCommandSubcommandGroupOption,
} from 'discord-api-types/v10';
import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { Mixin } from 'ts-mixer';
import { isValidationEnabled } from '../../util/validation.js';
import { slashCommandSubcommandGroupPredicate, slashCommandSubcommandPredicate } from './Assertions.js';
import type { SharedNameAndDescriptionData } from './mixins/SharedNameAndDescription.js';
import { SharedNameAndDescription } from './mixins/SharedNameAndDescription.js';
import { SharedSlashCommandOptions } from './mixins/SharedSlashCommandOptions.js';

export interface SlashCommandSubcommandGroupData {
	options?: SlashCommandSubcommandBuilder[];
}

/**
 * Represents a folder for subcommands.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups}
 */
export class SlashCommandSubcommandGroupBuilder
	extends SharedNameAndDescription
	implements JSONEncodable<APIApplicationCommandSubcommandGroupOption>
{
	protected declare readonly data: SharedNameAndDescriptionData & SlashCommandSubcommandGroupData;

	/**
	 * Adds a new subcommand to this group.
	 *
	 * @param input - A function that returns a subcommand builder or an already built builder
	 */
	public addSubcommand(
		input:
			| SlashCommandSubcommandBuilder
			| ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder),
	) {
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		const result = typeof input === 'function' ? input(new SlashCommandSubcommandBuilder()) : input;

		this.data.options ??= [];
		this.data.options.push(result);

		return this;
	}

	/**
	 * Serializes this builder to API-compatible JSON data.
	 *
	 * Note that by disabling validation, there is no guarantee that the resulting object will be valid.
	 *
	 * @param validationOverride - Force validation to run/not run regardless of your global preference
	 */
	public toJSON(validationOverride?: boolean): APIApplicationCommandSubcommandGroupOption {
		const { options, ...rest } = this.data;

		const data = {
			type: ApplicationCommandOptionType.SubcommandGroup as const,
			...(structuredClone(rest) as Omit<APIApplicationCommandSubcommandGroupOption, 'type'>),
			options: options?.map((option) => option.toJSON(validationOverride)) ?? [],
		};

		if (validationOverride ?? isValidationEnabled()) {
			slashCommandSubcommandGroupPredicate.parse(data);
		}

		return data;
	}
}

/**
 * A builder that creates API-compatible JSON data for slash command subcommands.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups}
 */
export class SlashCommandSubcommandBuilder
	extends Mixin(SharedNameAndDescription, SharedSlashCommandOptions)
	implements JSONEncodable<APIApplicationCommandSubcommandOption>
{
	/**
	 * Serializes this builder to API-compatible JSON data.
	 *
	 * Note that by disabling validation, there is no guarantee that the resulting object will be valid.
	 *
	 * @param validationOverride - Force validation to run/not run regardless of your global preference
	 */
	public toJSON(validationOverride?: boolean): APIApplicationCommandSubcommandOption {
		const { options, ...rest } = this.data;

		const data = {
			type: ApplicationCommandOptionType.Subcommand as const,
			...(structuredClone(rest) as Omit<APIApplicationCommandSubcommandOption, 'type'>),
			options: options?.map((option) => option.toJSON(validationOverride)) ?? [],
		};

		if (validationOverride ?? isValidationEnabled()) {
			slashCommandSubcommandPredicate.parse(data);
		}

		return data;
	}
}
