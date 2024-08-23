import type { APIApplicationCommandOptionChoice } from 'discord-api-types/v10';
import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { Mixin } from 'ts-mixer';
import type { RestOrArray } from '../../../util/normalizeArray.js';
import { ApplicationCommandNumericOptionMinMaxValueMixin } from '../mixins/ApplicationCommandNumericOptionMinMaxValueMixin.js';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase.js';
import { ApplicationCommandOptionWithAutocompleteMixin } from '../mixins/ApplicationCommandOptionWithAutocompleteMixin.js';
import { ApplicationCommandOptionWithChoicesMixin } from '../mixins/ApplicationCommandOptionWithChoicesMixin.js';

/**
 * A slash command integer option.
 */
export class SlashCommandIntegerOption extends Mixin(
	ApplicationCommandOptionBase,
	ApplicationCommandNumericOptionMinMaxValueMixin,
	ApplicationCommandOptionWithAutocompleteMixin,
	ApplicationCommandOptionWithChoicesMixin,
) {
	public constructor() {
		super(ApplicationCommandOptionType.Integer);
	}

	public override addChoices(...choices: RestOrArray<APIApplicationCommandOptionChoice<number>>): this {
		return super.addChoices(...choices);
	}

	public override setChoices(...choices: RestOrArray<APIApplicationCommandOptionChoice<number>>): this {
		return super.setChoices(...choices);
	}
}
