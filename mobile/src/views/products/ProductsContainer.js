import { graphql } from 'react-apollo';

import query from './query.gql';
import subscription from './subscription.gql';

import Products from './Products';

const PRODUCTS_PER_PAGE = 10;

function buildFilters(filtersEnabled, filtersValues, filterType) {
  const enabledOptionsValues = filtersValues.options.map(option => {
    return filtersEnabled[option.name];
  });

  const optionsValuesIds = [].concat.apply([], enabledOptionsValues);

  return {
    brandsIds: filtersEnabled.brands,
    attributesIds: filtersEnabled.attributes,
    optionsValuesIds,
    categoryId: filterType,
  };
}

export default graphql(query, {
  options: props => ({
    variables: {
      ...buildFilters(props.filtersEnabled, props.filtersValues, props.filterType),
      skip: 0,
      first: PRODUCTS_PER_PAGE,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data }) => ({
    data,
    hasMore: () => data.products.aggregate.count > data.products.edges.length,
    refetchProducts: ({ filtersEnabled, filtersValues, filterType }) =>
      data.refetch({
        ...buildFilters(filtersEnabled, filtersValues, filterType),
        skip: 0,
        first: PRODUCTS_PER_PAGE,
      }),
    loadMoreProducts: () =>
      data.fetchMore({
        variables: {
          brandsIds: data.variables.brandsIds,
          attributesIds: data.variables.attributesIds,
          optionsValuesIds: data.variables.optionsValuesIds,
          categoryId: data.variables.categoryId,
          skip: data.products.edges.length,
        },
        updateQuery: (prevState, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prevState;
          }

          return {
            products: {
              ...prevState.products,
              edges: [...prevState.products.edges, ...fetchMoreResult.products.edges],
            },
          };
        },
      }),
    subscribeToProductUpdates: () =>
      data.subscribeToMore({
        document: subscription,
        updateQuery: (prevState, { subscriptionData }) => {
          if (!subscriptionData.data || !subscriptionData.data.node) {
            return prevState;
          }

          const newProducts = {
            ...prevState.products,
            edges: prevState.products.edges.map(edge => {
              if (edge.node.id !== subscriptionData.data.updatedProduct.node.id) {
                return edge;
              }

              return {
                ...edge,
                node: {
                  ...edge.node,
                  available: subscriptionData.data.updatedProduct.node.available,
                  unavailableOptionsValues:
                    subscriptionData.data.updatedProduct.node.unavailableOptionsValues,
                },
              };
            }),
          };

          return {
            ...prevState,
            products: newProducts,
          };
        },
      }),
  }),
})(Products);
