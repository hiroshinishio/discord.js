import type { APIApplicationCommand, LocaleString } from 'discord-api-types/v10';

export interface SharedNameAndDescriptionData
	extends Partial<
		Pick<APIApplicationCommand, 'description_localizations' | 'description' | 'name_localizations' | 'name'>
	> {}

/**
 * This mixin holds name and description symbols for slash commands.
 */
export class SharedNameAndDescription {
	protected readonly data: SharedNameAndDescriptionData = {};

	/**
	 * Sets the name of this command.
	 *
	 * @param name - The name to use
	 */
	public setName(name: string): this {
		this.data.name = name;
		return this;
	}

	/**
	 * Sets the description of this command.
	 *
	 * @param description - The description to use
	 */
	public setDescription(description: string) {
		this.data.description = description;
		return this;
	}

	/**
	 * Sets a name localization for this command.
	 *
	 * @param locale - The locale to set
	 * @param localizedName - The localized name for the given `locale`
	 */
	public setNameLocalization(locale: LocaleString, localizedName: string) {
		this.data.name_localizations ??= {};
		this.data.name_localizations[locale] = localizedName;

		return this;
	}

	/**
	 * Clears a name localization for this command.
	 *
	 * @param locale - The locale to clear
	 */
	public clearNameLocalization(locale: LocaleString) {
		this.data.name_localizations ??= {};
		this.data.name_localizations[locale] = undefined;

		return this;
	}

	/**
	 * Sets the name localizations for this command.
	 *
	 * @param localizedNames - The object of localized names to set
	 */
	public setNameLocalizations(localizedNames: Partial<Record<LocaleString, string>>) {
		this.data.name_localizations = {};

		for (const args of Object.entries(localizedNames)) {
			this.setNameLocalization(...(args as [LocaleString, string]));
		}

		return this;
	}

	public clearNameLocalizations() {
		this.data.name_localizations = undefined;
		return this;
	}

	/**
	 * Sets a description localization for this command.
	 *
	 * @param locale - The locale to set
	 * @param localizedDescription - The localized description for the given `locale`
	 */
	public setDescriptionLocalization(locale: LocaleString, localizedDescription: string) {
		this.data.description_localizations ??= {};
		this.data.description_localizations[locale] = localizedDescription;

		return this;
	}

	/**
	 * Clears a description localization for this command.
	 *
	 * @param locale - The locale to clear
	 */
	public clearDescriptionLocalization(locale: LocaleString) {
		this.data.description_localizations ??= {};
		this.data.description_localizations[locale] = undefined;

		return this;
	}

	/**
	 * Sets the description localizations for this command.
	 *
	 * @param localizedDescriptions - The object of localized descriptions to set
	 */
	public setDescriptionLocalizations(localizedDescriptions: Partial<Record<LocaleString, string>>) {
		this.data.description_localizations = {};

		for (const args of Object.entries(localizedDescriptions)) {
			this.setDescriptionLocalization(...(args as [LocaleString, string]));
		}

		return this;
	}

	public clearDescriptionLocalizations() {
		this.data.description_localizations = undefined;
		return this;
	}
}
