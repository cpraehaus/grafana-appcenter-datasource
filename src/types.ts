import { DataQuery, DataSourceJsonData, SelectableValue } from '@grafana/data';

export const TYPES = [
  'Apps',
  'Error groups',
  'Errors',
  'Errors count',
  'Errors per day',
  'Crashes per day',
  'Orgs',
  'Events',
  'Event properties',
  'Event property count',
  'Sessions per day',
];

/**
 * Query model.
 *
 * Contains parameters for the query.
 */
export interface MyQuery extends DataQuery {
  type: SelectableValue;
  limit?: number;
  appName?: string;
  appVersion?: string;
  groupState?: GroupState;
}

export const defaultQuery: Partial<MyQuery> = {
  type: { value: null, label: 'Select a query type' },
  limit: 30,
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  url: string;
  orgName: string;
  appName: string;
  key: string;
  /**
   * Number of requests per second
   */
  rateLimit?: number;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  apiKey?: string;
}

/**
 * Error types supported by AppCenter API (unhandledError meaning crashes).
 */
export type ErrorType = 'all' | 'unhandledError' | 'handledError';

export type GroupState = 'open' | 'closed' | 'ignored';
