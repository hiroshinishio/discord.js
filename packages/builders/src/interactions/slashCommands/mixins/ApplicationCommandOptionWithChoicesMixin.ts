import type { APIApplicationCommandOptionChoice } from 'discord-api-types/v10';
import { normalizeArray, type RestOrArray } from '../../../util/normalizeArray.js';

export interface ApplicationCommandOptionWithChoicesData {
	choices?: APIApplicationCommandOptionChoice<number | string>[];
}

/**
 * This mixin holds choices and autocomplete symbols used for options.
 */
export class ApplicationCommandOptionWithChoicesMixin {
	// No shot we're also picking choices from discord-api-types here as well, we end up with `[]` in the union
	// and it breaks everything
	protected declare readonly data: ApplicationCommandOptionWithChoicesData;

	/**
	 * Adds multiple choices to this option.
	 *
	 * @param choices - The choices to add
	 */
	public addChoices(...choices: RestOrArray<APIApplicationCommandOptionChoice<number | string>>): this {
		const normalizedChoices = normalizeArray(choices);

		this.data.choices ??= [];
		this.data.choices.push(...normalizedChoices);

		return this;
	}

	/**
	 * Sets multiple choices for this option.
	 *
	 * @param choices - The choices to set
	 */
	public setChoices(...choices: RestOrArray<APIApplicationCommandOptionChoice<number | string>>): this {
		this.data.choices = normalizeArray(choices);
		return this;
	}
}
