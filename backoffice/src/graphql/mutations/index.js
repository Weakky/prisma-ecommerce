import {gql} from "react-apollo";
import { ListAllProductsQuery } from "../queries";

export const UpsertCategoryQuery = gql`
  mutation upsertCategory($name: String!, $categoryId: ID) {
    upsertCategory(name: $name, categoryId: $categoryId) {
      id
      name
    }
  }
`;

export const CreateCategoryQueryOptions = {
  props: ({ mutate }) => ({
    upsertCategory: ({ name, categoryId }) =>
      mutate({
        variables: { name, categoryId }
      })
  })
};

export const UpsertOptionQuery = gql`
  mutation upsertOption($optionId: ID, $categoryId: ID!, $name: String!, $values: [OptionValueInput!]!) {
    upsertOption(optionId: $optionId, categoryId: $categoryId, name: $name, values: $values) {
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

export const UpsertOptionQueryOptions = {
  props: ({mutate}) => ({
    upsertOption: ({ optionId, name, categoryId, values }) =>
      mutate({
        variables: { name, categoryId, optionId, values },
        refetchQueries: [{ query: ListAllProductsQuery }]
      }),
  })
};

export const UpsertBrandQuery = gql`
  mutation upsertBrand($name: String!, $categoryId: ID!, $brandId: ID) {
    upsertBrand(name: $name, categoryId: $categoryId, brandId: $brandId) {
      id
      name
      category {
        id
        name
      }
    }
  }
`;

export const UpsertBrandQueryOptions = {
  props: ({ mutate }) => ({
    upsertBrand: ({ name, brandId, categoryId }) =>
      mutate({
        variables: { name, brandId, categoryId }
      })
  })
};

export const UpsertAttributeQuery = gql`
  mutation upsertAttribute($value: String!, $categoryId: ID!, $attributeId: ID) {
    upsertAttribute(value: $value, categoryId: $categoryId, attributeId: $attributeId) {
      id
      value
      category {
        id
        name
      }
    }
  }
`;

export const UpsertAttributeQueryOptions = {
  props: ({ mutate }) => ({
    upsertAttribute: ({ value, attributeId, categoryId }) =>
      mutate({
        variables: { value, attributeId, categoryId }
      })
  })
};

export const DeleteOptionMutation = gql`
  mutation deleteOption($optionId: ID!) {
    deleteOption(optionId: $optionId) {
      id
    }
  }
`;

export const DeleteOptionMutationOptions = {
  props: ({ mutate }) => ({
    deleteOption: ({ optionId }) => (
      mutate({ variables: { optionId } })
    )
  })
};

export const DeleteCategoryMutation = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(categoryId: $categoryId) {
      id
    }
  }
`;

export const DeleteCategoryMutationOptions = {
  props: ({ mutate }) => ({
    deleteCategory: ({ categoryId }) => (
      mutate({ variables: { categoryId } })
    )
  })
};

export const DeleteBrandMutation = gql`
  mutation deleteBrand($brandId: ID!) {
    deleteBrand(brandId: $brandId) {
      id
    }
  }
`;

export const DeleteBrandMutationOptions = {
  props: ({ mutate }) => ({
    deleteBrand: ({ brandId }) => (
      mutate({ variables: { brandId } })
    )
  })
};

export const DeleteAttributeMutation = gql`
  mutation deleteAttribute($attributeId: ID!) {
    deleteAttribute(attributeId: $attributeId) {
      id
    }
  }
`;

export const DeleteAttributeMutationOptions = {
  props: ({ mutate }) => ({
    deleteAttribute: ({ attributeId }) => (
      mutate({ variables: { attributeId } })
    )
  })
};

export const DeleteProductQuery = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
    }
  }
`;

export const DeleteProductQueryOptions = {
  props: ({ mutate }) => ({
    deleteProduct: ({ productId }) =>
      mutate({
        variables: { productId }
      })
  })
};

export const CreateProductMutation = gql`
  mutation upsertProduct(
    $name: String!
    $brandId: ID!
    $categoryId: ID!
    $available: Boolean!
    $optionIds: [ID!]!
    $variants: [ProductVariantInput!]!
    $productId: ID,
    $attributesIds: [ID!]!
    $unavailableOptionsValuesIds: [ID!]!
    $displayPrice: Float!
    $imageUrl: String,
    $nullValue: DateTime
  ) {
    upsertProduct(
      name: $name
      imageUrl: $imageUrl
      brandId: $brandId
      categoryId: $categoryId
      available: $available
      optionIds: $optionIds
      variants: $variants
      productId: $productId
      attributesIds: $attributesIds
      unavailableOptionsValuesIds: $unavailableOptionsValuesIds
      displayPrice: $displayPrice
    ) {
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

export const CreateProductMutationOptions = {
  props: ({ mutate }) => ({
    upsertProduct: ({ name, brandId, categoryId, available, optionIds, variants, productId, attributesIds, displayPrice, imageUrl, unavailableOptionsValuesIds }) =>
      mutate({
        variables: { name, brandId, categoryId, available, optionIds, variants, productId, attributesIds, displayPrice, imageUrl, unavailableOptionsValuesIds, nullValue: null },
        update: (store, { data: { upsertProduct } }) => {
          const data = store.readQuery({
            query: ListAllProductsQuery,
            variables: { nullValue: null }
          });

          const existingProductIndex = data.allProducts.findIndex((product) => product.id === upsertProduct.id);

          if (existingProductIndex !== -1) {
            data.allProducts[existingProductIndex] = upsertProduct;
          } else {
            data.allProducts.push(upsertProduct);
          }

          store.writeQuery({ query: ListAllProductsQuery, data });
        }
      })
  })
};

export const AuthenticateUser = gql`
  mutation authenticateUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        role
      }
      token
    }
  }
`;

export const UpsertBestSalesMutation = gql`
  mutation upsertBestSellers($bestSellerProducts: [OrderableProductInput!]!) {
    upsertBestSellerProducts(bestSellerProducts: $bestSellerProducts) {
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
`;

export const UpsertBestSalesMutationOptions = {
  props: ({ mutate }) => ({
    upsertBestSellerProducts: ({ bestSellerProducts }) => (
      mutate({
        variables: { bestSellerProducts },
      })
    )
  })
};

export const UpsertNewProductsMutation = gql`
  mutation upsertNewProducts($newProducts: [OrderableProductInput!]!) {
    upsertNewProducts(newProducts: $newProducts) {
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
`;

export const UpsertNewProductsMutationOptions = {
  props: ({ mutate }) => ({
    upsertNewProducts: ({ newProducts, shopMetadataId }) => (
      mutate({
        variables: { newProducts, shopMetadataId },
      })
    )
  })
};

export const SetOrderAsPreparedMutation = gql`
  mutation setOrderAsPrepared($orderId: ID!) {
    setOrderAsPrepared(orderId: $orderId) {
      id
      orderStatus
    }
  }
`;

export const SetOrderAsPreparedMutationOptions = {
  props: ({ mutate }) => ({
    setOrderAsPrepared: ({ orderId }) => (
      mutate({
        variables: { orderId },
      })
    )
  })
};

export const UpdateMotdMutation = gql`
  mutation updateShopMotd($MOTD: String!) {
    updateMOTD(MOTD: $MOTD) {
      id
      MOTD
    }
  }
`;

export const UpdateMotdMutationOptions = {
  props: ({ mutate }) => ({
    updateMOTD: ({ MOTD }) => (
      mutate({
        variables: { MOTD },
      })
    )
  })
};
