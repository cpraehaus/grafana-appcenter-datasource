import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms, Select, InlineFormLabel } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, GroupState, MyDataSourceOptions, MyQuery, TYPES } from './types';

const queryTypes = [...TYPES];
const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, limit: parseFloat(event.target.value) });
    // executes the query
    onRunQuery();
  };

  onTypeChange = (item: SelectableValue) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, type: item });
    if (item.value === 'exchange') {
      onRunQuery();
    }
  };

  onAppNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, appName: event.target.value });
    // executes the query
    onRunQuery();
  };

  onAppVersionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, appVersion: event.target.value });
    // executes the query
    onRunQuery();
  };

  onGroupStateChange = (item: SelectableValue<GroupState>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, groupState: item.value as GroupState });
    // executes the query
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { type, limit, appName, appVersion, groupState } = query;
    const dataTypes = queryTypes.map((type) => ({
      label: type,
      value: type,
    }));
    const groupStates: Array<SelectableValue<GroupState>> = [
      { label: 'All', value: undefined },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
      { label: 'Ignored', value: 'ignored' },
    ];
    return (
      <div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel width={10} tooltip="Type of query you want to execute">
              Query type
            </InlineFormLabel>
            <Select
              data-testid="Query type"
              onChange={this.onTypeChange}
              options={dataTypes}
              value={type}
              defaultValue={type}
              width={40}
            />
          </div>
        </div>

        {['Error groups', 'Errors'].includes(type.value) && (
          <div className="gf-form-inline">
            <div className="gf-form">
              <FormField
                labelWidth={10}
                inputWidth={15}
                value={limit}
                onChange={this.onLimitChange}
                label="Limit"
                type="number"
                tooltip="Maximum number of results"
              />
            </div>
          </div>
        )}

        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              labelWidth={10}
              inputWidth={15}
              value={appName}
              onChange={this.onAppNameChange}
              label="App name"
              tooltip="Optional name of app to filter for"
            />
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              labelWidth={10}
              inputWidth={15}
              value={appVersion}
              onChange={this.onAppVersionChange}
              label="App version"
              tooltip="Optional version of app to filter for"
            />
          </div>
        </div>

        {['Error groups', 'Errors', 'Errors count'].includes(type.value) && (
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel width={10} tooltip="Group state to filter for when querying error groups">
                Group state
              </InlineFormLabel>
              <Select
                data-testid="Group state"
                onChange={this.onGroupStateChange}
                options={groupStates}
                value={groupState}
                defaultValue={groupState}
                width={15}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
