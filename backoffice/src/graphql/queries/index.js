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
  query allProducts($nullValue: DateTime) {
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
      variants(where: { deletedAt: $nullValue }) {
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
	query allCustomers {
		allCustomers {
			id
			firstName
      lastName
      email
		}
	}
`;

export const ListAllOrdersQuery = gql`
  query allOrders {
    allOrders {
      id
      orderStatus
      owner {
        firstName
        lastName
      }
      createdAt
      lineItems {
        id
        quantity
        variant {
          id
          price
          product {
            id
            imageUrl
            name
          }
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

export const ListAllBestSalesProducts = gql`
  query allBestSalesProducts {
    me {
      id
      selectedShop {
        id
        bestSellerProducts(orderBy: position_ASC) {
          id
          position
          product {
            id
            name
            imageUrl
          }
        }
      }
    }
    allProducts {
      id
      name
      imageUrl
    }
  }
`;

export const ListAllNewProductsQuery = gql`
  query allNewProducts {
    me {
      id
      selectedShop {
        id
        newProducts(orderBy: position_ASC) {
          id
          position
          product {
            id
            name
            imageUrl
          }
        }
      }
    }
    allProducts {
      id
      name
      imageUrl
    }
  }
`;

export const MotdQuery = gql`
  query shopMOTD {
    me {
      id
      selectedShop {
        id
        MOTD
      }
    }
  }
`;
