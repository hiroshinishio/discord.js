import {
	ComponentType,
	TextInputStyle,
	type APIModalInteractionResponseCallbackData,
	type APITextInputComponent,
} from 'discord-api-types/v10';
import { describe, test, expect } from 'vitest';
import {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	type ModalActionRowComponentBuilder,
} from '../../src/index.js';

const modal = () => new ModalBuilder();
const textInput = () =>
	new ActionRowBuilder<TextInputBuilder>().addComponents(
		new TextInputBuilder().setCustomId('text').setLabel(':3').setStyle(TextInputStyle.Short),
	);

describe('Modals', () => {
	test('GIVEN valid fields THEN builder does not throw', () => {
		expect(() => modal().setTitle('test').setCustomId('foobar').setComponents(textInput()).toJSON()).not.toThrowError();
		expect(() => modal().setTitle('test').setCustomId('foobar').addComponents(textInput()).toJSON()).not.toThrowError();
	});

	test('GIVEN invalid fields THEN builder does throw', () => {
		expect(() => modal().setTitle('test').setCustomId('foobar').toJSON()).toThrowError();
		// @ts-expect-error: CustomId is invalid
		expect(() => modal().setTitle('test').setCustomId(42).toJSON()).toThrowError();
	});

	test('GIVEN valid input THEN valid JSON outputs are given', () => {
		const modalData: APIModalInteractionResponseCallbackData = {
			title: 'title',
			custom_id: 'custom id',
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.TextInput,
							label: 'label',
							style: TextInputStyle.Paragraph,
							custom_id: 'custom id',
						},
					],
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.TextInput,
							label: 'label',
							style: TextInputStyle.Paragraph,
							custom_id: 'custom id',
						},
					],
				},
			],
		};

		expect(new ModalBuilder(modalData).toJSON()).toEqual(modalData);

		expect(
			modal()
				.setTitle(modalData.title)
				.setCustomId('custom id')
				.setComponents(
					new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
						new TextInputBuilder().setCustomId('custom id').setLabel('label').setStyle(TextInputStyle.Paragraph),
					),
				)
				.addComponents([
					new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
						new TextInputBuilder().setCustomId('custom id').setLabel('label').setStyle(TextInputStyle.Paragraph),
					),
				])
				.toJSON(),
		).toEqual(modalData);
	});

	describe('equals()', () => {
		const textInput1 = new TextInputBuilder()
			.setCustomId('custom id')
			.setLabel('label')
			.setStyle(TextInputStyle.Paragraph);

		const textInput2: APITextInputComponent = {
			type: ComponentType.TextInput,
			custom_id: 'custom id',
			label: 'label',
			style: TextInputStyle.Paragraph,
		};

		test('GIVEN equal builders THEN returns true', () => {
			const equalTextInput = new TextInputBuilder()
				.setCustomId('custom id')
				.setLabel('label')
				.setStyle(TextInputStyle.Paragraph);

			expect(textInput1.equals(equalTextInput)).toBeTruthy();
		});

		test('GIVEN the same builder THEN returns true', () => {
			expect(textInput1.equals(textInput1)).toBeTruthy();
		});

		test('GIVEN equal builder and data THEN returns true', () => {
			expect(textInput1.equals(textInput2)).toBeTruthy();
		});

		test('GIVEN different builders THEN returns false', () => {
			const diffTextInput = new TextInputBuilder()
				.setCustomId('custom id')
				.setLabel('label 2')
				.setStyle(TextInputStyle.Paragraph);

			expect(textInput1.equals(diffTextInput)).toBeFalsy();
		});

		test('GIVEN different text input builder and data THEN returns false', () => {
			const diffTextInputData: APITextInputComponent = {
				type: ComponentType.TextInput,
				custom_id: 'custom id',
				label: 'label 2',
				style: TextInputStyle.Short,
			};

			expect(textInput1.equals(diffTextInputData)).toBeFalsy();
		});
	});
});
