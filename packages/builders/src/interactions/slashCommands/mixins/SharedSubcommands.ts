import { SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from '../SlashCommandSubcommands.js';

export interface SharedSlashCommandSubcommandsData {
	options?: (SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder)[];
}

/**
 * This mixin holds symbols that can be shared in slash subcommands.
 *
 * @typeParam TypeAfterAddingSubcommands - The type this class should return after adding a subcommand or subcommand group.
 */
export class SharedSlashCommandSubcommands {
	protected declare readonly data: SharedSlashCommandSubcommandsData;

	/**
	 * Adds a new subcommand group to this command.
	 *
	 * @param input - A function that returns a subcommand group builder or an already built builder
	 */
	public addSubcommandGroup(
		input:
			| SlashCommandSubcommandGroupBuilder
			| ((subcommandGroup: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder),
	): this {
		this.data.options ??= [];

		const result = typeof input === 'function' ? input(new SlashCommandSubcommandGroupBuilder()) : input;
		this.data.options.push(result);

		return this;
	}

	/**
	 * Adds a new subcommand to this command.
	 *
	 * @param input - A function that returns a subcommand builder or an already built builder
	 */
	public addSubcommand(
		input:
			| SlashCommandSubcommandBuilder
			| ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder),
	): this {
		this.data.options ??= [];

		const result = typeof input === 'function' ? input(new SlashCommandSubcommandBuilder()) : input;
		this.data.options.push(result);

		return this;
	}
}
