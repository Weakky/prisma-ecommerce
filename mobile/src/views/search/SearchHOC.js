import React, { PureComponent } from 'react';
import query from './query.gql';
import { withApollo } from 'react-apollo';

export const EnhancedSearch = WrappedComponent =>
  withApollo(
    class SearchContainer extends PureComponent {
      constructor(props) {
        super(props);

        this.state = {
          products: [],
          queryText: '',
        };

        this.performSearch = this.performSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
      }

      resetSearch() {
        this.setState({
          products: [],
          queryText: '',
        });
      }

      async performSearch(queryText) {
        if (!queryText) {
          return this.resetSearch();
        }

        this.setState({ queryText }, async () => {
          const { data } = await this.props.client.query({
            query,
            variables: { query: queryText },
          });

          this.setState({ products: data.searchProducts.edges });
        });
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            queryText={this.state.queryText}
            performSearch={this.performSearch}
            resetSearch={this.resetSearch}
            products={this.state.products}
          />
        );
      }
    },
  );
