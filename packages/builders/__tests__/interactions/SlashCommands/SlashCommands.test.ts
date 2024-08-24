import {
	ApplicationCommandType,
	ApplicationIntegrationType,
	ChannelType,
	InteractionContextType,
	PermissionFlagsBits,
} from 'discord-api-types/v10';
import { describe, test, expect } from 'vitest';
import {
	SlashCommandAssertions,
	SlashCommandBooleanOption,
	SlashCommandBuilder,
	SlashCommandChannelOption,
	SlashCommandIntegerOption,
	SlashCommandMentionableOption,
	SlashCommandNumberOption,
	SlashCommandRoleOption,
	SlashCommandAttachmentOption,
	SlashCommandStringOption,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandUserOption,
} from '../../../src/index.js';

const getBuilder = () => new SlashCommandBuilder();
const getNamedBuilder = () => getBuilder().setName('example').setDescription('Example command');
const getStringOption = () => new SlashCommandStringOption().setName('owo').setDescription('Testing 123');
const getIntegerOption = () => new SlashCommandIntegerOption().setName('owo').setDescription('Testing 123');
const getNumberOption = () => new SlashCommandNumberOption().setName('owo').setDescription('Testing 123');
const getBooleanOption = () => new SlashCommandBooleanOption().setName('owo').setDescription('Testing 123');
const getUserOption = () => new SlashCommandUserOption().setName('owo').setDescription('Testing 123');
const getChannelOption = () => new SlashCommandChannelOption().setName('owo').setDescription('Testing 123');
const getRoleOption = () => new SlashCommandRoleOption().setName('owo').setDescription('Testing 123');
const getAttachmentOption = () => new SlashCommandAttachmentOption().setName('owo').setDescription('Testing 123');
const getMentionableOption = () => new SlashCommandMentionableOption().setName('owo').setDescription('Testing 123');
const getSubcommandGroup = () => new SlashCommandSubcommandGroupBuilder().setName('owo').setDescription('Testing 123');
const getSubcommand = () => new SlashCommandSubcommandBuilder().setName('owo').setDescription('Testing 123');

class Collection {
	public readonly [Symbol.toStringTag] = 'Map';
}

describe('Slash Commands', () => {
	describe('Assertions tests', () => {
		test('GIVEN valid name THEN does not throw error', () => {
			expect(() => SlashCommandAssertions.namePredicate.parse('ping')).not.toThrowError();
			expect(() => SlashCommandAssertions.namePredicate.parse('hello-world_command')).not.toThrowError();
			expect(() => SlashCommandAssertions.namePredicate.parse('aˇ㐆1٢〣²अก')).not.toThrowError();
		});

		test('GIVEN invalid name THEN throw error', () => {
			expect(() => SlashCommandAssertions.namePredicate.parse(null)).toThrowError();

			// Too short of a name
			expect(() => SlashCommandAssertions.namePredicate.parse('')).toThrowError();

			// Invalid characters used
			expect(() => SlashCommandAssertions.namePredicate.parse('ABC')).toThrowError();
			expect(() => SlashCommandAssertions.namePredicate.parse('ABC123$%^&')).toThrowError();
			expect(() => SlashCommandAssertions.namePredicate.parse('help ping')).toThrowError();
			expect(() => SlashCommandAssertions.namePredicate.parse('🦦')).toThrowError();

			// Too long of a name
			expect(() =>
				SlashCommandAssertions.numberOptionPredicate.parse('qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm'),
			).toThrowError();
		});

		test('GIVEN valid description THEN does not throw error', () => {
			expect(() =>
				SlashCommandAssertions.descriptionPredicate.parse('This is an OwO moment fur sure!~'),
			).not.toThrowError();
		});

		test('GIVEN invalid description THEN throw error', () => {
			expect(() => SlashCommandAssertions.descriptionPredicate.parse(null)).toThrowError();

			// Too short of a description
			expect(() => SlashCommandAssertions.descriptionPredicate.parse('')).toThrowError();

			// Too long of a description
			expect(() =>
				SlashCommandAssertions.descriptionPredicate.parse(
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam autem libero expedita vitae accusamus nostrum ipsam tempore repudiandae deserunt ipsum facilis, velit fugiat facere accusantium, explicabo corporis aliquam non quos.',
				),
			).toThrowError();
		});
	});

	describe('SlashCommandBuilder', () => {
		describe('Builder with no options', () => {
			test('GIVEN empty builder THEN throw error when calling toJSON', () => {
				expect(() => getBuilder().toJSON()).toThrowError();
			});

			test('GIVEN valid builder THEN does not throw error', () => {
				expect(() => getBuilder().setName('example').setDescription('Example command').toJSON()).not.toThrowError();
			});
		});

		describe('Builder with simple options', () => {
			test('GIVEN valid builder THEN returns type included', () => {
				expect(getNamedBuilder().toJSON()).includes({ type: ApplicationCommandType.ChatInput });
			});

			test('GIVEN valid builder with options THEN does not throw error', () => {
				expect(() =>
					getBuilder()
						.setName('example')
						.setDescription('Example command')
						.addBooleanOption((boolean) =>
							boolean.setName('iscool').setDescription('Are we cool or what?').setRequired(true),
						)
						.addChannelOption((channel) => channel.setName('iscool').setDescription('Are we cool or what?'))
						.addMentionableOption((mentionable) => mentionable.setName('iscool').setDescription('Are we cool or what?'))
						.addRoleOption((role) => role.setName('iscool').setDescription('Are we cool or what?'))
						.addUserOption((user) => user.setName('iscool').setDescription('Are we cool or what?'))
						.addIntegerOption((integer) =>
							integer
								.setName('iscool')
								.setDescription('Are we cool or what?')
								.addChoices({ name: 'Very cool', value: 1_000 })
								.addChoices([{ name: 'Even cooler', value: 2_000 }]),
						)
						.addNumberOption((number) =>
							number
								.setName('iscool')
								.setDescription('Are we cool or what?')
								.addChoices({ name: 'Very cool', value: 1.5 })
								.addChoices([{ name: 'Even cooler', value: 2.5 }]),
						)
						.addStringOption((string) =>
							string
								.setName('iscool')
								.setDescription('Are we cool or what?')
								.addChoices({ name: 'Fancy Pants', value: 'fp_1' }, { name: 'Fancy Shoes', value: 'fs_1' })
								.addChoices([{ name: 'The Whole shebang', value: 'all' }]),
						)
						.addIntegerOption((integer) =>
							integer.setName('iscool').setDescription('Are we cool or what?').setAutocomplete(true),
						)
						.addNumberOption((number) =>
							number.setName('iscool').setDescription('Are we cool or what?').setAutocomplete(true),
						)
						.addStringOption((string) =>
							string.setName('iscool').setDescription('Are we cool or what?').setAutocomplete(true),
						)
						.toJSON(),
				).not.toThrowError();
			});

			test('GIVEN a builder with invalid autocomplete THEN does throw an error', () => {
				expect(() =>
					// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
					getNamedBuilder().addStringOption(getStringOption().setAutocomplete('not a boolean')).toJSON(),
				).toThrowError();
			});

			test('GIVEN a builder with both choices and autocomplete THEN does throw an error', () => {
				expect(() =>
					getNamedBuilder()
						.addStringOption(getStringOption().setAutocomplete(true).addChoices({ name: 'Fancy Pants', value: 'fp_1' }))
						.toJSON(),
				).toThrowError();

				expect(() =>
					getNamedBuilder()
						.addStringOption(
							getStringOption()
								.setAutocomplete(true)
								.addChoices(
									{ name: 'Fancy Pants', value: 'fp_1' },
									{ name: 'Fancy Shoes', value: 'fs_1' },
									{ name: 'The Whole shebang', value: 'all' },
								),
						)
						.toJSON(),
				).toThrowError();

				expect(() =>
					getNamedBuilder()
						.addStringOption(getStringOption().addChoices({ name: 'Fancy Pants', value: 'fp_1' }).setAutocomplete(true))
						.toJSON(),
				).toThrowError();
			});

			test('GIVEN a builder with valid channel options and channel_types THEN does not throw an error', () => {
				expect(() =>
					getNamedBuilder()
						.addChannelOption(
							getChannelOption().addChannelTypes(ChannelType.GuildText).addChannelTypes([ChannelType.GuildVoice]),
						)
						.toJSON(),
				).not.toThrowError();

				expect(() => {
					getNamedBuilder()
						.addChannelOption(getChannelOption().addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildText))
						.toJSON();
				}).not.toThrowError();
			});

			test('GIVEN a builder with valid channel options and channel_types THEN does throw an error', () => {
				expect(() =>
					// @ts-expect-error: Invalid channel type
					getNamedBuilder().addChannelOption(getChannelOption().addChannelTypes(100)).toJSON(),
				).toThrowError();

				expect(() =>
					// @ts-expect-error: Invalid channel types
					getNamedBuilder().addChannelOption(getChannelOption().addChannelTypes(100, 200)).toJSON(),
				).toThrowError();
			});

			test('GIVEN a builder with invalid number min/max options THEN does throw an error', () => {
				// @ts-expect-error: Invalid max value
				expect(() => getNamedBuilder().addNumberOption(getNumberOption().setMaxValue('test')).toJSON()).toThrowError();

				expect(() =>
					// @ts-expect-error: Invalid max value
					getNamedBuilder().addIntegerOption(getIntegerOption().setMaxValue('test')).toJSON(),
				).toThrowError();

				// @ts-expect-error: Invalid min value
				expect(() => getNamedBuilder().addNumberOption(getNumberOption().setMinValue('test')).toJSON()).toThrowError();

				expect(() =>
					// @ts-expect-error: Invalid min value
					getNamedBuilder().addIntegerOption(getIntegerOption().setMinValue('test')).toJSON(),
				).toThrowError();

				expect(() => getNamedBuilder().addIntegerOption(getIntegerOption().setMinValue(1.5)).toJSON()).toThrowError();
			});

			test('GIVEN a builder with valid number min/max options THEN does not throw an error', () => {
				expect(() => getNamedBuilder().addIntegerOption(getIntegerOption().setMinValue(1)).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addNumberOption(getNumberOption().setMinValue(1.5)).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addIntegerOption(getIntegerOption().setMaxValue(1)).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addNumberOption(getNumberOption().setMaxValue(1.5)).toJSON()).not.toThrowError();
			});

			test('GIVEN an already built builder THEN does not throw an error', () => {
				expect(() => getNamedBuilder().addStringOption(getStringOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addIntegerOption(getIntegerOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addNumberOption(getNumberOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addBooleanOption(getBooleanOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addUserOption(getUserOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addChannelOption(getChannelOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addRoleOption(getRoleOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addAttachmentOption(getAttachmentOption()).toJSON()).not.toThrowError();

				expect(() => getNamedBuilder().addMentionableOption(getMentionableOption()).toJSON()).not.toThrowError();
			});

			test('GIVEN no valid return for an addOption method THEN throw error', () => {
				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getNamedBuilder().addBooleanOption().toJSON()).toThrowError();
			});

			test('GIVEN invalid name THEN throw error', () => {
				expect(() => getBuilder().setName('TEST_COMMAND').setDescription(':3').toJSON()).toThrowError();
				expect(() => getBuilder().setName('ĂĂĂĂĂĂ').setDescription(':3').toJSON()).toThrowError();
			});

			test('GIVEN valid names THEN does not throw error', () => {
				expect(() => getBuilder().setName('hi_there').setDescription(':3')).not.toThrowError();
				expect(() => getBuilder().setName('o_comandă').setDescription(':3')).not.toThrowError();
				expect(() => getBuilder().setName('どうも').setDescription(':3')).not.toThrowError();
			});

			test('GIVEN invalid returns for builder THEN throw error', () => {
				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getNamedBuilder().addBooleanOption(true).toJSON()).toThrowError();

				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getNamedBuilder().addBooleanOption(null).toJSON()).toThrowError();

				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getNamedBuilder().addBooleanOption(undefined).toJSON()).toThrowError();

				expect(() =>
					getNamedBuilder()
						// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
						.addBooleanOption(() => SlashCommandStringOption)
						.toJSON(),
				).toThrowError();
				expect(() =>
					getNamedBuilder()
						// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
						.addBooleanOption(() => new Collection())
						.toJSON(),
				).toThrowError();
			});

			test('GIVEN an option that is autocompletable and has choices, THEN passing nothing to setChoices should not throw an error', () => {
				expect(() =>
					getNamedBuilder().addStringOption(getStringOption().setAutocomplete(true).setChoices()).toJSON(),
				).not.toThrowError();
			});

			test('GIVEN an option that is autocompletable, THEN setting choices should throw an error', () => {
				expect(() =>
					getNamedBuilder()
						.addStringOption(getStringOption().setAutocomplete(true).setChoices({ name: 'owo', value: 'uwu' }))
						.toJSON(),
				).toThrowError();
			});

			test('GIVEN an option, THEN setting choices should not throw an error', () => {
				expect(() =>
					getNamedBuilder()
						.addStringOption(getStringOption().setChoices({ name: 'owo', value: 'uwu' }))
						.toJSON(),
				).not.toThrowError();
			});

			test('GIVEN valid builder with NSFW, THEN does not throw error', () => {
				expect(() => getNamedBuilder().setName('foo').setDescription('foo').setNSFW(true).toJSON()).not.toThrowError();
			});
		});

		describe('Builder with subcommand (group) options', () => {
			test('GIVEN builder with subcommand group THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder()
						.addSubcommandGroup((group) =>
							group.setName('group').setDescription('Group us together!').addSubcommand(getSubcommand()),
						)
						.toJSON(),
				).not.toThrowError();
			});

			test('GIVEN builder with subcommand THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder()
						.addSubcommand((subcommand) => subcommand.setName('boop').setDescription('Boops a fellow nerd (you)'))
						.toJSON(),
				).not.toThrowError();
			});

			test('GIVEN builder with subcommand THEN has regular slash command fields', () => {
				expect(() =>
					getBuilder()
						.setName('name')
						.setDescription('description')
						.addSubcommand((option) => option.setName('ye').setDescription('ye'))
						.addSubcommand((option) => option.setName('no').setDescription('no'))
						.setDefaultMemberPermissions(1n)
						.toJSON(),
				).not.toThrowError();
			});

			test('GIVEN builder with already built subcommand group THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder().addSubcommandGroup(getSubcommandGroup().addSubcommand(getSubcommand())).toJSON(),
				).not.toThrowError();
			});

			test('GIVEN builder with already built subcommand THEN does not throw error', () => {
				expect(() => getNamedBuilder().addSubcommand(getSubcommand()).toJSON()).not.toThrowError();
			});

			test('GIVEN builder with already built subcommand with options THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder().addSubcommand(getSubcommand().addBooleanOption(getBooleanOption())).toJSON(),
				).not.toThrowError();
			});

			test('GIVEN builder with a subcommand that tries to add an invalid result THEN throw error', () => {
				expect(() =>
					// @ts-expect-error: Checking if check works JS-side too
					getNamedBuilder().addSubcommand(getSubcommand()).addIntegerOption(getInteger()).toJSON(),
				).toThrowError();
			});

			test('GIVEN no valid return for an addSubcommand(Group) method THEN throw error', () => {
				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getNamedBuilder().addSubcommandGroup().toJSON()).toThrowError();

				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getNamedBuilder().addSubcommand().toJSON()).toThrowError();

				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getNamedBuilder().addSubcommand(getSubcommandGroup()).toJSON()).toThrowError();
			});
		});

		describe('Subcommand group builder', () => {
			test('GIVEN no valid subcommand THEN throw error', () => {
				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getSubcommandGroup().addSubcommand().toJSON()).toThrowError();

				// @ts-expect-error: Checking if not providing anything, or an invalid return type causes an error
				expect(() => getSubcommandGroup().addSubcommand(getSubcommandGroup()).toJSON()).toThrowError();
			});

			test('GIVEN a valid subcommand THEN does not throw an error', () => {
				expect(() =>
					getSubcommandGroup()
						.addSubcommand((sub) => sub.setName('sub').setDescription('Testing 123'))
						.toJSON(),
				).not.toThrowError();
			});
		});

		describe('Subcommand builder', () => {
			test('GIVEN a valid subcommand with options THEN does not throw error', () => {
				expect(() => getSubcommand().addBooleanOption(getBooleanOption()).toJSON()).not.toThrowError();
			});
		});

		describe('Slash command localizations', () => {
			const expectedSingleLocale = { 'en-US': 'foobar' };
			const expectedMultipleLocales = {
				...expectedSingleLocale,
				bg: 'test',
			};

			test('GIVEN valid name localizations THEN does not throw error', () => {
				expect(() => getBuilder().setNameLocalization('en-US', 'foobar')).not.toThrowError();
				expect(() => getBuilder().setNameLocalizations({ 'en-US': 'foobar' })).not.toThrowError();
			});

			test('GIVEN invalid name localizations THEN does throw error', () => {
				// @ts-expect-error: Invalid localization
				expect(() => getNamedBuilder().setNameLocalization('en-U', 'foobar').toJSON()).toThrowError();
				// @ts-expect-error: Invalid localization
				expect(() => getNamedBuilder().setNameLocalizations({ 'en-U': 'foobar' }).toJSON()).toThrowError();
			});

			test('GIVEN valid name localizations THEN valid data is stored', () => {
				expect(getNamedBuilder().setNameLocalization('en-US', 'foobar').toJSON().name_localizations).toEqual(
					expectedSingleLocale,
				);
				expect(
					getNamedBuilder().setNameLocalizations({ 'en-US': 'foobar', bg: 'test' }).toJSON().name_localizations,
				).toEqual(expectedMultipleLocales);
				expect(getNamedBuilder().clearNameLocalizations().toJSON().name_localizations).toBeUndefined();
				expect(getNamedBuilder().clearNameLocalization('en-US').toJSON().name_localizations).toEqual({
					'en-US': undefined,
				});
			});

			test('GIVEN valid description localizations THEN does not throw error', () => {
				expect(() => getNamedBuilder().setDescriptionLocalization('en-US', 'foobar').toJSON()).not.toThrowError();
				expect(() => getNamedBuilder().setDescriptionLocalizations({ 'en-US': 'foobar' }).toJSON()).not.toThrowError();
			});

			test('GIVEN invalid description localizations THEN does throw error', () => {
				// @ts-expect-error: Invalid localization description
				expect(() => getNamedBuilder().setDescriptionLocalization('en-U', 'foobar').toJSON()).toThrowError();
				// @ts-expect-error: Invalid localization description
				expect(() => getNamedBuilder().setDescriptionLocalizations({ 'en-U': 'foobar' }).toJSON()).toThrowError();
			});

			test('GIVEN valid description localizations THEN valid data is stored', () => {
				expect(
					getNamedBuilder().setDescriptionLocalization('en-US', 'foobar').toJSON(false).description_localizations,
				).toEqual(expectedSingleLocale);
				expect(
					getNamedBuilder().setDescriptionLocalizations({ 'en-US': 'foobar', bg: 'test' }).toJSON(false)
						.description_localizations,
				).toEqual(expectedMultipleLocales);
				expect(
					getNamedBuilder().clearDescriptionLocalizations().toJSON(false).description_localizations,
				).toBeUndefined();
				expect(getNamedBuilder().clearDescriptionLocalization('en-US').toJSON(false).description_localizations).toEqual(
					{
						'en-US': undefined,
					},
				);
			});
		});

		describe('permissions', () => {
			test('GIVEN valid permission string THEN does not throw error', () => {
				expect(() => getNamedBuilder().setDefaultMemberPermissions('1')).not.toThrowError();
			});

			test('GIVEN valid permission bitfield THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder().setDefaultMemberPermissions(
						PermissionFlagsBits.AddReactions | PermissionFlagsBits.AttachFiles,
					),
				).not.toThrowError();
			});

			test('GIVEN null permissions THEN does not throw error', () => {
				expect(() => getNamedBuilder().clearDefaultMemberPermissions()).not.toThrowError();
			});

			test('GIVEN invalid inputs THEN does throw error', () => {
				expect(() => getNamedBuilder().setDefaultMemberPermissions('1.1').toJSON()).toThrowError();
				expect(() => getNamedBuilder().setDefaultMemberPermissions(1.1).toJSON()).toThrowError();
			});

			test('GIVEN valid permission with options THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder().addBooleanOption(getBooleanOption()).setDefaultMemberPermissions('1').toJSON(),
				).not.toThrowError();

				expect(() => getNamedBuilder().addChannelOption(getChannelOption())).not.toThrowError();
			});
		});

		describe('contexts', () => {
			test('GIVEN a builder with valid contexts THEN does not throw an error', () => {
				expect(() =>
					getNamedBuilder().setContexts([InteractionContextType.Guild, InteractionContextType.BotDM]).toJSON(),
				).not.toThrowError();

				expect(() =>
					getNamedBuilder().setContexts(InteractionContextType.Guild, InteractionContextType.BotDM).toJSON(),
				).not.toThrowError();
			});

			test('GIVEN a builder with invalid contexts THEN does throw an error', () => {
				// @ts-expect-error: Invalid contexts
				expect(() => getNamedBuilder().setContexts(999).toJSON()).toThrowError();

				// @ts-expect-error: Invalid contexts
				expect(() => getNamedBuilder().setContexts([999, 998]).toJSON()).toThrowError();
			});
		});

		describe('integration types', () => {
			test('GIVEN a builder with valid integraton types THEN does not throw an error', () => {
				expect(() =>
					getNamedBuilder()
						.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
						.toJSON(),
				).not.toThrowError();

				expect(() =>
					getNamedBuilder()
						.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
						.toJSON(),
				).not.toThrowError();
			});

			test('GIVEN a builder with invalid integration types THEN does throw an error', () => {
				// @ts-expect-error: Invalid integration types
				expect(() => getNamedBuilder().setIntegrationTypes(999).toJSON()).toThrowError();

				// @ts-expect-error: Invalid integration types
				expect(() => getNamedBuilder().setIntegrationTypes([999, 998]).toJSON()).toThrowError();
			});
		});
	});
});
