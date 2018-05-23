import React, { Component } from 'react';
import _ from 'lodash';
import { withApollo } from 'react-apollo';

import query from '../query.gql';

export default WrappedComponent =>
  withApollo(
    class FiltersContainer extends Component {
      constructor(props) {
        super(props);

        this.state = {
          loading: true,
          filtersValues: {
            ...props.filtersValues,
          },
          filtersEnabled: {
            brands: [],
            attributes: [],
            options: [],
            ...props.filtersEnabled,
          },
        };

        this._isMounted = false;
        this.applyFilters = this.applyFilters.bind(this);
        this.setFilter = this.setFilter.bind(this);
      }

      async fetchFilters(filterType) {
        const { data } = await this.props.client.query({
          query,
          variables: { categoryId: filterType },
        });

        const optionsValues = _(data.options)
          .map(option => [option.name, []])
          .fromPairs()
          .value();

        this.setState({
          loading: false,
          filterType,
          filtersEnabled: {
            ...optionsValues,
            ...this.state.filtersEnabled,
          },
          filtersValues: {
            brands: data.brands,
            attributes: data.attributes,
            options: data.options,
            ...optionsValues,
          },
        });
      }

      async componentWillMount() {
        this._isMounted = true;

        if (this._isMounted) {
          await this.fetchFilters(this.props.filterType);
        }
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      async setFilter([filterName, filterValue]) {
        // Remove all selected filters if user clicked on "TOUS" filter
        if (!filterValue) {
          this.setState({
            filtersEnabled: {
              ...this.state.filtersEnabled,
              [filterName]: [],
            },
          });
          return;
        }

        // Toggle off filter if it's already selected
        if (this.state.filtersEnabled[filterName].includes(filterValue)) {
          this.setState({
            filtersEnabled: {
              ...this.state.filtersEnabled,
              [filterName]: this.state.filtersEnabled[filterName].filter(
                value => value !== filterValue,
              ),
            },
          });
          // Toggle on filter
        } else {
          this.setState({
            filtersEnabled: {
              ...this.state.filtersEnabled,
              [filterName]: [...this.state.filtersEnabled[filterName], filterValue],
            },
          });
        }
      }

      applyFilters() {
        this.props.applyFilters({
          filtersEnabled: this.state.filtersEnabled,
          filtersValues: this.state.filtersValues,
        });
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            loading={this.state.loading}
            filtersValues={this.state.filtersValues}
            filtersEnabled={this.state.filtersEnabled}
            applyFilters={this.applyFilters}
            setFilter={this.setFilter}
          />
        );
      }
    },
  );
