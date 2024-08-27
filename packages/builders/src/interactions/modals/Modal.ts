/* eslint-disable jsdoc/check-param-names */

import type { JSONEncodable } from '@discordjs/util';
import type {
	APIActionRowComponent,
	APIModalActionRowComponent,
	APIModalInteractionResponseCallbackData,
} from 'discord-api-types/v10';
import { ActionRowBuilder, type ModalActionRowComponentBuilder } from '../../components/ActionRow.js';
import { createComponentBuilder } from '../../components/Components.js';
import { normalizeArray, type RestOrArray } from '../../util/normalizeArray.js';
import { isValidationEnabled } from '../../util/validation.js';
import { modalPredicate } from './Assertions.js';

export interface ModalBuilderData extends Partial<Omit<APIModalInteractionResponseCallbackData, 'components'>> {
	components?: ActionRowBuilder<ModalActionRowComponentBuilder>[];
}

/**
 * A builder that creates API-compatible JSON data for modals.
 */
export class ModalBuilder implements JSONEncodable<APIModalInteractionResponseCallbackData> {
	/**
	 * The API data associated with this modal.
	 */
	private readonly data: ModalBuilderData;

	/**
	 * The components within this modal.
	 */
	public get components(): ActionRowBuilder<ModalActionRowComponentBuilder>[] {
		return (this.data.components ??= []);
	}

	/**
	 * Creates a new modal from API data.
	 *
	 * @param data - The API data to create this modal with
	 */
	public constructor({ components, ...data }: Partial<APIModalInteractionResponseCallbackData> = {}) {
		this.data = {
			...data,
			components: (components?.map((component) => createComponentBuilder(component)) ??
				[]) as ActionRowBuilder<ModalActionRowComponentBuilder>[],
		};
	}

	/**
	 * Sets the title of this modal.
	 *
	 * @param title - The title to use
	 */
	public setTitle(title: string) {
		this.data.title = title;
		return this;
	}

	/**
	 * Sets the custom id of this modal.
	 *
	 * @param customId - The custom id to use
	 */
	public setCustomId(customId: string) {
		this.data.custom_id = customId;
		return this;
	}

	/**
	 * Adds components to this modal.
	 *
	 * @param components - The components to add
	 */
	public addComponents(
		...components: RestOrArray<
			ActionRowBuilder<ModalActionRowComponentBuilder> | APIActionRowComponent<APIModalActionRowComponent>
		>
	) {
		this.components.push(
			...normalizeArray(components).map((component) =>
				component instanceof ActionRowBuilder
					? component
					: new ActionRowBuilder<ModalActionRowComponentBuilder>(component),
			),
		);
		return this;
	}

	/**
	 * Sets components for this modal.
	 *
	 * @param components - The components to set
	 */
	public setComponents(...components: RestOrArray<ActionRowBuilder<ModalActionRowComponentBuilder>>) {
		this.components.splice(0, this.components.length, ...normalizeArray(components));
		return this;
	}

	/**
	 * Serializes this builder to API-compatible JSON data.
	 *
	 * Note that by disabling validation, there is no guarantee that the resulting object will be valid.
	 *
	 * @param validationOverride - Force validation to run/not run regardless of your global preference
	 */
	public toJSON(validationOverride?: boolean): APIModalInteractionResponseCallbackData {
		const { components, ...rest } = this.data;

		const data = {
			...structuredClone(rest),
			components: components?.map((component) => component.toJSON(validationOverride)),
		};

		if (validationOverride ?? isValidationEnabled()) {
			modalPredicate.parse(data);
		}

		return data as APIModalInteractionResponseCallbackData;
	}
}
