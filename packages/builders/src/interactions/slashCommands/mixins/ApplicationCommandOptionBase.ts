import type { APIApplicationCommandOption, ApplicationCommandOptionType } from 'discord-api-types/v10';
import { SharedNameAndDescription } from './SharedNameAndDescription.js';

export interface ApplicationCommandOptionBaseData
	extends Partial<
		Pick<
			APIApplicationCommandOption,
			'description_localizations' | 'description' | 'name_localizations' | 'name' | 'required'
		>
	> {
	type: ApplicationCommandOptionType;
}

/**
 * The base application command option builder that contains common symbols for application command builders.
 */
export abstract class ApplicationCommandOptionBase extends SharedNameAndDescription {
	protected declare readonly data: ApplicationCommandOptionBaseData;

	public constructor(type: ApplicationCommandOptionType) {
		super();
		this.data.type = type;
	}

	/**
	 * Sets whether this option is required.
	 *
	 * @param required - Whether this option should be required
	 */
	public setRequired(required: boolean) {
		this.data.required = required;
		return this;
	}
}
