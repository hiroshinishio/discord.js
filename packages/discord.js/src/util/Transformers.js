'use strict';

const { isJSONEncodable } = require('@discordjs/util');
const snakeCase = require('lodash.snakecase');

/**
 * Transforms camel-cased keys into snake cased keys
 * @param {*} obj The object to transform
 * @returns {*}
 */
function toSnakeCase(obj) {
  if (typeof obj !== 'object' || !obj) return obj;
  if (obj instanceof Date) return obj;
  if (isJSONEncodable(obj)) return toSnakeCase(obj.toJSON());
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [snakeCase(key), toSnakeCase(value)]));
}

/**
 * Transforms an API auto moderation action object to a camel-cased variant.
 * @param {APIAutoModerationAction} autoModerationAction The action to transform
 * @returns {AutoModerationAction}
 * @ignore
 */
function _transformAPIAutoModerationAction(autoModerationAction) {
  return {
    type: autoModerationAction.type,
    metadata: {
      durationSeconds: autoModerationAction.metadata.duration_seconds ?? null,
      channelId: autoModerationAction.metadata.channel_id ?? null,
      customMessage: autoModerationAction.metadata.custom_message ?? null,
    },
  };
}

/**
 * Transforms a guild scheduled event recurrence rule object to a snake-cased variant.
 * @param {GuildScheduledEventRecurrenceRuleOptions} recurrenceRule The recurrence rule to transform
 * @returns {APIGuildScheduledEventRecurrenceRule}
 * @ignore
 */
function _transformGuildScheduledEventRecurrenceRule(recurrenceRule) {
  return {
    start: new Date(recurrenceRule.startAt).toISOString(),
    // eslint-disable-next-line eqeqeq
    end: recurrenceRule.endAt != null ? new Date(recurrenceRule.endAt).toISOString() : recurrenceRule.endAt,
    frequency: recurrenceRule.frequency,
    interval: recurrenceRule.interval,
    by_weekday: recurrenceRule.byWeekday,
    by_n_weekday: recurrenceRule.byNWeekday,
    by_month: recurrenceRule.byMonth,
    by_month_day: recurrenceRule.byMonthDay,
    by_year_day: recurrenceRule.byYearDay,
    count: recurrenceRule.count,
  };
}

module.exports = { toSnakeCase, _transformAPIAutoModerationAction, _transformGuildScheduledEventRecurrenceRule };
