import { gql } from "react-apollo";

export const ListAllOptionsQuery = gql`
	query allOptions {
		allOptions {
			id
			name
      category {
        id
        name
      }
      values {
        id
        name
      }
		}
	}
`;

export const ListAllProductsQuery = gql`
  query allProducts {
    allProducts {
      id
      name
      displayPrice
      imageUrl
      brand {
        id
        name
      }
      category {
        id
        name
      }
      options {
        id
        name
        values {
          id
          name
        }
      }
      variants {
        id
        price
        available
        selectedOptions {
          id
          option {
            id
            name
          }
          value {
            id
            name
          }
        }
      }
      displayPrice
      attributes {
        id
        value
        category {
          id
        }
      }
    }
  }
`;



export const ListAllUsersQuery = gql`
	query allUsers {
		allUsers {
			id
			createdAt
		}
	}
`;

export const ListAllOrdersQuery = gql`
  query allOrders {
    allOrders {
      id
      state
      owner {
        firstName
        lastName
      }
      createdAt
      items {
        taxon {
          product {
            name
            imageUrl
          }
          taxon {
            name
          }
        }
        quantity
      }
    }
  }
`;

export const AllDetailsQuery = gql`
  query allDetailsQuery {
    allOptions {
      id
      name
      category {
        id
      }
      values {
        id
        name
      }
    }
    allBrands {
      id
      name
      category {
        id
      }
    }
    allCategories {
      id
      name
    }
    allAttributes {
      id
      value
      category {
        id
      }
    }
  }
`;

export const ListAllCategoriesQuery = gql`
  query ListAllCategories {
    allCategories {
      id
      name
    }
  }
`;


export const ListAllBrands = gql`
  query allBrands {
    allBrands {
      id
      name
      category {
        id
        name
      }
    }
}
`;

export const ListAllAttributes = gql`
  query allAttributes {
    allAttributes {
      id
      value
      category {
        id
        name
      }
    }
  }
`;
