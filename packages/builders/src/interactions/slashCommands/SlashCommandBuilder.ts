import { Mixin } from 'ts-mixer';
import { SharedNameAndDescription } from './mixins/SharedNameAndDescription.js';
import { SharedSlashCommand } from './mixins/SharedSlashCommand.js';
import { SharedSlashCommandOptions } from './mixins/SharedSlashCommandOptions.js';
import { SharedSlashCommandSubcommands } from './mixins/SharedSubcommands.js';

/**
 * A builder that creates API-compatible JSON data for slash commands.
 */
export class SlashCommandBuilder extends Mixin(
	SharedSlashCommandOptions,
	SharedNameAndDescription,
	SharedSlashCommandSubcommands,
	SharedSlashCommand,
) {}
