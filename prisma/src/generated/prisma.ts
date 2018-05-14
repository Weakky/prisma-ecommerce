import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type AggregateAttribute {
  count: Int!
}

type AggregateBrand {
  count: Int!
}

type AggregateCategory {
  count: Int!
}

type AggregateFile {
  count: Int!
}

type AggregateOption {
  count: Int!
}

type AggregateOptionValue {
  count: Int!
}

type AggregateOrder {
  count: Int!
}

type AggregateOrderableProduct {
  count: Int!
}

type AggregateOrderLineItem {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateSelectedOption {
  count: Int!
}

type AggregateShopMetadata {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVariant {
  count: Int!
}

type Attribute implements Node {
  id: ID!
  value: String!
  category(where: CategoryWhereInput): Category!
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product!]
}

"""
A connection to a list of items.
"""
type AttributeConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [AttributeEdge]!
  aggregate: AggregateAttribute!
}

input AttributeCreateInput {
  value: String!
  category: CategoryCreateOneInput!
  products: ProductCreateManyWithoutAttributesInput
}

input AttributeCreateManyWithoutProductsInput {
  create: [AttributeCreateWithoutProductsInput!]
  connect: [AttributeWhereUniqueInput!]
}

input AttributeCreateWithoutProductsInput {
  value: String!
  category: CategoryCreateOneInput!
}

"""
An edge in a connection.
"""
type AttributeEdge {
  """
  The item at the end of the edge.
  """
  node: Attribute!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum AttributeOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type AttributePreviousValues {
  id: ID!
  value: String!
}

type AttributeSubscriptionPayload {
  mutation: MutationType!
  node: Attribute
  updatedFields: [String!]
  previousValues: AttributePreviousValues
}

input AttributeSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [AttributeSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [AttributeSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [AttributeSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AttributeWhereInput
}

input AttributeUpdateInput {
  value: String
  category: CategoryUpdateOneInput
  products: ProductUpdateManyWithoutAttributesInput
}

input AttributeUpdateManyWithoutProductsInput {
  create: [AttributeCreateWithoutProductsInput!]
  connect: [AttributeWhereUniqueInput!]
  disconnect: [AttributeWhereUniqueInput!]
  delete: [AttributeWhereUniqueInput!]
  update: [AttributeUpdateWithWhereUniqueWithoutProductsInput!]
  upsert: [AttributeUpsertWithWhereUniqueWithoutProductsInput!]
}

input AttributeUpdateWithoutProductsDataInput {
  value: String
  category: CategoryUpdateOneInput
}

input AttributeUpdateWithWhereUniqueWithoutProductsInput {
  where: AttributeWhereUniqueInput!
  data: AttributeUpdateWithoutProductsDataInput!
}

input AttributeUpsertWithWhereUniqueWithoutProductsInput {
  where: AttributeWhereUniqueInput!
  update: AttributeUpdateWithoutProductsDataInput!
  create: AttributeCreateWithoutProductsInput!
}

input AttributeWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [AttributeWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [AttributeWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [AttributeWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  value: String
  """
  All values that are not equal to given value.
  """
  value_not: String
  """
  All values that are contained in given list.
  """
  value_in: [String!]
  """
  All values that are not contained in given list.
  """
  value_not_in: [String!]
  """
  All values less than the given value.
  """
  value_lt: String
  """
  All values less than or equal the given value.
  """
  value_lte: String
  """
  All values greater than the given value.
  """
  value_gt: String
  """
  All values greater than or equal the given value.
  """
  value_gte: String
  """
  All values containing the given string.
  """
  value_contains: String
  """
  All values not containing the given string.
  """
  value_not_contains: String
  """
  All values starting with the given string.
  """
  value_starts_with: String
  """
  All values not starting with the given string.
  """
  value_not_starts_with: String
  """
  All values ending with the given string.
  """
  value_ends_with: String
  """
  All values not ending with the given string.
  """
  value_not_ends_with: String
  category: CategoryWhereInput
  products_every: ProductWhereInput
  products_some: ProductWhereInput
  products_none: ProductWhereInput
}

input AttributeWhereUniqueInput {
  id: ID
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

type Brand implements Node {
  id: ID!
  name: String!
  category(where: CategoryWhereInput): Category!
}

"""
A connection to a list of items.
"""
type BrandConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [BrandEdge]!
  aggregate: AggregateBrand!
}

input BrandCreateInput {
  name: String!
  category: CategoryCreateOneInput!
}

input BrandCreateOneInput {
  create: BrandCreateInput
  connect: BrandWhereUniqueInput
}

"""
An edge in a connection.
"""
type BrandEdge {
  """
  The item at the end of the edge.
  """
  node: Brand!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum BrandOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type BrandPreviousValues {
  id: ID!
  name: String!
}

type BrandSubscriptionPayload {
  mutation: MutationType!
  node: Brand
  updatedFields: [String!]
  previousValues: BrandPreviousValues
}

input BrandSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [BrandSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [BrandSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [BrandSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: BrandWhereInput
}

input BrandUpdateDataInput {
  name: String
  category: CategoryUpdateOneInput
}

input BrandUpdateInput {
  name: String
  category: CategoryUpdateOneInput
}

input BrandUpdateOneInput {
  create: BrandCreateInput
  connect: BrandWhereUniqueInput
  delete: Boolean
  update: BrandUpdateDataInput
  upsert: BrandUpsertNestedInput
}

input BrandUpsertNestedInput {
  update: BrandUpdateDataInput!
  create: BrandCreateInput!
}

input BrandWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [BrandWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [BrandWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [BrandWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  category: CategoryWhereInput
}

input BrandWhereUniqueInput {
  id: ID
}

type Category implements Node {
  id: ID!
  name: String!
  options(where: OptionWhereInput, orderBy: OptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Option!]
}

"""
A connection to a list of items.
"""
type CategoryConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [CategoryEdge]!
  aggregate: AggregateCategory!
}

input CategoryCreateInput {
  name: String!
  options: OptionCreateManyWithoutCategoryInput
}

input CategoryCreateOneInput {
  create: CategoryCreateInput
  connect: CategoryWhereUniqueInput
}

input CategoryCreateOneWithoutOptionsInput {
  create: CategoryCreateWithoutOptionsInput
  connect: CategoryWhereUniqueInput
}

input CategoryCreateWithoutOptionsInput {
  name: String!
}

"""
An edge in a connection.
"""
type CategoryEdge {
  """
  The item at the end of the edge.
  """
  node: Category!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum CategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type CategoryPreviousValues {
  id: ID!
  name: String!
}

type CategorySubscriptionPayload {
  mutation: MutationType!
  node: Category
  updatedFields: [String!]
  previousValues: CategoryPreviousValues
}

input CategorySubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CategorySubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CategorySubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [CategorySubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CategoryWhereInput
}

input CategoryUpdateDataInput {
  name: String
  options: OptionUpdateManyWithoutCategoryInput
}

input CategoryUpdateInput {
  name: String
  options: OptionUpdateManyWithoutCategoryInput
}

input CategoryUpdateOneInput {
  create: CategoryCreateInput
  connect: CategoryWhereUniqueInput
  delete: Boolean
  update: CategoryUpdateDataInput
  upsert: CategoryUpsertNestedInput
}

input CategoryUpdateOneWithoutOptionsInput {
  create: CategoryCreateWithoutOptionsInput
  connect: CategoryWhereUniqueInput
  delete: Boolean
  update: CategoryUpdateWithoutOptionsDataInput
  upsert: CategoryUpsertWithoutOptionsInput
}

input CategoryUpdateWithoutOptionsDataInput {
  name: String
}

input CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput!
  create: CategoryCreateInput!
}

input CategoryUpsertWithoutOptionsInput {
  update: CategoryUpdateWithoutOptionsDataInput!
  create: CategoryCreateWithoutOptionsInput!
}

input CategoryWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CategoryWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CategoryWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [CategoryWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  options_every: OptionWhereInput
  options_some: OptionWhereInput
  options_none: OptionWhereInput
}

input CategoryWhereUniqueInput {
  id: ID
}

scalar DateTime

type File implements Node {
  id: ID!
  name: String!
  url: String!
  contentType: String!
  secret: String!
  size: Int!
}

"""
A connection to a list of items.
"""
type FileConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [FileEdge]!
  aggregate: AggregateFile!
}

input FileCreateInput {
  name: String!
  url: String!
  contentType: String!
  secret: String!
  size: Int!
}

"""
An edge in a connection.
"""
type FileEdge {
  """
  The item at the end of the edge.
  """
  node: File!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum FileOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  url_ASC
  url_DESC
  contentType_ASC
  contentType_DESC
  secret_ASC
  secret_DESC
  size_ASC
  size_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type FilePreviousValues {
  id: ID!
  name: String!
  url: String!
  contentType: String!
  secret: String!
  size: Int!
}

type FileSubscriptionPayload {
  mutation: MutationType!
  node: File
  updatedFields: [String!]
  previousValues: FilePreviousValues
}

input FileSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [FileSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [FileSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [FileSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: FileWhereInput
}

input FileUpdateInput {
  name: String
  url: String
  contentType: String
  secret: String
  size: Int
}

input FileWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [FileWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [FileWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [FileWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  url: String
  """
  All values that are not equal to given value.
  """
  url_not: String
  """
  All values that are contained in given list.
  """
  url_in: [String!]
  """
  All values that are not contained in given list.
  """
  url_not_in: [String!]
  """
  All values less than the given value.
  """
  url_lt: String
  """
  All values less than or equal the given value.
  """
  url_lte: String
  """
  All values greater than the given value.
  """
  url_gt: String
  """
  All values greater than or equal the given value.
  """
  url_gte: String
  """
  All values containing the given string.
  """
  url_contains: String
  """
  All values not containing the given string.
  """
  url_not_contains: String
  """
  All values starting with the given string.
  """
  url_starts_with: String
  """
  All values not starting with the given string.
  """
  url_not_starts_with: String
  """
  All values ending with the given string.
  """
  url_ends_with: String
  """
  All values not ending with the given string.
  """
  url_not_ends_with: String
  contentType: String
  """
  All values that are not equal to given value.
  """
  contentType_not: String
  """
  All values that are contained in given list.
  """
  contentType_in: [String!]
  """
  All values that are not contained in given list.
  """
  contentType_not_in: [String!]
  """
  All values less than the given value.
  """
  contentType_lt: String
  """
  All values less than or equal the given value.
  """
  contentType_lte: String
  """
  All values greater than the given value.
  """
  contentType_gt: String
  """
  All values greater than or equal the given value.
  """
  contentType_gte: String
  """
  All values containing the given string.
  """
  contentType_contains: String
  """
  All values not containing the given string.
  """
  contentType_not_contains: String
  """
  All values starting with the given string.
  """
  contentType_starts_with: String
  """
  All values not starting with the given string.
  """
  contentType_not_starts_with: String
  """
  All values ending with the given string.
  """
  contentType_ends_with: String
  """
  All values not ending with the given string.
  """
  contentType_not_ends_with: String
  secret: String
  """
  All values that are not equal to given value.
  """
  secret_not: String
  """
  All values that are contained in given list.
  """
  secret_in: [String!]
  """
  All values that are not contained in given list.
  """
  secret_not_in: [String!]
  """
  All values less than the given value.
  """
  secret_lt: String
  """
  All values less than or equal the given value.
  """
  secret_lte: String
  """
  All values greater than the given value.
  """
  secret_gt: String
  """
  All values greater than or equal the given value.
  """
  secret_gte: String
  """
  All values containing the given string.
  """
  secret_contains: String
  """
  All values not containing the given string.
  """
  secret_not_contains: String
  """
  All values starting with the given string.
  """
  secret_starts_with: String
  """
  All values not starting with the given string.
  """
  secret_not_starts_with: String
  """
  All values ending with the given string.
  """
  secret_ends_with: String
  """
  All values not ending with the given string.
  """
  secret_not_ends_with: String
  size: Int
  """
  All values that are not equal to given value.
  """
  size_not: Int
  """
  All values that are contained in given list.
  """
  size_in: [Int!]
  """
  All values that are not contained in given list.
  """
  size_not_in: [Int!]
  """
  All values less than the given value.
  """
  size_lt: Int
  """
  All values less than or equal the given value.
  """
  size_lte: Int
  """
  All values greater than the given value.
  """
  size_gt: Int
  """
  All values greater than or equal the given value.
  """
  size_gte: Int
}

input FileWhereUniqueInput {
  id: ID
  url: String
  secret: String
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

type Option implements Node {
  id: ID!
  name: String!
  values(where: OptionValueWhereInput, orderBy: OptionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OptionValue!]
  category(where: CategoryWhereInput): Category!
}

"""
A connection to a list of items.
"""
type OptionConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OptionEdge]!
  aggregate: AggregateOption!
}

input OptionCreateInput {
  name: String!
  values: OptionValueCreateManyInput
  category: CategoryCreateOneWithoutOptionsInput!
}

input OptionCreateManyInput {
  create: [OptionCreateInput!]
  connect: [OptionWhereUniqueInput!]
}

input OptionCreateManyWithoutCategoryInput {
  create: [OptionCreateWithoutCategoryInput!]
  connect: [OptionWhereUniqueInput!]
}

input OptionCreateOneInput {
  create: OptionCreateInput
  connect: OptionWhereUniqueInput
}

input OptionCreateWithoutCategoryInput {
  name: String!
  values: OptionValueCreateManyInput
}

"""
An edge in a connection.
"""
type OptionEdge {
  """
  The item at the end of the edge.
  """
  node: Option!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum OptionOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type OptionPreviousValues {
  id: ID!
  name: String!
}

type OptionSubscriptionPayload {
  mutation: MutationType!
  node: Option
  updatedFields: [String!]
  previousValues: OptionPreviousValues
}

input OptionSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OptionSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OptionSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OptionSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OptionWhereInput
}

input OptionUpdateDataInput {
  name: String
  values: OptionValueUpdateManyInput
  category: CategoryUpdateOneWithoutOptionsInput
}

input OptionUpdateInput {
  name: String
  values: OptionValueUpdateManyInput
  category: CategoryUpdateOneWithoutOptionsInput
}

input OptionUpdateManyInput {
  create: [OptionCreateInput!]
  connect: [OptionWhereUniqueInput!]
  disconnect: [OptionWhereUniqueInput!]
  delete: [OptionWhereUniqueInput!]
  update: [OptionUpdateWithWhereUniqueNestedInput!]
  upsert: [OptionUpsertWithWhereUniqueNestedInput!]
}

input OptionUpdateManyWithoutCategoryInput {
  create: [OptionCreateWithoutCategoryInput!]
  connect: [OptionWhereUniqueInput!]
  disconnect: [OptionWhereUniqueInput!]
  delete: [OptionWhereUniqueInput!]
  update: [OptionUpdateWithWhereUniqueWithoutCategoryInput!]
  upsert: [OptionUpsertWithWhereUniqueWithoutCategoryInput!]
}

input OptionUpdateOneInput {
  create: OptionCreateInput
  connect: OptionWhereUniqueInput
  delete: Boolean
  update: OptionUpdateDataInput
  upsert: OptionUpsertNestedInput
}

input OptionUpdateWithoutCategoryDataInput {
  name: String
  values: OptionValueUpdateManyInput
}

input OptionUpdateWithWhereUniqueNestedInput {
  where: OptionWhereUniqueInput!
  data: OptionUpdateDataInput!
}

input OptionUpdateWithWhereUniqueWithoutCategoryInput {
  where: OptionWhereUniqueInput!
  data: OptionUpdateWithoutCategoryDataInput!
}

input OptionUpsertNestedInput {
  update: OptionUpdateDataInput!
  create: OptionCreateInput!
}

input OptionUpsertWithWhereUniqueNestedInput {
  where: OptionWhereUniqueInput!
  update: OptionUpdateDataInput!
  create: OptionCreateInput!
}

input OptionUpsertWithWhereUniqueWithoutCategoryInput {
  where: OptionWhereUniqueInput!
  update: OptionUpdateWithoutCategoryDataInput!
  create: OptionCreateWithoutCategoryInput!
}

type OptionValue implements Node {
  id: ID!
  name: String!
}

"""
A connection to a list of items.
"""
type OptionValueConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OptionValueEdge]!
  aggregate: AggregateOptionValue!
}

input OptionValueCreateInput {
  name: String!
}

input OptionValueCreateManyInput {
  create: [OptionValueCreateInput!]
  connect: [OptionValueWhereUniqueInput!]
}

input OptionValueCreateOneInput {
  create: OptionValueCreateInput
  connect: OptionValueWhereUniqueInput
}

"""
An edge in a connection.
"""
type OptionValueEdge {
  """
  The item at the end of the edge.
  """
  node: OptionValue!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum OptionValueOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type OptionValuePreviousValues {
  id: ID!
  name: String!
}

type OptionValueSubscriptionPayload {
  mutation: MutationType!
  node: OptionValue
  updatedFields: [String!]
  previousValues: OptionValuePreviousValues
}

input OptionValueSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OptionValueSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OptionValueSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OptionValueSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OptionValueWhereInput
}

input OptionValueUpdateDataInput {
  name: String
}

input OptionValueUpdateInput {
  name: String
}

input OptionValueUpdateManyInput {
  create: [OptionValueCreateInput!]
  connect: [OptionValueWhereUniqueInput!]
  disconnect: [OptionValueWhereUniqueInput!]
  delete: [OptionValueWhereUniqueInput!]
  update: [OptionValueUpdateWithWhereUniqueNestedInput!]
  upsert: [OptionValueUpsertWithWhereUniqueNestedInput!]
}

input OptionValueUpdateOneInput {
  create: OptionValueCreateInput
  connect: OptionValueWhereUniqueInput
  delete: Boolean
  update: OptionValueUpdateDataInput
  upsert: OptionValueUpsertNestedInput
}

input OptionValueUpdateWithWhereUniqueNestedInput {
  where: OptionValueWhereUniqueInput!
  data: OptionValueUpdateDataInput!
}

input OptionValueUpsertNestedInput {
  update: OptionValueUpdateDataInput!
  create: OptionValueCreateInput!
}

input OptionValueUpsertWithWhereUniqueNestedInput {
  where: OptionValueWhereUniqueInput!
  update: OptionValueUpdateDataInput!
  create: OptionValueCreateInput!
}

input OptionValueWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OptionValueWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OptionValueWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OptionValueWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
}

input OptionValueWhereUniqueInput {
  id: ID
}

input OptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OptionWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  values_every: OptionValueWhereInput
  values_some: OptionValueWhereInput
  values_none: OptionValueWhereInput
  category: CategoryWhereInput
}

input OptionWhereUniqueInput {
  id: ID
}

type Order implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  owner(where: UserWhereInput): User!
  lineItems(where: OrderLineItemWhereInput, orderBy: OrderLineItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderLineItem!]
  totalPrice: Float!
  totalRefunded: Float!
  totalTax: Float!
  orderStatus: OrderStatus!
}

type OrderableProduct implements Node {
  id: ID!
  product(where: ProductWhereInput): Product!
  position: Int!
  metadataBestSale(where: ShopMetadataWhereInput): ShopMetadata
  metadataNewProduct(where: ShopMetadataWhereInput): ShopMetadata
}

"""
A connection to a list of items.
"""
type OrderableProductConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OrderableProductEdge]!
  aggregate: AggregateOrderableProduct!
}

input OrderableProductCreateInput {
  position: Int!
  product: ProductCreateOneInput!
  metadataBestSale: ShopMetadataCreateOneWithoutBestSalesProductsInput
  metadataNewProduct: ShopMetadataCreateOneWithoutNewProductsInput
}

input OrderableProductCreateManyWithoutMetadataBestSaleInput {
  create: [OrderableProductCreateWithoutMetadataBestSaleInput!]
  connect: [OrderableProductWhereUniqueInput!]
}

input OrderableProductCreateManyWithoutMetadataNewProductInput {
  create: [OrderableProductCreateWithoutMetadataNewProductInput!]
  connect: [OrderableProductWhereUniqueInput!]
}

input OrderableProductCreateWithoutMetadataBestSaleInput {
  position: Int!
  product: ProductCreateOneInput!
  metadataNewProduct: ShopMetadataCreateOneWithoutNewProductsInput
}

input OrderableProductCreateWithoutMetadataNewProductInput {
  position: Int!
  product: ProductCreateOneInput!
  metadataBestSale: ShopMetadataCreateOneWithoutBestSalesProductsInput
}

"""
An edge in a connection.
"""
type OrderableProductEdge {
  """
  The item at the end of the edge.
  """
  node: OrderableProduct!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum OrderableProductOrderByInput {
  id_ASC
  id_DESC
  position_ASC
  position_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type OrderableProductPreviousValues {
  id: ID!
  position: Int!
}

type OrderableProductSubscriptionPayload {
  mutation: MutationType!
  node: OrderableProduct
  updatedFields: [String!]
  previousValues: OrderableProductPreviousValues
}

input OrderableProductSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderableProductSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderableProductSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OrderableProductSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OrderableProductWhereInput
}

input OrderableProductUpdateInput {
  position: Int
  product: ProductUpdateOneInput
  metadataBestSale: ShopMetadataUpdateOneWithoutBestSalesProductsInput
  metadataNewProduct: ShopMetadataUpdateOneWithoutNewProductsInput
}

input OrderableProductUpdateManyWithoutMetadataBestSaleInput {
  create: [OrderableProductCreateWithoutMetadataBestSaleInput!]
  connect: [OrderableProductWhereUniqueInput!]
  disconnect: [OrderableProductWhereUniqueInput!]
  delete: [OrderableProductWhereUniqueInput!]
  update: [OrderableProductUpdateWithWhereUniqueWithoutMetadataBestSaleInput!]
  upsert: [OrderableProductUpsertWithWhereUniqueWithoutMetadataBestSaleInput!]
}

input OrderableProductUpdateManyWithoutMetadataNewProductInput {
  create: [OrderableProductCreateWithoutMetadataNewProductInput!]
  connect: [OrderableProductWhereUniqueInput!]
  disconnect: [OrderableProductWhereUniqueInput!]
  delete: [OrderableProductWhereUniqueInput!]
  update: [OrderableProductUpdateWithWhereUniqueWithoutMetadataNewProductInput!]
  upsert: [OrderableProductUpsertWithWhereUniqueWithoutMetadataNewProductInput!]
}

input OrderableProductUpdateWithoutMetadataBestSaleDataInput {
  position: Int
  product: ProductUpdateOneInput
  metadataNewProduct: ShopMetadataUpdateOneWithoutNewProductsInput
}

input OrderableProductUpdateWithoutMetadataNewProductDataInput {
  position: Int
  product: ProductUpdateOneInput
  metadataBestSale: ShopMetadataUpdateOneWithoutBestSalesProductsInput
}

input OrderableProductUpdateWithWhereUniqueWithoutMetadataBestSaleInput {
  where: OrderableProductWhereUniqueInput!
  data: OrderableProductUpdateWithoutMetadataBestSaleDataInput!
}

input OrderableProductUpdateWithWhereUniqueWithoutMetadataNewProductInput {
  where: OrderableProductWhereUniqueInput!
  data: OrderableProductUpdateWithoutMetadataNewProductDataInput!
}

input OrderableProductUpsertWithWhereUniqueWithoutMetadataBestSaleInput {
  where: OrderableProductWhereUniqueInput!
  update: OrderableProductUpdateWithoutMetadataBestSaleDataInput!
  create: OrderableProductCreateWithoutMetadataBestSaleInput!
}

input OrderableProductUpsertWithWhereUniqueWithoutMetadataNewProductInput {
  where: OrderableProductWhereUniqueInput!
  update: OrderableProductUpdateWithoutMetadataNewProductDataInput!
  create: OrderableProductCreateWithoutMetadataNewProductInput!
}

input OrderableProductWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderableProductWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderableProductWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OrderableProductWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  position: Int
  """
  All values that are not equal to given value.
  """
  position_not: Int
  """
  All values that are contained in given list.
  """
  position_in: [Int!]
  """
  All values that are not contained in given list.
  """
  position_not_in: [Int!]
  """
  All values less than the given value.
  """
  position_lt: Int
  """
  All values less than or equal the given value.
  """
  position_lte: Int
  """
  All values greater than the given value.
  """
  position_gt: Int
  """
  All values greater than or equal the given value.
  """
  position_gte: Int
  product: ProductWhereInput
  metadataBestSale: ShopMetadataWhereInput
  metadataNewProduct: ShopMetadataWhereInput
}

input OrderableProductWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type OrderConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  totalPrice: Float!
  totalRefunded: Float!
  totalTax: Float!
  orderStatus: OrderStatus!
  owner: UserCreateOneWithoutOrdersInput!
  lineItems: OrderLineItemCreateManyInput
}

input OrderCreateManyWithoutOwnerInput {
  create: [OrderCreateWithoutOwnerInput!]
  connect: [OrderWhereUniqueInput!]
}

input OrderCreateWithoutOwnerInput {
  totalPrice: Float!
  totalRefunded: Float!
  totalTax: Float!
  orderStatus: OrderStatus!
  lineItems: OrderLineItemCreateManyInput
}

"""
An edge in a connection.
"""
type OrderEdge {
  """
  The item at the end of the edge.
  """
  node: Order!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

type OrderLineItem implements Node {
  id: ID!
  quantity: Int!
  variant(where: VariantWhereInput): Variant!
  owner(where: UserWhereInput): User
}

"""
A connection to a list of items.
"""
type OrderLineItemConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OrderLineItemEdge]!
  aggregate: AggregateOrderLineItem!
}

input OrderLineItemCreateInput {
  quantity: Int!
  variant: VariantCreateOneInput!
  owner: UserCreateOneWithoutCartInput
}

input OrderLineItemCreateManyInput {
  create: [OrderLineItemCreateInput!]
  connect: [OrderLineItemWhereUniqueInput!]
}

input OrderLineItemCreateManyWithoutOwnerInput {
  create: [OrderLineItemCreateWithoutOwnerInput!]
  connect: [OrderLineItemWhereUniqueInput!]
}

input OrderLineItemCreateWithoutOwnerInput {
  quantity: Int!
  variant: VariantCreateOneInput!
}

"""
An edge in a connection.
"""
type OrderLineItemEdge {
  """
  The item at the end of the edge.
  """
  node: OrderLineItem!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum OrderLineItemOrderByInput {
  id_ASC
  id_DESC
  quantity_ASC
  quantity_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type OrderLineItemPreviousValues {
  id: ID!
  quantity: Int!
}

type OrderLineItemSubscriptionPayload {
  mutation: MutationType!
  node: OrderLineItem
  updatedFields: [String!]
  previousValues: OrderLineItemPreviousValues
}

input OrderLineItemSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderLineItemSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderLineItemSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OrderLineItemSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OrderLineItemWhereInput
}

input OrderLineItemUpdateDataInput {
  quantity: Int
  variant: VariantUpdateOneInput
  owner: UserUpdateOneWithoutCartInput
}

input OrderLineItemUpdateInput {
  quantity: Int
  variant: VariantUpdateOneInput
  owner: UserUpdateOneWithoutCartInput
}

input OrderLineItemUpdateManyInput {
  create: [OrderLineItemCreateInput!]
  connect: [OrderLineItemWhereUniqueInput!]
  disconnect: [OrderLineItemWhereUniqueInput!]
  delete: [OrderLineItemWhereUniqueInput!]
  update: [OrderLineItemUpdateWithWhereUniqueNestedInput!]
  upsert: [OrderLineItemUpsertWithWhereUniqueNestedInput!]
}

input OrderLineItemUpdateManyWithoutOwnerInput {
  create: [OrderLineItemCreateWithoutOwnerInput!]
  connect: [OrderLineItemWhereUniqueInput!]
  disconnect: [OrderLineItemWhereUniqueInput!]
  delete: [OrderLineItemWhereUniqueInput!]
  update: [OrderLineItemUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [OrderLineItemUpsertWithWhereUniqueWithoutOwnerInput!]
}

input OrderLineItemUpdateWithoutOwnerDataInput {
  quantity: Int
  variant: VariantUpdateOneInput
}

input OrderLineItemUpdateWithWhereUniqueNestedInput {
  where: OrderLineItemWhereUniqueInput!
  data: OrderLineItemUpdateDataInput!
}

input OrderLineItemUpdateWithWhereUniqueWithoutOwnerInput {
  where: OrderLineItemWhereUniqueInput!
  data: OrderLineItemUpdateWithoutOwnerDataInput!
}

input OrderLineItemUpsertWithWhereUniqueNestedInput {
  where: OrderLineItemWhereUniqueInput!
  update: OrderLineItemUpdateDataInput!
  create: OrderLineItemCreateInput!
}

input OrderLineItemUpsertWithWhereUniqueWithoutOwnerInput {
  where: OrderLineItemWhereUniqueInput!
  update: OrderLineItemUpdateWithoutOwnerDataInput!
  create: OrderLineItemCreateWithoutOwnerInput!
}

input OrderLineItemWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderLineItemWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderLineItemWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OrderLineItemWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  quantity: Int
  """
  All values that are not equal to given value.
  """
  quantity_not: Int
  """
  All values that are contained in given list.
  """
  quantity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  quantity_not_in: [Int!]
  """
  All values less than the given value.
  """
  quantity_lt: Int
  """
  All values less than or equal the given value.
  """
  quantity_lte: Int
  """
  All values greater than the given value.
  """
  quantity_gt: Int
  """
  All values greater than or equal the given value.
  """
  quantity_gte: Int
  variant: VariantWhereInput
  owner: UserWhereInput
}

input OrderLineItemWhereUniqueInput {
  id: ID
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  totalPrice_ASC
  totalPrice_DESC
  totalRefunded_ASC
  totalRefunded_DESC
  totalTax_ASC
  totalTax_DESC
  orderStatus_ASC
  orderStatus_DESC
}

type OrderPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  totalPrice: Float!
  totalRefunded: Float!
  totalTax: Float!
  orderStatus: OrderStatus!
}

enum OrderStatus {
  SUBMITTED
  PREPARED
  PAID
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OrderSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
}

input OrderUpdateInput {
  totalPrice: Float
  totalRefunded: Float
  totalTax: Float
  orderStatus: OrderStatus
  owner: UserUpdateOneWithoutOrdersInput
  lineItems: OrderLineItemUpdateManyInput
}

input OrderUpdateManyWithoutOwnerInput {
  create: [OrderCreateWithoutOwnerInput!]
  connect: [OrderWhereUniqueInput!]
  disconnect: [OrderWhereUniqueInput!]
  delete: [OrderWhereUniqueInput!]
  update: [OrderUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [OrderUpsertWithWhereUniqueWithoutOwnerInput!]
}

input OrderUpdateWithoutOwnerDataInput {
  totalPrice: Float
  totalRefunded: Float
  totalTax: Float
  orderStatus: OrderStatus
  lineItems: OrderLineItemUpdateManyInput
}

input OrderUpdateWithWhereUniqueWithoutOwnerInput {
  where: OrderWhereUniqueInput!
  data: OrderUpdateWithoutOwnerDataInput!
}

input OrderUpsertWithWhereUniqueWithoutOwnerInput {
  where: OrderWhereUniqueInput!
  update: OrderUpdateWithoutOwnerDataInput!
  create: OrderCreateWithoutOwnerInput!
}

input OrderWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [OrderWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OrderWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OrderWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  totalPrice: Float
  """
  All values that are not equal to given value.
  """
  totalPrice_not: Float
  """
  All values that are contained in given list.
  """
  totalPrice_in: [Float!]
  """
  All values that are not contained in given list.
  """
  totalPrice_not_in: [Float!]
  """
  All values less than the given value.
  """
  totalPrice_lt: Float
  """
  All values less than or equal the given value.
  """
  totalPrice_lte: Float
  """
  All values greater than the given value.
  """
  totalPrice_gt: Float
  """
  All values greater than or equal the given value.
  """
  totalPrice_gte: Float
  totalRefunded: Float
  """
  All values that are not equal to given value.
  """
  totalRefunded_not: Float
  """
  All values that are contained in given list.
  """
  totalRefunded_in: [Float!]
  """
  All values that are not contained in given list.
  """
  totalRefunded_not_in: [Float!]
  """
  All values less than the given value.
  """
  totalRefunded_lt: Float
  """
  All values less than or equal the given value.
  """
  totalRefunded_lte: Float
  """
  All values greater than the given value.
  """
  totalRefunded_gt: Float
  """
  All values greater than or equal the given value.
  """
  totalRefunded_gte: Float
  totalTax: Float
  """
  All values that are not equal to given value.
  """
  totalTax_not: Float
  """
  All values that are contained in given list.
  """
  totalTax_in: [Float!]
  """
  All values that are not contained in given list.
  """
  totalTax_not_in: [Float!]
  """
  All values less than the given value.
  """
  totalTax_lt: Float
  """
  All values less than or equal the given value.
  """
  totalTax_lte: Float
  """
  All values greater than the given value.
  """
  totalTax_gt: Float
  """
  All values greater than or equal the given value.
  """
  totalTax_gte: Float
  orderStatus: OrderStatus
  """
  All values that are not equal to given value.
  """
  orderStatus_not: OrderStatus
  """
  All values that are contained in given list.
  """
  orderStatus_in: [OrderStatus!]
  """
  All values that are not contained in given list.
  """
  orderStatus_not_in: [OrderStatus!]
  owner: UserWhereInput
  lineItems_every: OrderLineItemWhereInput
  lineItems_some: OrderLineItemWhereInput
  lineItems_none: OrderLineItemWhereInput
}

input OrderWhereUniqueInput {
  id: ID
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

type Product implements Node {
  id: ID!
  name: String!
  description: String
  brand(where: BrandWhereInput): Brand!
  SKU: String
  category(where: CategoryWhereInput): Category!
  options(where: OptionWhereInput, orderBy: OptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Option!]
  unavailableOptionsValues(where: OptionValueWhereInput, orderBy: OptionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OptionValue!]
  variants(where: VariantWhereInput, orderBy: VariantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Variant!]
  attributes(where: AttributeWhereInput, orderBy: AttributeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Attribute!]
  displayPrice: Float!
  available: Boolean!
  imageUrl: String
}

"""
A connection to a list of items.
"""
type ProductConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  name: String!
  description: String
  SKU: String
  displayPrice: Float!
  available: Boolean!
  imageUrl: String
  brand: BrandCreateOneInput!
  category: CategoryCreateOneInput!
  options: OptionCreateManyInput
  unavailableOptionsValues: OptionValueCreateManyInput
  variants: VariantCreateManyWithoutProductInput
  attributes: AttributeCreateManyWithoutProductsInput
}

input ProductCreateManyWithoutAttributesInput {
  create: [ProductCreateWithoutAttributesInput!]
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateOneInput {
  create: ProductCreateInput
  connect: ProductWhereUniqueInput
}

input ProductCreateOneWithoutVariantsInput {
  create: ProductCreateWithoutVariantsInput
  connect: ProductWhereUniqueInput
}

input ProductCreateWithoutAttributesInput {
  name: String!
  description: String
  SKU: String
  displayPrice: Float!
  available: Boolean!
  imageUrl: String
  brand: BrandCreateOneInput!
  category: CategoryCreateOneInput!
  options: OptionCreateManyInput
  unavailableOptionsValues: OptionValueCreateManyInput
  variants: VariantCreateManyWithoutProductInput
}

input ProductCreateWithoutVariantsInput {
  name: String!
  description: String
  SKU: String
  displayPrice: Float!
  available: Boolean!
  imageUrl: String
  brand: BrandCreateOneInput!
  category: CategoryCreateOneInput!
  options: OptionCreateManyInput
  unavailableOptionsValues: OptionValueCreateManyInput
  attributes: AttributeCreateManyWithoutProductsInput
}

"""
An edge in a connection.
"""
type ProductEdge {
  """
  The item at the end of the edge.
  """
  node: Product!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  SKU_ASC
  SKU_DESC
  displayPrice_ASC
  displayPrice_DESC
  available_ASC
  available_DESC
  imageUrl_ASC
  imageUrl_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ProductPreviousValues {
  id: ID!
  name: String!
  description: String
  SKU: String
  displayPrice: Float!
  available: Boolean!
  imageUrl: String
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ProductSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProductSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ProductSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
}

input ProductUpdateDataInput {
  name: String
  description: String
  SKU: String
  displayPrice: Float
  available: Boolean
  imageUrl: String
  brand: BrandUpdateOneInput
  category: CategoryUpdateOneInput
  options: OptionUpdateManyInput
  unavailableOptionsValues: OptionValueUpdateManyInput
  variants: VariantUpdateManyWithoutProductInput
  attributes: AttributeUpdateManyWithoutProductsInput
}

input ProductUpdateInput {
  name: String
  description: String
  SKU: String
  displayPrice: Float
  available: Boolean
  imageUrl: String
  brand: BrandUpdateOneInput
  category: CategoryUpdateOneInput
  options: OptionUpdateManyInput
  unavailableOptionsValues: OptionValueUpdateManyInput
  variants: VariantUpdateManyWithoutProductInput
  attributes: AttributeUpdateManyWithoutProductsInput
}

input ProductUpdateManyWithoutAttributesInput {
  create: [ProductCreateWithoutAttributesInput!]
  connect: [ProductWhereUniqueInput!]
  disconnect: [ProductWhereUniqueInput!]
  delete: [ProductWhereUniqueInput!]
  update: [ProductUpdateWithWhereUniqueWithoutAttributesInput!]
  upsert: [ProductUpsertWithWhereUniqueWithoutAttributesInput!]
}

input ProductUpdateOneInput {
  create: ProductCreateInput
  connect: ProductWhereUniqueInput
  delete: Boolean
  update: ProductUpdateDataInput
  upsert: ProductUpsertNestedInput
}

input ProductUpdateOneWithoutVariantsInput {
  create: ProductCreateWithoutVariantsInput
  connect: ProductWhereUniqueInput
  delete: Boolean
  update: ProductUpdateWithoutVariantsDataInput
  upsert: ProductUpsertWithoutVariantsInput
}

input ProductUpdateWithoutAttributesDataInput {
  name: String
  description: String
  SKU: String
  displayPrice: Float
  available: Boolean
  imageUrl: String
  brand: BrandUpdateOneInput
  category: CategoryUpdateOneInput
  options: OptionUpdateManyInput
  unavailableOptionsValues: OptionValueUpdateManyInput
  variants: VariantUpdateManyWithoutProductInput
}

input ProductUpdateWithoutVariantsDataInput {
  name: String
  description: String
  SKU: String
  displayPrice: Float
  available: Boolean
  imageUrl: String
  brand: BrandUpdateOneInput
  category: CategoryUpdateOneInput
  options: OptionUpdateManyInput
  unavailableOptionsValues: OptionValueUpdateManyInput
  attributes: AttributeUpdateManyWithoutProductsInput
}

input ProductUpdateWithWhereUniqueWithoutAttributesInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutAttributesDataInput!
}

input ProductUpsertNestedInput {
  update: ProductUpdateDataInput!
  create: ProductCreateInput!
}

input ProductUpsertWithoutVariantsInput {
  update: ProductUpdateWithoutVariantsDataInput!
  create: ProductCreateWithoutVariantsInput!
}

input ProductUpsertWithWhereUniqueWithoutAttributesInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutAttributesDataInput!
  create: ProductCreateWithoutAttributesInput!
}

input ProductWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ProductWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProductWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ProductWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  SKU: String
  """
  All values that are not equal to given value.
  """
  SKU_not: String
  """
  All values that are contained in given list.
  """
  SKU_in: [String!]
  """
  All values that are not contained in given list.
  """
  SKU_not_in: [String!]
  """
  All values less than the given value.
  """
  SKU_lt: String
  """
  All values less than or equal the given value.
  """
  SKU_lte: String
  """
  All values greater than the given value.
  """
  SKU_gt: String
  """
  All values greater than or equal the given value.
  """
  SKU_gte: String
  """
  All values containing the given string.
  """
  SKU_contains: String
  """
  All values not containing the given string.
  """
  SKU_not_contains: String
  """
  All values starting with the given string.
  """
  SKU_starts_with: String
  """
  All values not starting with the given string.
  """
  SKU_not_starts_with: String
  """
  All values ending with the given string.
  """
  SKU_ends_with: String
  """
  All values not ending with the given string.
  """
  SKU_not_ends_with: String
  displayPrice: Float
  """
  All values that are not equal to given value.
  """
  displayPrice_not: Float
  """
  All values that are contained in given list.
  """
  displayPrice_in: [Float!]
  """
  All values that are not contained in given list.
  """
  displayPrice_not_in: [Float!]
  """
  All values less than the given value.
  """
  displayPrice_lt: Float
  """
  All values less than or equal the given value.
  """
  displayPrice_lte: Float
  """
  All values greater than the given value.
  """
  displayPrice_gt: Float
  """
  All values greater than or equal the given value.
  """
  displayPrice_gte: Float
  available: Boolean
  """
  All values that are not equal to given value.
  """
  available_not: Boolean
  imageUrl: String
  """
  All values that are not equal to given value.
  """
  imageUrl_not: String
  """
  All values that are contained in given list.
  """
  imageUrl_in: [String!]
  """
  All values that are not contained in given list.
  """
  imageUrl_not_in: [String!]
  """
  All values less than the given value.
  """
  imageUrl_lt: String
  """
  All values less than or equal the given value.
  """
  imageUrl_lte: String
  """
  All values greater than the given value.
  """
  imageUrl_gt: String
  """
  All values greater than or equal the given value.
  """
  imageUrl_gte: String
  """
  All values containing the given string.
  """
  imageUrl_contains: String
  """
  All values not containing the given string.
  """
  imageUrl_not_contains: String
  """
  All values starting with the given string.
  """
  imageUrl_starts_with: String
  """
  All values not starting with the given string.
  """
  imageUrl_not_starts_with: String
  """
  All values ending with the given string.
  """
  imageUrl_ends_with: String
  """
  All values not ending with the given string.
  """
  imageUrl_not_ends_with: String
  brand: BrandWhereInput
  category: CategoryWhereInput
  options_every: OptionWhereInput
  options_some: OptionWhereInput
  options_none: OptionWhereInput
  unavailableOptionsValues_every: OptionValueWhereInput
  unavailableOptionsValues_some: OptionValueWhereInput
  unavailableOptionsValues_none: OptionValueWhereInput
  variants_every: VariantWhereInput
  variants_some: VariantWhereInput
  variants_none: VariantWhereInput
  attributes_every: AttributeWhereInput
  attributes_some: AttributeWhereInput
  attributes_none: AttributeWhereInput
}

input ProductWhereUniqueInput {
  id: ID
}

enum Role {
  USER
  ADMIN
}

type SelectedOption implements Node {
  id: ID!
  option(where: OptionWhereInput): Option!
  variant(where: VariantWhereInput): Variant!
  value(where: OptionValueWhereInput): OptionValue!
}

"""
A connection to a list of items.
"""
type SelectedOptionConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [SelectedOptionEdge]!
  aggregate: AggregateSelectedOption!
}

input SelectedOptionCreateInput {
  option: OptionCreateOneInput!
  variant: VariantCreateOneWithoutSelectedOptionsInput!
  value: OptionValueCreateOneInput!
}

input SelectedOptionCreateManyWithoutVariantInput {
  create: [SelectedOptionCreateWithoutVariantInput!]
  connect: [SelectedOptionWhereUniqueInput!]
}

input SelectedOptionCreateWithoutVariantInput {
  option: OptionCreateOneInput!
  value: OptionValueCreateOneInput!
}

"""
An edge in a connection.
"""
type SelectedOptionEdge {
  """
  The item at the end of the edge.
  """
  node: SelectedOption!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum SelectedOptionOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SelectedOptionPreviousValues {
  id: ID!
}

type SelectedOptionSubscriptionPayload {
  mutation: MutationType!
  node: SelectedOption
  updatedFields: [String!]
  previousValues: SelectedOptionPreviousValues
}

input SelectedOptionSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [SelectedOptionSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [SelectedOptionSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [SelectedOptionSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SelectedOptionWhereInput
}

input SelectedOptionUpdateInput {
  option: OptionUpdateOneInput
  variant: VariantUpdateOneWithoutSelectedOptionsInput
  value: OptionValueUpdateOneInput
}

input SelectedOptionUpdateManyWithoutVariantInput {
  create: [SelectedOptionCreateWithoutVariantInput!]
  connect: [SelectedOptionWhereUniqueInput!]
  disconnect: [SelectedOptionWhereUniqueInput!]
  delete: [SelectedOptionWhereUniqueInput!]
  update: [SelectedOptionUpdateWithWhereUniqueWithoutVariantInput!]
  upsert: [SelectedOptionUpsertWithWhereUniqueWithoutVariantInput!]
}

input SelectedOptionUpdateWithoutVariantDataInput {
  option: OptionUpdateOneInput
  value: OptionValueUpdateOneInput
}

input SelectedOptionUpdateWithWhereUniqueWithoutVariantInput {
  where: SelectedOptionWhereUniqueInput!
  data: SelectedOptionUpdateWithoutVariantDataInput!
}

input SelectedOptionUpsertWithWhereUniqueWithoutVariantInput {
  where: SelectedOptionWhereUniqueInput!
  update: SelectedOptionUpdateWithoutVariantDataInput!
  create: SelectedOptionCreateWithoutVariantInput!
}

input SelectedOptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [SelectedOptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [SelectedOptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [SelectedOptionWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  option: OptionWhereInput
  variant: VariantWhereInput
  value: OptionValueWhereInput
}

input SelectedOptionWhereUniqueInput {
  id: ID
}

type ShopMetadata implements Node {
  id: ID!
  bestSalesProducts(where: OrderableProductWhereInput, orderBy: OrderableProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderableProduct!]
  newProducts(where: OrderableProductWhereInput, orderBy: OrderableProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderableProduct!]
  MOTD: String
}

"""
A connection to a list of items.
"""
type ShopMetadataConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ShopMetadataEdge]!
  aggregate: AggregateShopMetadata!
}

input ShopMetadataCreateInput {
  MOTD: String
  bestSalesProducts: OrderableProductCreateManyWithoutMetadataBestSaleInput
  newProducts: OrderableProductCreateManyWithoutMetadataNewProductInput
}

input ShopMetadataCreateOneWithoutBestSalesProductsInput {
  create: ShopMetadataCreateWithoutBestSalesProductsInput
  connect: ShopMetadataWhereUniqueInput
}

input ShopMetadataCreateOneWithoutNewProductsInput {
  create: ShopMetadataCreateWithoutNewProductsInput
  connect: ShopMetadataWhereUniqueInput
}

input ShopMetadataCreateWithoutBestSalesProductsInput {
  MOTD: String
  newProducts: OrderableProductCreateManyWithoutMetadataNewProductInput
}

input ShopMetadataCreateWithoutNewProductsInput {
  MOTD: String
  bestSalesProducts: OrderableProductCreateManyWithoutMetadataBestSaleInput
}

"""
An edge in a connection.
"""
type ShopMetadataEdge {
  """
  The item at the end of the edge.
  """
  node: ShopMetadata!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ShopMetadataOrderByInput {
  id_ASC
  id_DESC
  MOTD_ASC
  MOTD_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ShopMetadataPreviousValues {
  id: ID!
  MOTD: String
}

type ShopMetadataSubscriptionPayload {
  mutation: MutationType!
  node: ShopMetadata
  updatedFields: [String!]
  previousValues: ShopMetadataPreviousValues
}

input ShopMetadataSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ShopMetadataSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ShopMetadataSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ShopMetadataSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ShopMetadataWhereInput
}

input ShopMetadataUpdateInput {
  MOTD: String
  bestSalesProducts: OrderableProductUpdateManyWithoutMetadataBestSaleInput
  newProducts: OrderableProductUpdateManyWithoutMetadataNewProductInput
}

input ShopMetadataUpdateOneWithoutBestSalesProductsInput {
  create: ShopMetadataCreateWithoutBestSalesProductsInput
  connect: ShopMetadataWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ShopMetadataUpdateWithoutBestSalesProductsDataInput
  upsert: ShopMetadataUpsertWithoutBestSalesProductsInput
}

input ShopMetadataUpdateOneWithoutNewProductsInput {
  create: ShopMetadataCreateWithoutNewProductsInput
  connect: ShopMetadataWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ShopMetadataUpdateWithoutNewProductsDataInput
  upsert: ShopMetadataUpsertWithoutNewProductsInput
}

input ShopMetadataUpdateWithoutBestSalesProductsDataInput {
  MOTD: String
  newProducts: OrderableProductUpdateManyWithoutMetadataNewProductInput
}

input ShopMetadataUpdateWithoutNewProductsDataInput {
  MOTD: String
  bestSalesProducts: OrderableProductUpdateManyWithoutMetadataBestSaleInput
}

input ShopMetadataUpsertWithoutBestSalesProductsInput {
  update: ShopMetadataUpdateWithoutBestSalesProductsDataInput!
  create: ShopMetadataCreateWithoutBestSalesProductsInput!
}

input ShopMetadataUpsertWithoutNewProductsInput {
  update: ShopMetadataUpdateWithoutNewProductsDataInput!
  create: ShopMetadataCreateWithoutNewProductsInput!
}

input ShopMetadataWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ShopMetadataWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ShopMetadataWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ShopMetadataWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  MOTD: String
  """
  All values that are not equal to given value.
  """
  MOTD_not: String
  """
  All values that are contained in given list.
  """
  MOTD_in: [String!]
  """
  All values that are not contained in given list.
  """
  MOTD_not_in: [String!]
  """
  All values less than the given value.
  """
  MOTD_lt: String
  """
  All values less than or equal the given value.
  """
  MOTD_lte: String
  """
  All values greater than the given value.
  """
  MOTD_gt: String
  """
  All values greater than or equal the given value.
  """
  MOTD_gte: String
  """
  All values containing the given string.
  """
  MOTD_contains: String
  """
  All values not containing the given string.
  """
  MOTD_not_contains: String
  """
  All values starting with the given string.
  """
  MOTD_starts_with: String
  """
  All values not starting with the given string.
  """
  MOTD_not_starts_with: String
  """
  All values ending with the given string.
  """
  MOTD_ends_with: String
  """
  All values not ending with the given string.
  """
  MOTD_not_ends_with: String
  bestSalesProducts_every: OrderableProductWhereInput
  bestSalesProducts_some: OrderableProductWhereInput
  bestSalesProducts_none: OrderableProductWhereInput
  newProducts_every: OrderableProductWhereInput
  newProducts_some: OrderableProductWhereInput
  newProducts_none: OrderableProductWhereInput
}

input ShopMetadataWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  firstName: String
  lastName: String
  role: Role!
  cart(where: OrderLineItemWhereInput, orderBy: OrderLineItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderLineItem!]
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order!]
  stripeCustomerId: String
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  role: Role
  stripeCustomerId: String
  cart: OrderLineItemCreateManyWithoutOwnerInput
  orders: OrderCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutCartInput {
  create: UserCreateWithoutCartInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCartInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  role: Role
  stripeCustomerId: String
  orders: OrderCreateManyWithoutOwnerInput
}

input UserCreateWithoutOrdersInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  role: Role
  stripeCustomerId: String
  cart: OrderLineItemCreateManyWithoutOwnerInput
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  role_ASC
  role_DESC
  stripeCustomerId_ASC
  stripeCustomerId_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  firstName: String
  lastName: String
  role: Role!
  stripeCustomerId: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  password: String
  firstName: String
  lastName: String
  role: Role
  stripeCustomerId: String
  cart: OrderLineItemUpdateManyWithoutOwnerInput
  orders: OrderUpdateManyWithoutOwnerInput
}

input UserUpdateOneWithoutCartInput {
  create: UserCreateWithoutCartInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutCartDataInput
  upsert: UserUpsertWithoutCartInput
}

input UserUpdateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutOrdersDataInput
  upsert: UserUpsertWithoutOrdersInput
}

input UserUpdateWithoutCartDataInput {
  email: String
  password: String
  firstName: String
  lastName: String
  role: Role
  stripeCustomerId: String
  orders: OrderUpdateManyWithoutOwnerInput
}

input UserUpdateWithoutOrdersDataInput {
  email: String
  password: String
  firstName: String
  lastName: String
  role: Role
  stripeCustomerId: String
  cart: OrderLineItemUpdateManyWithoutOwnerInput
}

input UserUpsertWithoutCartInput {
  update: UserUpdateWithoutCartDataInput!
  create: UserCreateWithoutCartInput!
}

input UserUpsertWithoutOrdersInput {
  update: UserUpdateWithoutOrdersDataInput!
  create: UserCreateWithoutOrdersInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  firstName: String
  """
  All values that are not equal to given value.
  """
  firstName_not: String
  """
  All values that are contained in given list.
  """
  firstName_in: [String!]
  """
  All values that are not contained in given list.
  """
  firstName_not_in: [String!]
  """
  All values less than the given value.
  """
  firstName_lt: String
  """
  All values less than or equal the given value.
  """
  firstName_lte: String
  """
  All values greater than the given value.
  """
  firstName_gt: String
  """
  All values greater than or equal the given value.
  """
  firstName_gte: String
  """
  All values containing the given string.
  """
  firstName_contains: String
  """
  All values not containing the given string.
  """
  firstName_not_contains: String
  """
  All values starting with the given string.
  """
  firstName_starts_with: String
  """
  All values not starting with the given string.
  """
  firstName_not_starts_with: String
  """
  All values ending with the given string.
  """
  firstName_ends_with: String
  """
  All values not ending with the given string.
  """
  firstName_not_ends_with: String
  lastName: String
  """
  All values that are not equal to given value.
  """
  lastName_not: String
  """
  All values that are contained in given list.
  """
  lastName_in: [String!]
  """
  All values that are not contained in given list.
  """
  lastName_not_in: [String!]
  """
  All values less than the given value.
  """
  lastName_lt: String
  """
  All values less than or equal the given value.
  """
  lastName_lte: String
  """
  All values greater than the given value.
  """
  lastName_gt: String
  """
  All values greater than or equal the given value.
  """
  lastName_gte: String
  """
  All values containing the given string.
  """
  lastName_contains: String
  """
  All values not containing the given string.
  """
  lastName_not_contains: String
  """
  All values starting with the given string.
  """
  lastName_starts_with: String
  """
  All values not starting with the given string.
  """
  lastName_not_starts_with: String
  """
  All values ending with the given string.
  """
  lastName_ends_with: String
  """
  All values not ending with the given string.
  """
  lastName_not_ends_with: String
  role: Role
  """
  All values that are not equal to given value.
  """
  role_not: Role
  """
  All values that are contained in given list.
  """
  role_in: [Role!]
  """
  All values that are not contained in given list.
  """
  role_not_in: [Role!]
  stripeCustomerId: String
  """
  All values that are not equal to given value.
  """
  stripeCustomerId_not: String
  """
  All values that are contained in given list.
  """
  stripeCustomerId_in: [String!]
  """
  All values that are not contained in given list.
  """
  stripeCustomerId_not_in: [String!]
  """
  All values less than the given value.
  """
  stripeCustomerId_lt: String
  """
  All values less than or equal the given value.
  """
  stripeCustomerId_lte: String
  """
  All values greater than the given value.
  """
  stripeCustomerId_gt: String
  """
  All values greater than or equal the given value.
  """
  stripeCustomerId_gte: String
  """
  All values containing the given string.
  """
  stripeCustomerId_contains: String
  """
  All values not containing the given string.
  """
  stripeCustomerId_not_contains: String
  """
  All values starting with the given string.
  """
  stripeCustomerId_starts_with: String
  """
  All values not starting with the given string.
  """
  stripeCustomerId_not_starts_with: String
  """
  All values ending with the given string.
  """
  stripeCustomerId_ends_with: String
  """
  All values not ending with the given string.
  """
  stripeCustomerId_not_ends_with: String
  cart_every: OrderLineItemWhereInput
  cart_some: OrderLineItemWhereInput
  cart_none: OrderLineItemWhereInput
  orders_every: OrderWhereInput
  orders_some: OrderWhereInput
  orders_none: OrderWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Variant implements Node {
  id: ID!
  selectedOptions(where: SelectedOptionWhereInput, orderBy: SelectedOptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SelectedOption!]
  price: Float!
  available: Boolean!
  product(where: ProductWhereInput): Product!
}

"""
A connection to a list of items.
"""
type VariantConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [VariantEdge]!
  aggregate: AggregateVariant!
}

input VariantCreateInput {
  price: Float!
  available: Boolean!
  selectedOptions: SelectedOptionCreateManyWithoutVariantInput
  product: ProductCreateOneWithoutVariantsInput!
}

input VariantCreateManyWithoutProductInput {
  create: [VariantCreateWithoutProductInput!]
  connect: [VariantWhereUniqueInput!]
}

input VariantCreateOneInput {
  create: VariantCreateInput
  connect: VariantWhereUniqueInput
}

input VariantCreateOneWithoutSelectedOptionsInput {
  create: VariantCreateWithoutSelectedOptionsInput
  connect: VariantWhereUniqueInput
}

input VariantCreateWithoutProductInput {
  price: Float!
  available: Boolean!
  selectedOptions: SelectedOptionCreateManyWithoutVariantInput
}

input VariantCreateWithoutSelectedOptionsInput {
  price: Float!
  available: Boolean!
  product: ProductCreateOneWithoutVariantsInput!
}

"""
An edge in a connection.
"""
type VariantEdge {
  """
  The item at the end of the edge.
  """
  node: Variant!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum VariantOrderByInput {
  id_ASC
  id_DESC
  price_ASC
  price_DESC
  available_ASC
  available_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type VariantPreviousValues {
  id: ID!
  price: Float!
  available: Boolean!
}

type VariantSubscriptionPayload {
  mutation: MutationType!
  node: Variant
  updatedFields: [String!]
  previousValues: VariantPreviousValues
}

input VariantSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [VariantSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [VariantSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [VariantSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: VariantWhereInput
}

input VariantUpdateDataInput {
  price: Float
  available: Boolean
  selectedOptions: SelectedOptionUpdateManyWithoutVariantInput
  product: ProductUpdateOneWithoutVariantsInput
}

input VariantUpdateInput {
  price: Float
  available: Boolean
  selectedOptions: SelectedOptionUpdateManyWithoutVariantInput
  product: ProductUpdateOneWithoutVariantsInput
}

input VariantUpdateManyWithoutProductInput {
  create: [VariantCreateWithoutProductInput!]
  connect: [VariantWhereUniqueInput!]
  disconnect: [VariantWhereUniqueInput!]
  delete: [VariantWhereUniqueInput!]
  update: [VariantUpdateWithWhereUniqueWithoutProductInput!]
  upsert: [VariantUpsertWithWhereUniqueWithoutProductInput!]
}

input VariantUpdateOneInput {
  create: VariantCreateInput
  connect: VariantWhereUniqueInput
  delete: Boolean
  update: VariantUpdateDataInput
  upsert: VariantUpsertNestedInput
}

input VariantUpdateOneWithoutSelectedOptionsInput {
  create: VariantCreateWithoutSelectedOptionsInput
  connect: VariantWhereUniqueInput
  delete: Boolean
  update: VariantUpdateWithoutSelectedOptionsDataInput
  upsert: VariantUpsertWithoutSelectedOptionsInput
}

input VariantUpdateWithoutProductDataInput {
  price: Float
  available: Boolean
  selectedOptions: SelectedOptionUpdateManyWithoutVariantInput
}

input VariantUpdateWithoutSelectedOptionsDataInput {
  price: Float
  available: Boolean
  product: ProductUpdateOneWithoutVariantsInput
}

input VariantUpdateWithWhereUniqueWithoutProductInput {
  where: VariantWhereUniqueInput!
  data: VariantUpdateWithoutProductDataInput!
}

input VariantUpsertNestedInput {
  update: VariantUpdateDataInput!
  create: VariantCreateInput!
}

input VariantUpsertWithoutSelectedOptionsInput {
  update: VariantUpdateWithoutSelectedOptionsDataInput!
  create: VariantCreateWithoutSelectedOptionsInput!
}

input VariantUpsertWithWhereUniqueWithoutProductInput {
  where: VariantWhereUniqueInput!
  update: VariantUpdateWithoutProductDataInput!
  create: VariantCreateWithoutProductInput!
}

input VariantWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [VariantWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [VariantWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [VariantWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  price: Float
  """
  All values that are not equal to given value.
  """
  price_not: Float
  """
  All values that are contained in given list.
  """
  price_in: [Float!]
  """
  All values that are not contained in given list.
  """
  price_not_in: [Float!]
  """
  All values less than the given value.
  """
  price_lt: Float
  """
  All values less than or equal the given value.
  """
  price_lte: Float
  """
  All values greater than the given value.
  """
  price_gt: Float
  """
  All values greater than or equal the given value.
  """
  price_gte: Float
  available: Boolean
  """
  All values that are not equal to given value.
  """
  available_not: Boolean
  selectedOptions_every: SelectedOptionWhereInput
  selectedOptions_some: SelectedOptionWhereInput
  selectedOptions_none: SelectedOptionWhereInput
  product: ProductWhereInput
}

input VariantWhereUniqueInput {
  id: ID
}

type Mutation {
  createBrand(data: BrandCreateInput!): Brand!
  createCategory(data: CategoryCreateInput!): Category!
  createOption(data: OptionCreateInput!): Option!
  createOptionValue(data: OptionValueCreateInput!): OptionValue!
  createSelectedOption(data: SelectedOptionCreateInput!): SelectedOption!
  createVariant(data: VariantCreateInput!): Variant!
  createAttribute(data: AttributeCreateInput!): Attribute!
  createProduct(data: ProductCreateInput!): Product!
  createUser(data: UserCreateInput!): User!
  createFile(data: FileCreateInput!): File!
  createOrder(data: OrderCreateInput!): Order!
  createOrderLineItem(data: OrderLineItemCreateInput!): OrderLineItem!
  createShopMetadata(data: ShopMetadataCreateInput!): ShopMetadata!
  createOrderableProduct(data: OrderableProductCreateInput!): OrderableProduct!
  updateBrand(data: BrandUpdateInput!, where: BrandWhereUniqueInput!): Brand
  updateCategory(data: CategoryUpdateInput!, where: CategoryWhereUniqueInput!): Category
  updateOption(data: OptionUpdateInput!, where: OptionWhereUniqueInput!): Option
  updateOptionValue(data: OptionValueUpdateInput!, where: OptionValueWhereUniqueInput!): OptionValue
  updateSelectedOption(data: SelectedOptionUpdateInput!, where: SelectedOptionWhereUniqueInput!): SelectedOption
  updateVariant(data: VariantUpdateInput!, where: VariantWhereUniqueInput!): Variant
  updateAttribute(data: AttributeUpdateInput!, where: AttributeWhereUniqueInput!): Attribute
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateFile(data: FileUpdateInput!, where: FileWhereUniqueInput!): File
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateOrderLineItem(data: OrderLineItemUpdateInput!, where: OrderLineItemWhereUniqueInput!): OrderLineItem
  updateShopMetadata(data: ShopMetadataUpdateInput!, where: ShopMetadataWhereUniqueInput!): ShopMetadata
  updateOrderableProduct(data: OrderableProductUpdateInput!, where: OrderableProductWhereUniqueInput!): OrderableProduct
  deleteBrand(where: BrandWhereUniqueInput!): Brand
  deleteCategory(where: CategoryWhereUniqueInput!): Category
  deleteOption(where: OptionWhereUniqueInput!): Option
  deleteOptionValue(where: OptionValueWhereUniqueInput!): OptionValue
  deleteSelectedOption(where: SelectedOptionWhereUniqueInput!): SelectedOption
  deleteVariant(where: VariantWhereUniqueInput!): Variant
  deleteAttribute(where: AttributeWhereUniqueInput!): Attribute
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteUser(where: UserWhereUniqueInput!): User
  deleteFile(where: FileWhereUniqueInput!): File
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteOrderLineItem(where: OrderLineItemWhereUniqueInput!): OrderLineItem
  deleteShopMetadata(where: ShopMetadataWhereUniqueInput!): ShopMetadata
  deleteOrderableProduct(where: OrderableProductWhereUniqueInput!): OrderableProduct
  upsertBrand(where: BrandWhereUniqueInput!, create: BrandCreateInput!, update: BrandUpdateInput!): Brand!
  upsertCategory(where: CategoryWhereUniqueInput!, create: CategoryCreateInput!, update: CategoryUpdateInput!): Category!
  upsertOption(where: OptionWhereUniqueInput!, create: OptionCreateInput!, update: OptionUpdateInput!): Option!
  upsertOptionValue(where: OptionValueWhereUniqueInput!, create: OptionValueCreateInput!, update: OptionValueUpdateInput!): OptionValue!
  upsertSelectedOption(where: SelectedOptionWhereUniqueInput!, create: SelectedOptionCreateInput!, update: SelectedOptionUpdateInput!): SelectedOption!
  upsertVariant(where: VariantWhereUniqueInput!, create: VariantCreateInput!, update: VariantUpdateInput!): Variant!
  upsertAttribute(where: AttributeWhereUniqueInput!, create: AttributeCreateInput!, update: AttributeUpdateInput!): Attribute!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertFile(where: FileWhereUniqueInput!, create: FileCreateInput!, update: FileUpdateInput!): File!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  upsertOrderLineItem(where: OrderLineItemWhereUniqueInput!, create: OrderLineItemCreateInput!, update: OrderLineItemUpdateInput!): OrderLineItem!
  upsertShopMetadata(where: ShopMetadataWhereUniqueInput!, create: ShopMetadataCreateInput!, update: ShopMetadataUpdateInput!): ShopMetadata!
  upsertOrderableProduct(where: OrderableProductWhereUniqueInput!, create: OrderableProductCreateInput!, update: OrderableProductUpdateInput!): OrderableProduct!
  updateManyBrands(data: BrandUpdateInput!, where: BrandWhereInput): BatchPayload!
  updateManyCategories(data: CategoryUpdateInput!, where: CategoryWhereInput): BatchPayload!
  updateManyOptions(data: OptionUpdateInput!, where: OptionWhereInput): BatchPayload!
  updateManyOptionValues(data: OptionValueUpdateInput!, where: OptionValueWhereInput): BatchPayload!
  updateManySelectedOptions(data: SelectedOptionUpdateInput!, where: SelectedOptionWhereInput): BatchPayload!
  updateManyVariants(data: VariantUpdateInput!, where: VariantWhereInput): BatchPayload!
  updateManyAttributes(data: AttributeUpdateInput!, where: AttributeWhereInput): BatchPayload!
  updateManyProducts(data: ProductUpdateInput!, where: ProductWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyFiles(data: FileUpdateInput!, where: FileWhereInput): BatchPayload!
  updateManyOrders(data: OrderUpdateInput!, where: OrderWhereInput): BatchPayload!
  updateManyOrderLineItems(data: OrderLineItemUpdateInput!, where: OrderLineItemWhereInput): BatchPayload!
  updateManyShopMetadatas(data: ShopMetadataUpdateInput!, where: ShopMetadataWhereInput): BatchPayload!
  updateManyOrderableProducts(data: OrderableProductUpdateInput!, where: OrderableProductWhereInput): BatchPayload!
  deleteManyBrands(where: BrandWhereInput): BatchPayload!
  deleteManyCategories(where: CategoryWhereInput): BatchPayload!
  deleteManyOptions(where: OptionWhereInput): BatchPayload!
  deleteManyOptionValues(where: OptionValueWhereInput): BatchPayload!
  deleteManySelectedOptions(where: SelectedOptionWhereInput): BatchPayload!
  deleteManyVariants(where: VariantWhereInput): BatchPayload!
  deleteManyAttributes(where: AttributeWhereInput): BatchPayload!
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyFiles(where: FileWhereInput): BatchPayload!
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
  deleteManyOrderLineItems(where: OrderLineItemWhereInput): BatchPayload!
  deleteManyShopMetadatas(where: ShopMetadataWhereInput): BatchPayload!
  deleteManyOrderableProducts(where: OrderableProductWhereInput): BatchPayload!
}

type Query {
  brands(where: BrandWhereInput, orderBy: BrandOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Brand]!
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category]!
  options(where: OptionWhereInput, orderBy: OptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Option]!
  optionValues(where: OptionValueWhereInput, orderBy: OptionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OptionValue]!
  selectedOptions(where: SelectedOptionWhereInput, orderBy: SelectedOptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SelectedOption]!
  variants(where: VariantWhereInput, orderBy: VariantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Variant]!
  attributes(where: AttributeWhereInput, orderBy: AttributeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Attribute]!
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File]!
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  orderLineItems(where: OrderLineItemWhereInput, orderBy: OrderLineItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderLineItem]!
  shopMetadatas(where: ShopMetadataWhereInput, orderBy: ShopMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ShopMetadata]!
  orderableProducts(where: OrderableProductWhereInput, orderBy: OrderableProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderableProduct]!
  brand(where: BrandWhereUniqueInput!): Brand
  category(where: CategoryWhereUniqueInput!): Category
  option(where: OptionWhereUniqueInput!): Option
  optionValue(where: OptionValueWhereUniqueInput!): OptionValue
  selectedOption(where: SelectedOptionWhereUniqueInput!): SelectedOption
  variant(where: VariantWhereUniqueInput!): Variant
  attribute(where: AttributeWhereUniqueInput!): Attribute
  product(where: ProductWhereUniqueInput!): Product
  user(where: UserWhereUniqueInput!): User
  file(where: FileWhereUniqueInput!): File
  order(where: OrderWhereUniqueInput!): Order
  orderLineItem(where: OrderLineItemWhereUniqueInput!): OrderLineItem
  shopMetadata(where: ShopMetadataWhereUniqueInput!): ShopMetadata
  orderableProduct(where: OrderableProductWhereUniqueInput!): OrderableProduct
  brandsConnection(where: BrandWhereInput, orderBy: BrandOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BrandConnection!
  categoriesConnection(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CategoryConnection!
  optionsConnection(where: OptionWhereInput, orderBy: OptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OptionConnection!
  optionValuesConnection(where: OptionValueWhereInput, orderBy: OptionValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OptionValueConnection!
  selectedOptionsConnection(where: SelectedOptionWhereInput, orderBy: SelectedOptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SelectedOptionConnection!
  variantsConnection(where: VariantWhereInput, orderBy: VariantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VariantConnection!
  attributesConnection(where: AttributeWhereInput, orderBy: AttributeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AttributeConnection!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  filesConnection(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FileConnection!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  orderLineItemsConnection(where: OrderLineItemWhereInput, orderBy: OrderLineItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderLineItemConnection!
  shopMetadatasConnection(where: ShopMetadataWhereInput, orderBy: ShopMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ShopMetadataConnection!
  orderableProductsConnection(where: OrderableProductWhereInput, orderBy: OrderableProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderableProductConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  brand(where: BrandSubscriptionWhereInput): BrandSubscriptionPayload
  category(where: CategorySubscriptionWhereInput): CategorySubscriptionPayload
  option(where: OptionSubscriptionWhereInput): OptionSubscriptionPayload
  optionValue(where: OptionValueSubscriptionWhereInput): OptionValueSubscriptionPayload
  selectedOption(where: SelectedOptionSubscriptionWhereInput): SelectedOptionSubscriptionPayload
  variant(where: VariantSubscriptionWhereInput): VariantSubscriptionPayload
  attribute(where: AttributeSubscriptionWhereInput): AttributeSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  file(where: FileSubscriptionWhereInput): FileSubscriptionPayload
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  orderLineItem(where: OrderLineItemSubscriptionWhereInput): OrderLineItemSubscriptionPayload
  shopMetadata(where: ShopMetadataSubscriptionWhereInput): ShopMetadataSubscriptionPayload
  orderableProduct(where: OrderableProductSubscriptionWhereInput): OrderableProductSubscriptionPayload
}
`

export type OrderStatus = 
  'SUBMITTED' |
  'PREPARED' |
  'PAID'

export type SelectedOptionOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OptionOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OrderableProductOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'position_ASC' |
  'position_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Role = 
  'USER' |
  'ADMIN'

export type FileOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'url_ASC' |
  'url_DESC' |
  'contentType_ASC' |
  'contentType_DESC' |
  'secret_ASC' |
  'secret_DESC' |
  'size_ASC' |
  'size_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OptionValueOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OrderOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'totalPrice_ASC' |
  'totalPrice_DESC' |
  'totalRefunded_ASC' |
  'totalRefunded_DESC' |
  'totalTax_ASC' |
  'totalTax_DESC' |
  'orderStatus_ASC' |
  'orderStatus_DESC'

export type VariantOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'price_ASC' |
  'price_DESC' |
  'available_ASC' |
  'available_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type AttributeOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'value_ASC' |
  'value_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type CategoryOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type ProductOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'description_ASC' |
  'description_DESC' |
  'SKU_ASC' |
  'SKU_DESC' |
  'displayPrice_ASC' |
  'displayPrice_DESC' |
  'available_ASC' |
  'available_DESC' |
  'imageUrl_ASC' |
  'imageUrl_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OrderLineItemOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'quantity_ASC' |
  'quantity_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type BrandOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type ShopMetadataOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'MOTD_ASC' |
  'MOTD_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'firstName_ASC' |
  'firstName_DESC' |
  'lastName_ASC' |
  'lastName_DESC' |
  'role_ASC' |
  'role_DESC' |
  'stripeCustomerId_ASC' |
  'stripeCustomerId_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export interface OrderableProductCreateManyWithoutMetadataBestSaleInput {
  create?: OrderableProductCreateWithoutMetadataBestSaleInput[] | OrderableProductCreateWithoutMetadataBestSaleInput
  connect?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
}

export interface BrandWhereInput {
  AND?: BrandWhereInput[] | BrandWhereInput
  OR?: BrandWhereInput[] | BrandWhereInput
  NOT?: BrandWhereInput[] | BrandWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  category?: CategoryWhereInput
}

export interface CategoryCreateWithoutOptionsInput {
  name: String
}

export interface VariantUpdateWithoutProductDataInput {
  price?: Float
  available?: Boolean
  selectedOptions?: SelectedOptionUpdateManyWithoutVariantInput
}

export interface SelectedOptionCreateInput {
  option: OptionCreateOneInput
  variant: VariantCreateOneWithoutSelectedOptionsInput
  value: OptionValueCreateOneInput
}

export interface BrandUpdateInput {
  name?: String
  category?: CategoryUpdateOneInput
}

export interface OptionCreateOneInput {
  create?: OptionCreateInput
  connect?: OptionWhereUniqueInput
}

export interface OrderableProductSubscriptionWhereInput {
  AND?: OrderableProductSubscriptionWhereInput[] | OrderableProductSubscriptionWhereInput
  OR?: OrderableProductSubscriptionWhereInput[] | OrderableProductSubscriptionWhereInput
  NOT?: OrderableProductSubscriptionWhereInput[] | OrderableProductSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OrderableProductWhereInput
}

export interface VariantCreateOneWithoutSelectedOptionsInput {
  create?: VariantCreateWithoutSelectedOptionsInput
  connect?: VariantWhereUniqueInput
}

export interface OrderLineItemSubscriptionWhereInput {
  AND?: OrderLineItemSubscriptionWhereInput[] | OrderLineItemSubscriptionWhereInput
  OR?: OrderLineItemSubscriptionWhereInput[] | OrderLineItemSubscriptionWhereInput
  NOT?: OrderLineItemSubscriptionWhereInput[] | OrderLineItemSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OrderLineItemWhereInput
}

export interface VariantCreateWithoutSelectedOptionsInput {
  price: Float
  available: Boolean
  product: ProductCreateOneWithoutVariantsInput
}

export interface VariantWhereInput {
  AND?: VariantWhereInput[] | VariantWhereInput
  OR?: VariantWhereInput[] | VariantWhereInput
  NOT?: VariantWhereInput[] | VariantWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  price?: Float
  price_not?: Float
  price_in?: Float[] | Float
  price_not_in?: Float[] | Float
  price_lt?: Float
  price_lte?: Float
  price_gt?: Float
  price_gte?: Float
  available?: Boolean
  available_not?: Boolean
  selectedOptions_every?: SelectedOptionWhereInput
  selectedOptions_some?: SelectedOptionWhereInput
  selectedOptions_none?: SelectedOptionWhereInput
  product?: ProductWhereInput
}

export interface ProductCreateOneWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput
  connect?: ProductWhereUniqueInput
}

export interface FileSubscriptionWhereInput {
  AND?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  OR?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  NOT?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: FileWhereInput
}

export interface ProductCreateWithoutVariantsInput {
  name: String
  description?: String
  SKU?: String
  displayPrice: Float
  available: Boolean
  imageUrl?: String
  brand: BrandCreateOneInput
  category: CategoryCreateOneInput
  options?: OptionCreateManyInput
  unavailableOptionsValues?: OptionValueCreateManyInput
  attributes?: AttributeCreateManyWithoutProductsInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  firstName?: String
  firstName_not?: String
  firstName_in?: String[] | String
  firstName_not_in?: String[] | String
  firstName_lt?: String
  firstName_lte?: String
  firstName_gt?: String
  firstName_gte?: String
  firstName_contains?: String
  firstName_not_contains?: String
  firstName_starts_with?: String
  firstName_not_starts_with?: String
  firstName_ends_with?: String
  firstName_not_ends_with?: String
  lastName?: String
  lastName_not?: String
  lastName_in?: String[] | String
  lastName_not_in?: String[] | String
  lastName_lt?: String
  lastName_lte?: String
  lastName_gt?: String
  lastName_gte?: String
  lastName_contains?: String
  lastName_not_contains?: String
  lastName_starts_with?: String
  lastName_not_starts_with?: String
  lastName_ends_with?: String
  lastName_not_ends_with?: String
  role?: Role
  role_not?: Role
  role_in?: Role[] | Role
  role_not_in?: Role[] | Role
  stripeCustomerId?: String
  stripeCustomerId_not?: String
  stripeCustomerId_in?: String[] | String
  stripeCustomerId_not_in?: String[] | String
  stripeCustomerId_lt?: String
  stripeCustomerId_lte?: String
  stripeCustomerId_gt?: String
  stripeCustomerId_gte?: String
  stripeCustomerId_contains?: String
  stripeCustomerId_not_contains?: String
  stripeCustomerId_starts_with?: String
  stripeCustomerId_not_starts_with?: String
  stripeCustomerId_ends_with?: String
  stripeCustomerId_not_ends_with?: String
  cart_every?: OrderLineItemWhereInput
  cart_some?: OrderLineItemWhereInput
  cart_none?: OrderLineItemWhereInput
  orders_every?: OrderWhereInput
  orders_some?: OrderWhereInput
  orders_none?: OrderWhereInput
}

export interface BrandCreateOneInput {
  create?: BrandCreateInput
  connect?: BrandWhereUniqueInput
}

export interface OrderLineItemWhereInput {
  AND?: OrderLineItemWhereInput[] | OrderLineItemWhereInput
  OR?: OrderLineItemWhereInput[] | OrderLineItemWhereInput
  NOT?: OrderLineItemWhereInput[] | OrderLineItemWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  quantity?: Int
  quantity_not?: Int
  quantity_in?: Int[] | Int
  quantity_not_in?: Int[] | Int
  quantity_lt?: Int
  quantity_lte?: Int
  quantity_gt?: Int
  quantity_gte?: Int
  variant?: VariantWhereInput
  owner?: UserWhereInput
}

export interface OptionCreateManyInput {
  create?: OptionCreateInput[] | OptionCreateInput
  connect?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
}

export interface AttributeSubscriptionWhereInput {
  AND?: AttributeSubscriptionWhereInput[] | AttributeSubscriptionWhereInput
  OR?: AttributeSubscriptionWhereInput[] | AttributeSubscriptionWhereInput
  NOT?: AttributeSubscriptionWhereInput[] | AttributeSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: AttributeWhereInput
}

export interface AttributeCreateManyWithoutProductsInput {
  create?: AttributeCreateWithoutProductsInput[] | AttributeCreateWithoutProductsInput
  connect?: AttributeWhereUniqueInput[] | AttributeWhereUniqueInput
}

export interface OptionValueSubscriptionWhereInput {
  AND?: OptionValueSubscriptionWhereInput[] | OptionValueSubscriptionWhereInput
  OR?: OptionValueSubscriptionWhereInput[] | OptionValueSubscriptionWhereInput
  NOT?: OptionValueSubscriptionWhereInput[] | OptionValueSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OptionValueWhereInput
}

export interface AttributeCreateWithoutProductsInput {
  value: String
  category: CategoryCreateOneInput
}

export interface CategorySubscriptionWhereInput {
  AND?: CategorySubscriptionWhereInput[] | CategorySubscriptionWhereInput
  OR?: CategorySubscriptionWhereInput[] | CategorySubscriptionWhereInput
  NOT?: CategorySubscriptionWhereInput[] | CategorySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CategoryWhereInput
}

export interface OptionValueCreateOneInput {
  create?: OptionValueCreateInput
  connect?: OptionValueWhereUniqueInput
}

export interface FileWhereInput {
  AND?: FileWhereInput[] | FileWhereInput
  OR?: FileWhereInput[] | FileWhereInput
  NOT?: FileWhereInput[] | FileWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  url?: String
  url_not?: String
  url_in?: String[] | String
  url_not_in?: String[] | String
  url_lt?: String
  url_lte?: String
  url_gt?: String
  url_gte?: String
  url_contains?: String
  url_not_contains?: String
  url_starts_with?: String
  url_not_starts_with?: String
  url_ends_with?: String
  url_not_ends_with?: String
  contentType?: String
  contentType_not?: String
  contentType_in?: String[] | String
  contentType_not_in?: String[] | String
  contentType_lt?: String
  contentType_lte?: String
  contentType_gt?: String
  contentType_gte?: String
  contentType_contains?: String
  contentType_not_contains?: String
  contentType_starts_with?: String
  contentType_not_starts_with?: String
  contentType_ends_with?: String
  contentType_not_ends_with?: String
  secret?: String
  secret_not?: String
  secret_in?: String[] | String
  secret_not_in?: String[] | String
  secret_lt?: String
  secret_lte?: String
  secret_gt?: String
  secret_gte?: String
  secret_contains?: String
  secret_not_contains?: String
  secret_starts_with?: String
  secret_not_starts_with?: String
  secret_ends_with?: String
  secret_not_ends_with?: String
  size?: Int
  size_not?: Int
  size_in?: Int[] | Int
  size_not_in?: Int[] | Int
  size_lt?: Int
  size_lte?: Int
  size_gt?: Int
  size_gte?: Int
}

export interface VariantCreateInput {
  price: Float
  available: Boolean
  selectedOptions?: SelectedOptionCreateManyWithoutVariantInput
  product: ProductCreateOneWithoutVariantsInput
}

export interface OrderableProductUpdateInput {
  position?: Int
  product?: ProductUpdateOneInput
  metadataBestSale?: ShopMetadataUpdateOneWithoutBestSalesProductsInput
  metadataNewProduct?: ShopMetadataUpdateOneWithoutNewProductsInput
}

export interface SelectedOptionCreateManyWithoutVariantInput {
  create?: SelectedOptionCreateWithoutVariantInput[] | SelectedOptionCreateWithoutVariantInput
  connect?: SelectedOptionWhereUniqueInput[] | SelectedOptionWhereUniqueInput
}

export interface OrderableProductWhereInput {
  AND?: OrderableProductWhereInput[] | OrderableProductWhereInput
  OR?: OrderableProductWhereInput[] | OrderableProductWhereInput
  NOT?: OrderableProductWhereInput[] | OrderableProductWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  position?: Int
  position_not?: Int
  position_in?: Int[] | Int
  position_not_in?: Int[] | Int
  position_lt?: Int
  position_lte?: Int
  position_gt?: Int
  position_gte?: Int
  product?: ProductWhereInput
  metadataBestSale?: ShopMetadataWhereInput
  metadataNewProduct?: ShopMetadataWhereInput
}

export interface SelectedOptionCreateWithoutVariantInput {
  option: OptionCreateOneInput
  value: OptionValueCreateOneInput
}

export interface OrderableProductUpsertWithWhereUniqueWithoutMetadataNewProductInput {
  where: OrderableProductWhereUniqueInput
  update: OrderableProductUpdateWithoutMetadataNewProductDataInput
  create: OrderableProductCreateWithoutMetadataNewProductInput
}

export interface AttributeCreateInput {
  value: String
  category: CategoryCreateOneInput
  products?: ProductCreateManyWithoutAttributesInput
}

export interface ShopMetadataUpsertWithoutBestSalesProductsInput {
  update: ShopMetadataUpdateWithoutBestSalesProductsDataInput
  create: ShopMetadataCreateWithoutBestSalesProductsInput
}

export interface ProductCreateManyWithoutAttributesInput {
  create?: ProductCreateWithoutAttributesInput[] | ProductCreateWithoutAttributesInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
}

export interface CategoryWhereUniqueInput {
  id?: ID_Input
}

export interface ProductCreateWithoutAttributesInput {
  name: String
  description?: String
  SKU?: String
  displayPrice: Float
  available: Boolean
  imageUrl?: String
  brand: BrandCreateOneInput
  category: CategoryCreateOneInput
  options?: OptionCreateManyInput
  unavailableOptionsValues?: OptionValueCreateManyInput
  variants?: VariantCreateManyWithoutProductInput
}

export interface OptionValueWhereUniqueInput {
  id?: ID_Input
}

export interface VariantCreateManyWithoutProductInput {
  create?: VariantCreateWithoutProductInput[] | VariantCreateWithoutProductInput
  connect?: VariantWhereUniqueInput[] | VariantWhereUniqueInput
}

export interface VariantWhereUniqueInput {
  id?: ID_Input
}

export interface VariantCreateWithoutProductInput {
  price: Float
  available: Boolean
  selectedOptions?: SelectedOptionCreateManyWithoutVariantInput
}

export interface ProductWhereUniqueInput {
  id?: ID_Input
}

export interface ProductCreateInput {
  name: String
  description?: String
  SKU?: String
  displayPrice: Float
  available: Boolean
  imageUrl?: String
  brand: BrandCreateOneInput
  category: CategoryCreateOneInput
  options?: OptionCreateManyInput
  unavailableOptionsValues?: OptionValueCreateManyInput
  variants?: VariantCreateManyWithoutProductInput
  attributes?: AttributeCreateManyWithoutProductsInput
}

export interface FileWhereUniqueInput {
  id?: ID_Input
  url?: String
  secret?: String
}

export interface UserCreateInput {
  email: String
  password: String
  firstName?: String
  lastName?: String
  role?: Role
  stripeCustomerId?: String
  cart?: OrderLineItemCreateManyWithoutOwnerInput
  orders?: OrderCreateManyWithoutOwnerInput
}

export interface OrderLineItemWhereUniqueInput {
  id?: ID_Input
}

export interface OrderLineItemCreateManyWithoutOwnerInput {
  create?: OrderLineItemCreateWithoutOwnerInput[] | OrderLineItemCreateWithoutOwnerInput
  connect?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
}

export interface OrderableProductWhereUniqueInput {
  id?: ID_Input
}

export interface OrderLineItemCreateWithoutOwnerInput {
  quantity: Int
  variant: VariantCreateOneInput
}

export interface ShopMetadataUpdateOneWithoutBestSalesProductsInput {
  create?: ShopMetadataCreateWithoutBestSalesProductsInput
  connect?: ShopMetadataWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: ShopMetadataUpdateWithoutBestSalesProductsDataInput
  upsert?: ShopMetadataUpsertWithoutBestSalesProductsInput
}

export interface VariantCreateOneInput {
  create?: VariantCreateInput
  connect?: VariantWhereUniqueInput
}

export interface OrderableProductUpdateWithWhereUniqueWithoutMetadataNewProductInput {
  where: OrderableProductWhereUniqueInput
  data: OrderableProductUpdateWithoutMetadataNewProductDataInput
}

export interface OrderCreateManyWithoutOwnerInput {
  create?: OrderCreateWithoutOwnerInput[] | OrderCreateWithoutOwnerInput
  connect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
}

export interface OrderableProductUpsertWithWhereUniqueWithoutMetadataBestSaleInput {
  where: OrderableProductWhereUniqueInput
  update: OrderableProductUpdateWithoutMetadataBestSaleDataInput
  create: OrderableProductCreateWithoutMetadataBestSaleInput
}

export interface OrderCreateWithoutOwnerInput {
  totalPrice: Float
  totalRefunded: Float
  totalTax: Float
  orderStatus: OrderStatus
  lineItems?: OrderLineItemCreateManyInput
}

export interface ShopMetadataUpdateWithoutNewProductsDataInput {
  MOTD?: String
  bestSalesProducts?: OrderableProductUpdateManyWithoutMetadataBestSaleInput
}

export interface OrderLineItemCreateManyInput {
  create?: OrderLineItemCreateInput[] | OrderLineItemCreateInput
  connect?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
}

export interface ProductUpsertNestedInput {
  update: ProductUpdateDataInput
  create: ProductCreateInput
}

export interface OrderLineItemCreateInput {
  quantity: Int
  variant: VariantCreateOneInput
  owner?: UserCreateOneWithoutCartInput
}

export interface ProductUpdateOneInput {
  create?: ProductCreateInput
  connect?: ProductWhereUniqueInput
  delete?: Boolean
  update?: ProductUpdateDataInput
  upsert?: ProductUpsertNestedInput
}

export interface UserCreateOneWithoutCartInput {
  create?: UserCreateWithoutCartInput
  connect?: UserWhereUniqueInput
}

export interface OrderableProductUpdateWithWhereUniqueWithoutMetadataBestSaleInput {
  where: OrderableProductWhereUniqueInput
  data: OrderableProductUpdateWithoutMetadataBestSaleDataInput
}

export interface UserCreateWithoutCartInput {
  email: String
  password: String
  firstName?: String
  lastName?: String
  role?: Role
  stripeCustomerId?: String
  orders?: OrderCreateManyWithoutOwnerInput
}

export interface ShopMetadataUpdateInput {
  MOTD?: String
  bestSalesProducts?: OrderableProductUpdateManyWithoutMetadataBestSaleInput
  newProducts?: OrderableProductUpdateManyWithoutMetadataNewProductInput
}

export interface FileCreateInput {
  name: String
  url: String
  contentType: String
  secret: String
  size: Int
}

export interface UserUpsertWithoutOrdersInput {
  update: UserUpdateWithoutOrdersDataInput
  create: UserCreateWithoutOrdersInput
}

export interface OrderCreateInput {
  totalPrice: Float
  totalRefunded: Float
  totalTax: Float
  orderStatus: OrderStatus
  owner: UserCreateOneWithoutOrdersInput
  lineItems?: OrderLineItemCreateManyInput
}

export interface UserUpdateOneWithoutOrdersInput {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutOrdersDataInput
  upsert?: UserUpsertWithoutOrdersInput
}

export interface UserCreateOneWithoutOrdersInput {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
}

export interface FileUpdateInput {
  name?: String
  url?: String
  contentType?: String
  secret?: String
  size?: Int
}

export interface UserCreateWithoutOrdersInput {
  email: String
  password: String
  firstName?: String
  lastName?: String
  role?: Role
  stripeCustomerId?: String
  cart?: OrderLineItemCreateManyWithoutOwnerInput
}

export interface OrderLineItemUpsertWithWhereUniqueNestedInput {
  where: OrderLineItemWhereUniqueInput
  update: OrderLineItemUpdateDataInput
  create: OrderLineItemCreateInput
}

export interface ShopMetadataCreateInput {
  MOTD?: String
  bestSalesProducts?: OrderableProductCreateManyWithoutMetadataBestSaleInput
  newProducts?: OrderableProductCreateManyWithoutMetadataNewProductInput
}

export interface UserUpdateWithoutCartDataInput {
  email?: String
  password?: String
  firstName?: String
  lastName?: String
  role?: Role
  stripeCustomerId?: String
  orders?: OrderUpdateManyWithoutOwnerInput
}

export interface VariantUpsertWithWhereUniqueWithoutProductInput {
  where: VariantWhereUniqueInput
  update: VariantUpdateWithoutProductDataInput
  create: VariantCreateWithoutProductInput
}

export interface OrderLineItemUpdateDataInput {
  quantity?: Int
  variant?: VariantUpdateOneInput
  owner?: UserUpdateOneWithoutCartInput
}

export interface OrderableProductCreateWithoutMetadataBestSaleInput {
  position: Int
  product: ProductCreateOneInput
  metadataNewProduct?: ShopMetadataCreateOneWithoutNewProductsInput
}

export interface OrderLineItemUpdateManyInput {
  create?: OrderLineItemCreateInput[] | OrderLineItemCreateInput
  connect?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
  disconnect?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
  delete?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
  update?: OrderLineItemUpdateWithWhereUniqueNestedInput[] | OrderLineItemUpdateWithWhereUniqueNestedInput
  upsert?: OrderLineItemUpsertWithWhereUniqueNestedInput[] | OrderLineItemUpsertWithWhereUniqueNestedInput
}

export interface ProductCreateOneInput {
  create?: ProductCreateInput
  connect?: ProductWhereUniqueInput
}

export interface OrderUpdateWithWhereUniqueWithoutOwnerInput {
  where: OrderWhereUniqueInput
  data: OrderUpdateWithoutOwnerDataInput
}

export interface ShopMetadataCreateOneWithoutNewProductsInput {
  create?: ShopMetadataCreateWithoutNewProductsInput
  connect?: ShopMetadataWhereUniqueInput
}

export interface OrderLineItemUpsertWithWhereUniqueWithoutOwnerInput {
  where: OrderLineItemWhereUniqueInput
  update: OrderLineItemUpdateWithoutOwnerDataInput
  create: OrderLineItemCreateWithoutOwnerInput
}

export interface ShopMetadataCreateWithoutNewProductsInput {
  MOTD?: String
  bestSalesProducts?: OrderableProductCreateManyWithoutMetadataBestSaleInput
}

export interface VariantUpdateDataInput {
  price?: Float
  available?: Boolean
  selectedOptions?: SelectedOptionUpdateManyWithoutVariantInput
  product?: ProductUpdateOneWithoutVariantsInput
}

export interface OrderableProductCreateManyWithoutMetadataNewProductInput {
  create?: OrderableProductCreateWithoutMetadataNewProductInput[] | OrderableProductCreateWithoutMetadataNewProductInput
  connect?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
}

export interface OrderLineItemUpdateWithoutOwnerDataInput {
  quantity?: Int
  variant?: VariantUpdateOneInput
}

export interface OrderableProductCreateWithoutMetadataNewProductInput {
  position: Int
  product: ProductCreateOneInput
  metadataBestSale?: ShopMetadataCreateOneWithoutBestSalesProductsInput
}

export interface OrderLineItemUpdateManyWithoutOwnerInput {
  create?: OrderLineItemCreateWithoutOwnerInput[] | OrderLineItemCreateWithoutOwnerInput
  connect?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
  disconnect?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
  delete?: OrderLineItemWhereUniqueInput[] | OrderLineItemWhereUniqueInput
  update?: OrderLineItemUpdateWithWhereUniqueWithoutOwnerInput[] | OrderLineItemUpdateWithWhereUniqueWithoutOwnerInput
  upsert?: OrderLineItemUpsertWithWhereUniqueWithoutOwnerInput[] | OrderLineItemUpsertWithWhereUniqueWithoutOwnerInput
}

export interface ShopMetadataCreateOneWithoutBestSalesProductsInput {
  create?: ShopMetadataCreateWithoutBestSalesProductsInput
  connect?: ShopMetadataWhereUniqueInput
}

export interface ProductUpdateInput {
  name?: String
  description?: String
  SKU?: String
  displayPrice?: Float
  available?: Boolean
  imageUrl?: String
  brand?: BrandUpdateOneInput
  category?: CategoryUpdateOneInput
  options?: OptionUpdateManyInput
  unavailableOptionsValues?: OptionValueUpdateManyInput
  variants?: VariantUpdateManyWithoutProductInput
  attributes?: AttributeUpdateManyWithoutProductsInput
}

export interface ShopMetadataCreateWithoutBestSalesProductsInput {
  MOTD?: String
  newProducts?: OrderableProductCreateManyWithoutMetadataNewProductInput
}

export interface BrandCreateInput {
  name: String
  category: CategoryCreateOneInput
}

export interface OrderableProductCreateInput {
  position: Int
  product: ProductCreateOneInput
  metadataBestSale?: ShopMetadataCreateOneWithoutBestSalesProductsInput
  metadataNewProduct?: ShopMetadataCreateOneWithoutNewProductsInput
}

export interface CategoryCreateInput {
  name: String
  options?: OptionCreateManyWithoutCategoryInput
}

export interface ProductWhereInput {
  AND?: ProductWhereInput[] | ProductWhereInput
  OR?: ProductWhereInput[] | ProductWhereInput
  NOT?: ProductWhereInput[] | ProductWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  SKU?: String
  SKU_not?: String
  SKU_in?: String[] | String
  SKU_not_in?: String[] | String
  SKU_lt?: String
  SKU_lte?: String
  SKU_gt?: String
  SKU_gte?: String
  SKU_contains?: String
  SKU_not_contains?: String
  SKU_starts_with?: String
  SKU_not_starts_with?: String
  SKU_ends_with?: String
  SKU_not_ends_with?: String
  displayPrice?: Float
  displayPrice_not?: Float
  displayPrice_in?: Float[] | Float
  displayPrice_not_in?: Float[] | Float
  displayPrice_lt?: Float
  displayPrice_lte?: Float
  displayPrice_gt?: Float
  displayPrice_gte?: Float
  available?: Boolean
  available_not?: Boolean
  imageUrl?: String
  imageUrl_not?: String
  imageUrl_in?: String[] | String
  imageUrl_not_in?: String[] | String
  imageUrl_lt?: String
  imageUrl_lte?: String
  imageUrl_gt?: String
  imageUrl_gte?: String
  imageUrl_contains?: String
  imageUrl_not_contains?: String
  imageUrl_starts_with?: String
  imageUrl_not_starts_with?: String
  imageUrl_ends_with?: String
  imageUrl_not_ends_with?: String
  brand?: BrandWhereInput
  category?: CategoryWhereInput
  options_every?: OptionWhereInput
  options_some?: OptionWhereInput
  options_none?: OptionWhereInput
  unavailableOptionsValues_every?: OptionValueWhereInput
  unavailableOptionsValues_some?: OptionValueWhereInput
  unavailableOptionsValues_none?: OptionValueWhereInput
  variants_every?: VariantWhereInput
  variants_some?: VariantWhereInput
  variants_none?: VariantWhereInput
  attributes_every?: AttributeWhereInput
  attributes_some?: AttributeWhereInput
  attributes_none?: AttributeWhereInput
}

export interface OptionCreateWithoutCategoryInput {
  name: String
  values?: OptionValueCreateManyInput
}

export interface CategoryUpdateOneInput {
  create?: CategoryCreateInput
  connect?: CategoryWhereUniqueInput
  delete?: Boolean
  update?: CategoryUpdateDataInput
  upsert?: CategoryUpsertNestedInput
}

export interface OptionValueCreateInput {
  name: String
}

export interface CategoryUpdateDataInput {
  name?: String
  options?: OptionUpdateManyWithoutCategoryInput
}

export interface CategoryCreateOneWithoutOptionsInput {
  create?: CategoryCreateWithoutOptionsInput
  connect?: CategoryWhereUniqueInput
}

export interface OptionUpdateManyWithoutCategoryInput {
  create?: OptionCreateWithoutCategoryInput[] | OptionCreateWithoutCategoryInput
  connect?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
  disconnect?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
  delete?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
  update?: OptionUpdateWithWhereUniqueWithoutCategoryInput[] | OptionUpdateWithWhereUniqueWithoutCategoryInput
  upsert?: OptionUpsertWithWhereUniqueWithoutCategoryInput[] | OptionUpsertWithWhereUniqueWithoutCategoryInput
}

export interface ShopMetadataSubscriptionWhereInput {
  AND?: ShopMetadataSubscriptionWhereInput[] | ShopMetadataSubscriptionWhereInput
  OR?: ShopMetadataSubscriptionWhereInput[] | ShopMetadataSubscriptionWhereInput
  NOT?: ShopMetadataSubscriptionWhereInput[] | ShopMetadataSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ShopMetadataWhereInput
}

export interface OptionUpdateWithWhereUniqueWithoutCategoryInput {
  where: OptionWhereUniqueInput
  data: OptionUpdateWithoutCategoryDataInput
}

export interface SelectedOptionWhereInput {
  AND?: SelectedOptionWhereInput[] | SelectedOptionWhereInput
  OR?: SelectedOptionWhereInput[] | SelectedOptionWhereInput
  NOT?: SelectedOptionWhereInput[] | SelectedOptionWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  option?: OptionWhereInput
  variant?: VariantWhereInput
  value?: OptionValueWhereInput
}

export interface OptionUpdateWithoutCategoryDataInput {
  name?: String
  values?: OptionValueUpdateManyInput
}

export interface ProductSubscriptionWhereInput {
  AND?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  OR?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  NOT?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ProductWhereInput
}

export interface OptionValueUpdateManyInput {
  create?: OptionValueCreateInput[] | OptionValueCreateInput
  connect?: OptionValueWhereUniqueInput[] | OptionValueWhereUniqueInput
  disconnect?: OptionValueWhereUniqueInput[] | OptionValueWhereUniqueInput
  delete?: OptionValueWhereUniqueInput[] | OptionValueWhereUniqueInput
  update?: OptionValueUpdateWithWhereUniqueNestedInput[] | OptionValueUpdateWithWhereUniqueNestedInput
  upsert?: OptionValueUpsertWithWhereUniqueNestedInput[] | OptionValueUpsertWithWhereUniqueNestedInput
}

export interface VariantSubscriptionWhereInput {
  AND?: VariantSubscriptionWhereInput[] | VariantSubscriptionWhereInput
  OR?: VariantSubscriptionWhereInput[] | VariantSubscriptionWhereInput
  NOT?: VariantSubscriptionWhereInput[] | VariantSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VariantWhereInput
}

export interface OptionValueUpdateWithWhereUniqueNestedInput {
  where: OptionValueWhereUniqueInput
  data: OptionValueUpdateDataInput
}

export interface OptionSubscriptionWhereInput {
  AND?: OptionSubscriptionWhereInput[] | OptionSubscriptionWhereInput
  OR?: OptionSubscriptionWhereInput[] | OptionSubscriptionWhereInput
  NOT?: OptionSubscriptionWhereInput[] | OptionSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OptionWhereInput
}

export interface OptionValueUpdateDataInput {
  name?: String
}

export interface OptionValueWhereInput {
  AND?: OptionValueWhereInput[] | OptionValueWhereInput
  OR?: OptionValueWhereInput[] | OptionValueWhereInput
  NOT?: OptionValueWhereInput[] | OptionValueWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
}

export interface OptionValueUpsertWithWhereUniqueNestedInput {
  where: OptionValueWhereUniqueInput
  update: OptionValueUpdateDataInput
  create: OptionValueCreateInput
}

export interface OptionWhereInput {
  AND?: OptionWhereInput[] | OptionWhereInput
  OR?: OptionWhereInput[] | OptionWhereInput
  NOT?: OptionWhereInput[] | OptionWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  values_every?: OptionValueWhereInput
  values_some?: OptionValueWhereInput
  values_none?: OptionValueWhereInput
  category?: CategoryWhereInput
}

export interface OptionUpsertWithWhereUniqueWithoutCategoryInput {
  where: OptionWhereUniqueInput
  update: OptionUpdateWithoutCategoryDataInput
  create: OptionCreateWithoutCategoryInput
}

export interface BrandWhereUniqueInput {
  id?: ID_Input
}

export interface CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput
  create: CategoryCreateInput
}

export interface SelectedOptionWhereUniqueInput {
  id?: ID_Input
}

export interface CategoryUpdateInput {
  name?: String
  options?: OptionUpdateManyWithoutCategoryInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface OptionUpdateInput {
  name?: String
  values?: OptionValueUpdateManyInput
  category?: CategoryUpdateOneWithoutOptionsInput
}

export interface ShopMetadataWhereUniqueInput {
  id?: ID_Input
}

export interface CategoryUpdateOneWithoutOptionsInput {
  create?: CategoryCreateWithoutOptionsInput
  connect?: CategoryWhereUniqueInput
  delete?: Boolean
  update?: CategoryUpdateWithoutOptionsDataInput
  upsert?: CategoryUpsertWithoutOptionsInput
}

export interface OrderableProductUpdateWithoutMetadataNewProductDataInput {
  position?: Int
  product?: ProductUpdateOneInput
  metadataBestSale?: ShopMetadataUpdateOneWithoutBestSalesProductsInput
}

export interface CategoryUpdateWithoutOptionsDataInput {
  name?: String
}

export interface ShopMetadataUpsertWithoutNewProductsInput {
  update: ShopMetadataUpdateWithoutNewProductsDataInput
  create: ShopMetadataCreateWithoutNewProductsInput
}

export interface CategoryUpsertWithoutOptionsInput {
  update: CategoryUpdateWithoutOptionsDataInput
  create: CategoryCreateWithoutOptionsInput
}

export interface ProductUpdateDataInput {
  name?: String
  description?: String
  SKU?: String
  displayPrice?: Float
  available?: Boolean
  imageUrl?: String
  brand?: BrandUpdateOneInput
  category?: CategoryUpdateOneInput
  options?: OptionUpdateManyInput
  unavailableOptionsValues?: OptionValueUpdateManyInput
  variants?: VariantUpdateManyWithoutProductInput
  attributes?: AttributeUpdateManyWithoutProductsInput
}

export interface OptionValueUpdateInput {
  name?: String
}

export interface OrderableProductUpdateManyWithoutMetadataBestSaleInput {
  create?: OrderableProductCreateWithoutMetadataBestSaleInput[] | OrderableProductCreateWithoutMetadataBestSaleInput
  connect?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
  disconnect?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
  delete?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
  update?: OrderableProductUpdateWithWhereUniqueWithoutMetadataBestSaleInput[] | OrderableProductUpdateWithWhereUniqueWithoutMetadataBestSaleInput
  upsert?: OrderableProductUpsertWithWhereUniqueWithoutMetadataBestSaleInput[] | OrderableProductUpsertWithWhereUniqueWithoutMetadataBestSaleInput
}

export interface SelectedOptionUpdateInput {
  option?: OptionUpdateOneInput
  variant?: VariantUpdateOneWithoutSelectedOptionsInput
  value?: OptionValueUpdateOneInput
}

export interface UserUpdateWithoutOrdersDataInput {
  email?: String
  password?: String
  firstName?: String
  lastName?: String
  role?: Role
  stripeCustomerId?: String
  cart?: OrderLineItemUpdateManyWithoutOwnerInput
}

export interface OptionUpdateOneInput {
  create?: OptionCreateInput
  connect?: OptionWhereUniqueInput
  delete?: Boolean
  update?: OptionUpdateDataInput
  upsert?: OptionUpsertNestedInput
}

export interface OrderUpsertWithWhereUniqueWithoutOwnerInput {
  where: OrderWhereUniqueInput
  update: OrderUpdateWithoutOwnerDataInput
  create: OrderCreateWithoutOwnerInput
}

export interface OptionUpdateDataInput {
  name?: String
  values?: OptionValueUpdateManyInput
  category?: CategoryUpdateOneWithoutOptionsInput
}

export interface UserUpdateOneWithoutCartInput {
  create?: UserCreateWithoutCartInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutCartDataInput
  upsert?: UserUpsertWithoutCartInput
}

export interface OptionUpsertNestedInput {
  update: OptionUpdateDataInput
  create: OptionCreateInput
}

export interface OrderUpdateWithoutOwnerDataInput {
  totalPrice?: Float
  totalRefunded?: Float
  totalTax?: Float
  orderStatus?: OrderStatus
  lineItems?: OrderLineItemUpdateManyInput
}

export interface VariantUpdateOneWithoutSelectedOptionsInput {
  create?: VariantCreateWithoutSelectedOptionsInput
  connect?: VariantWhereUniqueInput
  delete?: Boolean
  update?: VariantUpdateWithoutSelectedOptionsDataInput
  upsert?: VariantUpsertWithoutSelectedOptionsInput
}

export interface VariantUpsertNestedInput {
  update: VariantUpdateDataInput
  create: VariantCreateInput
}

export interface VariantUpdateWithoutSelectedOptionsDataInput {
  price?: Float
  available?: Boolean
  product?: ProductUpdateOneWithoutVariantsInput
}

export interface OrderLineItemUpdateWithWhereUniqueWithoutOwnerInput {
  where: OrderLineItemWhereUniqueInput
  data: OrderLineItemUpdateWithoutOwnerDataInput
}

export interface ProductUpdateOneWithoutVariantsInput {
  create?: ProductCreateWithoutVariantsInput
  connect?: ProductWhereUniqueInput
  delete?: Boolean
  update?: ProductUpdateWithoutVariantsDataInput
  upsert?: ProductUpsertWithoutVariantsInput
}

export interface ProductUpsertWithWhereUniqueWithoutAttributesInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutAttributesDataInput
  create: ProductCreateWithoutAttributesInput
}

export interface ProductUpdateWithoutVariantsDataInput {
  name?: String
  description?: String
  SKU?: String
  displayPrice?: Float
  available?: Boolean
  imageUrl?: String
  brand?: BrandUpdateOneInput
  category?: CategoryUpdateOneInput
  options?: OptionUpdateManyInput
  unavailableOptionsValues?: OptionValueUpdateManyInput
  attributes?: AttributeUpdateManyWithoutProductsInput
}

export interface OptionCreateManyWithoutCategoryInput {
  create?: OptionCreateWithoutCategoryInput[] | OptionCreateWithoutCategoryInput
  connect?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
}

export interface BrandUpdateOneInput {
  create?: BrandCreateInput
  connect?: BrandWhereUniqueInput
  delete?: Boolean
  update?: BrandUpdateDataInput
  upsert?: BrandUpsertNestedInput
}

export interface OptionCreateInput {
  name: String
  values?: OptionValueCreateManyInput
  category: CategoryCreateOneWithoutOptionsInput
}

export interface BrandUpdateDataInput {
  name?: String
  category?: CategoryUpdateOneInput
}

export interface OrderSubscriptionWhereInput {
  AND?: OrderSubscriptionWhereInput[] | OrderSubscriptionWhereInput
  OR?: OrderSubscriptionWhereInput[] | OrderSubscriptionWhereInput
  NOT?: OrderSubscriptionWhereInput[] | OrderSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OrderWhereInput
}

export interface BrandUpsertNestedInput {
  update: BrandUpdateDataInput
  create: BrandCreateInput
}

export interface OrderWhereInput {
  AND?: OrderWhereInput[] | OrderWhereInput
  OR?: OrderWhereInput[] | OrderWhereInput
  NOT?: OrderWhereInput[] | OrderWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  totalPrice?: Float
  totalPrice_not?: Float
  totalPrice_in?: Float[] | Float
  totalPrice_not_in?: Float[] | Float
  totalPrice_lt?: Float
  totalPrice_lte?: Float
  totalPrice_gt?: Float
  totalPrice_gte?: Float
  totalRefunded?: Float
  totalRefunded_not?: Float
  totalRefunded_in?: Float[] | Float
  totalRefunded_not_in?: Float[] | Float
  totalRefunded_lt?: Float
  totalRefunded_lte?: Float
  totalRefunded_gt?: Float
  totalRefunded_gte?: Float
  totalTax?: Float
  totalTax_not?: Float
  totalTax_in?: Float[] | Float
  totalTax_not_in?: Float[] | Float
  totalTax_lt?: Float
  totalTax_lte?: Float
  totalTax_gt?: Float
  totalTax_gte?: Float
  orderStatus?: OrderStatus
  orderStatus_not?: OrderStatus
  orderStatus_in?: OrderStatus[] | OrderStatus
  orderStatus_not_in?: OrderStatus[] | OrderStatus
  owner?: UserWhereInput
  lineItems_every?: OrderLineItemWhereInput
  lineItems_some?: OrderLineItemWhereInput
  lineItems_none?: OrderLineItemWhereInput
}

export interface OptionUpdateManyInput {
  create?: OptionCreateInput[] | OptionCreateInput
  connect?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
  disconnect?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
  delete?: OptionWhereUniqueInput[] | OptionWhereUniqueInput
  update?: OptionUpdateWithWhereUniqueNestedInput[] | OptionUpdateWithWhereUniqueNestedInput
  upsert?: OptionUpsertWithWhereUniqueNestedInput[] | OptionUpsertWithWhereUniqueNestedInput
}

export interface BrandSubscriptionWhereInput {
  AND?: BrandSubscriptionWhereInput[] | BrandSubscriptionWhereInput
  OR?: BrandSubscriptionWhereInput[] | BrandSubscriptionWhereInput
  NOT?: BrandSubscriptionWhereInput[] | BrandSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: BrandWhereInput
}

export interface OptionUpdateWithWhereUniqueNestedInput {
  where: OptionWhereUniqueInput
  data: OptionUpdateDataInput
}

export interface CategoryWhereInput {
  AND?: CategoryWhereInput[] | CategoryWhereInput
  OR?: CategoryWhereInput[] | CategoryWhereInput
  NOT?: CategoryWhereInput[] | CategoryWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  options_every?: OptionWhereInput
  options_some?: OptionWhereInput
  options_none?: OptionWhereInput
}

export interface OptionUpsertWithWhereUniqueNestedInput {
  where: OptionWhereUniqueInput
  update: OptionUpdateDataInput
  create: OptionCreateInput
}

export interface AttributeWhereUniqueInput {
  id?: ID_Input
}

export interface AttributeUpdateManyWithoutProductsInput {
  create?: AttributeCreateWithoutProductsInput[] | AttributeCreateWithoutProductsInput
  connect?: AttributeWhereUniqueInput[] | AttributeWhereUniqueInput
  disconnect?: AttributeWhereUniqueInput[] | AttributeWhereUniqueInput
  delete?: AttributeWhereUniqueInput[] | AttributeWhereUniqueInput
  update?: AttributeUpdateWithWhereUniqueWithoutProductsInput[] | AttributeUpdateWithWhereUniqueWithoutProductsInput
  upsert?: AttributeUpsertWithWhereUniqueWithoutProductsInput[] | AttributeUpsertWithWhereUniqueWithoutProductsInput
}

export interface ShopMetadataUpdateWithoutBestSalesProductsDataInput {
  MOTD?: String
  newProducts?: OrderableProductUpdateManyWithoutMetadataNewProductInput
}

export interface AttributeUpdateWithWhereUniqueWithoutProductsInput {
  where: AttributeWhereUniqueInput
  data: AttributeUpdateWithoutProductsDataInput
}

export interface ShopMetadataUpdateOneWithoutNewProductsInput {
  create?: ShopMetadataCreateWithoutNewProductsInput
  connect?: ShopMetadataWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: ShopMetadataUpdateWithoutNewProductsDataInput
  upsert?: ShopMetadataUpsertWithoutNewProductsInput
}

export interface AttributeUpdateWithoutProductsDataInput {
  value?: String
  category?: CategoryUpdateOneInput
}

export interface OrderLineItemUpdateInput {
  quantity?: Int
  variant?: VariantUpdateOneInput
  owner?: UserUpdateOneWithoutCartInput
}

export interface AttributeUpsertWithWhereUniqueWithoutProductsInput {
  where: AttributeWhereUniqueInput
  update: AttributeUpdateWithoutProductsDataInput
  create: AttributeCreateWithoutProductsInput
}

export interface UserUpsertWithoutCartInput {
  update: UserUpdateWithoutCartDataInput
  create: UserCreateWithoutCartInput
}

export interface ProductUpsertWithoutVariantsInput {
  update: ProductUpdateWithoutVariantsDataInput
  create: ProductCreateWithoutVariantsInput
}

export interface OrderUpdateManyWithoutOwnerInput {
  create?: OrderCreateWithoutOwnerInput[] | OrderCreateWithoutOwnerInput
  connect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  disconnect?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  delete?: OrderWhereUniqueInput[] | OrderWhereUniqueInput
  update?: OrderUpdateWithWhereUniqueWithoutOwnerInput[] | OrderUpdateWithWhereUniqueWithoutOwnerInput
  upsert?: OrderUpsertWithWhereUniqueWithoutOwnerInput[] | OrderUpsertWithWhereUniqueWithoutOwnerInput
}

export interface VariantUpsertWithoutSelectedOptionsInput {
  update: VariantUpdateWithoutSelectedOptionsDataInput
  create: VariantCreateWithoutSelectedOptionsInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  firstName?: String
  lastName?: String
  role?: Role
  stripeCustomerId?: String
  cart?: OrderLineItemUpdateManyWithoutOwnerInput
  orders?: OrderUpdateManyWithoutOwnerInput
}

export interface OptionValueUpdateOneInput {
  create?: OptionValueCreateInput
  connect?: OptionValueWhereUniqueInput
  delete?: Boolean
  update?: OptionValueUpdateDataInput
  upsert?: OptionValueUpsertNestedInput
}

export interface OptionValueCreateManyInput {
  create?: OptionValueCreateInput[] | OptionValueCreateInput
  connect?: OptionValueWhereUniqueInput[] | OptionValueWhereUniqueInput
}

export interface OptionValueUpsertNestedInput {
  update: OptionValueUpdateDataInput
  create: OptionValueCreateInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface VariantUpdateInput {
  price?: Float
  available?: Boolean
  selectedOptions?: SelectedOptionUpdateManyWithoutVariantInput
  product?: ProductUpdateOneWithoutVariantsInput
}

export interface ShopMetadataWhereInput {
  AND?: ShopMetadataWhereInput[] | ShopMetadataWhereInput
  OR?: ShopMetadataWhereInput[] | ShopMetadataWhereInput
  NOT?: ShopMetadataWhereInput[] | ShopMetadataWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  MOTD?: String
  MOTD_not?: String
  MOTD_in?: String[] | String
  MOTD_not_in?: String[] | String
  MOTD_lt?: String
  MOTD_lte?: String
  MOTD_gt?: String
  MOTD_gte?: String
  MOTD_contains?: String
  MOTD_not_contains?: String
  MOTD_starts_with?: String
  MOTD_not_starts_with?: String
  MOTD_ends_with?: String
  MOTD_not_ends_with?: String
  bestSalesProducts_every?: OrderableProductWhereInput
  bestSalesProducts_some?: OrderableProductWhereInput
  bestSalesProducts_none?: OrderableProductWhereInput
  newProducts_every?: OrderableProductWhereInput
  newProducts_some?: OrderableProductWhereInput
  newProducts_none?: OrderableProductWhereInput
}

export interface SelectedOptionUpdateManyWithoutVariantInput {
  create?: SelectedOptionCreateWithoutVariantInput[] | SelectedOptionCreateWithoutVariantInput
  connect?: SelectedOptionWhereUniqueInput[] | SelectedOptionWhereUniqueInput
  disconnect?: SelectedOptionWhereUniqueInput[] | SelectedOptionWhereUniqueInput
  delete?: SelectedOptionWhereUniqueInput[] | SelectedOptionWhereUniqueInput
  update?: SelectedOptionUpdateWithWhereUniqueWithoutVariantInput[] | SelectedOptionUpdateWithWhereUniqueWithoutVariantInput
  upsert?: SelectedOptionUpsertWithWhereUniqueWithoutVariantInput[] | SelectedOptionUpsertWithWhereUniqueWithoutVariantInput
}

export interface OrderWhereUniqueInput {
  id?: ID_Input
}

export interface SelectedOptionUpdateWithWhereUniqueWithoutVariantInput {
  where: SelectedOptionWhereUniqueInput
  data: SelectedOptionUpdateWithoutVariantDataInput
}

export interface OrderableProductUpdateWithoutMetadataBestSaleDataInput {
  position?: Int
  product?: ProductUpdateOneInput
  metadataNewProduct?: ShopMetadataUpdateOneWithoutNewProductsInput
}

export interface SelectedOptionUpdateWithoutVariantDataInput {
  option?: OptionUpdateOneInput
  value?: OptionValueUpdateOneInput
}

export interface OrderLineItemUpdateWithWhereUniqueNestedInput {
  where: OrderLineItemWhereUniqueInput
  data: OrderLineItemUpdateDataInput
}

export interface SelectedOptionUpsertWithWhereUniqueWithoutVariantInput {
  where: SelectedOptionWhereUniqueInput
  update: SelectedOptionUpdateWithoutVariantDataInput
  create: SelectedOptionCreateWithoutVariantInput
}

export interface CategoryCreateOneInput {
  create?: CategoryCreateInput
  connect?: CategoryWhereUniqueInput
}

export interface AttributeUpdateInput {
  value?: String
  category?: CategoryUpdateOneInput
  products?: ProductUpdateManyWithoutAttributesInput
}

export interface SelectedOptionSubscriptionWhereInput {
  AND?: SelectedOptionSubscriptionWhereInput[] | SelectedOptionSubscriptionWhereInput
  OR?: SelectedOptionSubscriptionWhereInput[] | SelectedOptionSubscriptionWhereInput
  NOT?: SelectedOptionSubscriptionWhereInput[] | SelectedOptionSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SelectedOptionWhereInput
}

export interface ProductUpdateManyWithoutAttributesInput {
  create?: ProductCreateWithoutAttributesInput[] | ProductCreateWithoutAttributesInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  update?: ProductUpdateWithWhereUniqueWithoutAttributesInput[] | ProductUpdateWithWhereUniqueWithoutAttributesInput
  upsert?: ProductUpsertWithWhereUniqueWithoutAttributesInput[] | ProductUpsertWithWhereUniqueWithoutAttributesInput
}

export interface OrderableProductUpdateManyWithoutMetadataNewProductInput {
  create?: OrderableProductCreateWithoutMetadataNewProductInput[] | OrderableProductCreateWithoutMetadataNewProductInput
  connect?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
  disconnect?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
  delete?: OrderableProductWhereUniqueInput[] | OrderableProductWhereUniqueInput
  update?: OrderableProductUpdateWithWhereUniqueWithoutMetadataNewProductInput[] | OrderableProductUpdateWithWhereUniqueWithoutMetadataNewProductInput
  upsert?: OrderableProductUpsertWithWhereUniqueWithoutMetadataNewProductInput[] | OrderableProductUpsertWithWhereUniqueWithoutMetadataNewProductInput
}

export interface VariantUpdateWithWhereUniqueWithoutProductInput {
  where: VariantWhereUniqueInput
  data: VariantUpdateWithoutProductDataInput
}

export interface VariantUpdateManyWithoutProductInput {
  create?: VariantCreateWithoutProductInput[] | VariantCreateWithoutProductInput
  connect?: VariantWhereUniqueInput[] | VariantWhereUniqueInput
  disconnect?: VariantWhereUniqueInput[] | VariantWhereUniqueInput
  delete?: VariantWhereUniqueInput[] | VariantWhereUniqueInput
  update?: VariantUpdateWithWhereUniqueWithoutProductInput[] | VariantUpdateWithWhereUniqueWithoutProductInput
  upsert?: VariantUpsertWithWhereUniqueWithoutProductInput[] | VariantUpsertWithWhereUniqueWithoutProductInput
}

export interface ProductUpdateWithoutAttributesDataInput {
  name?: String
  description?: String
  SKU?: String
  displayPrice?: Float
  available?: Boolean
  imageUrl?: String
  brand?: BrandUpdateOneInput
  category?: CategoryUpdateOneInput
  options?: OptionUpdateManyInput
  unavailableOptionsValues?: OptionValueUpdateManyInput
  variants?: VariantUpdateManyWithoutProductInput
}

export interface ProductUpdateWithWhereUniqueWithoutAttributesInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutAttributesDataInput
}

export interface OrderUpdateInput {
  totalPrice?: Float
  totalRefunded?: Float
  totalTax?: Float
  orderStatus?: OrderStatus
  owner?: UserUpdateOneWithoutOrdersInput
  lineItems?: OrderLineItemUpdateManyInput
}

export interface OptionWhereUniqueInput {
  id?: ID_Input
}

export interface AttributeWhereInput {
  AND?: AttributeWhereInput[] | AttributeWhereInput
  OR?: AttributeWhereInput[] | AttributeWhereInput
  NOT?: AttributeWhereInput[] | AttributeWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  value?: String
  value_not?: String
  value_in?: String[] | String
  value_not_in?: String[] | String
  value_lt?: String
  value_lte?: String
  value_gt?: String
  value_gte?: String
  value_contains?: String
  value_not_contains?: String
  value_starts_with?: String
  value_not_starts_with?: String
  value_ends_with?: String
  value_not_ends_with?: String
  category?: CategoryWhereInput
  products_every?: ProductWhereInput
  products_some?: ProductWhereInput
  products_none?: ProductWhereInput
}

export interface VariantUpdateOneInput {
  create?: VariantCreateInput
  connect?: VariantWhereUniqueInput
  delete?: Boolean
  update?: VariantUpdateDataInput
  upsert?: VariantUpsertNestedInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface OrderableProductPreviousValues {
  id: ID_Output
  position: Int
}

/*
 * A connection to a list of items.

 */
export interface BrandConnection {
  pageInfo: PageInfo
  edges: BrandEdge[]
  aggregate: AggregateBrand
}

export interface OrderLineItemPreviousValues {
  id: ID_Output
  quantity: Int
}

export interface OrderableProduct extends Node {
  id: ID_Output
  product: Product
  position: Int
  metadataBestSale?: ShopMetadata
  metadataNewProduct?: ShopMetadata
}

export interface File extends Node {
  id: ID_Output
  name: String
  url: String
  contentType: String
  secret: String
  size: Int
}

export interface ShopMetadata extends Node {
  id: ID_Output
  bestSalesProducts?: OrderableProduct[]
  newProducts?: OrderableProduct[]
  MOTD?: String
}

/*
 * A connection to a list of items.

 */
export interface OrderableProductConnection {
  pageInfo: PageInfo
  edges: OrderableProductEdge[]
  aggregate: AggregateOrderableProduct
}

export interface AggregateOrderableProduct {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface ShopMetadataEdge {
  node: ShopMetadata
  cursor: String
}

export interface BatchPayload {
  count: Long
}

export interface AggregateOrderLineItem {
  count: Int
}

export interface OrderableProductSubscriptionPayload {
  mutation: MutationType
  node?: OrderableProduct
  updatedFields?: String[]
  previousValues?: OrderableProductPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface OrderLineItemConnection {
  pageInfo: PageInfo
  edges: OrderLineItemEdge[]
  aggregate: AggregateOrderLineItem
}

export interface Order extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  owner: User
  lineItems?: OrderLineItem[]
  totalPrice: Float
  totalRefunded: Float
  totalTax: Float
  orderStatus: OrderStatus
}

/*
 * An edge in a connection.

 */
export interface OrderEdge {
  node: Order
  cursor: String
}

export interface ShopMetadataPreviousValues {
  id: ID_Output
  MOTD?: String
}

export interface AggregateFile {
  count: Int
}

export interface BrandSubscriptionPayload {
  mutation: MutationType
  node?: Brand
  updatedFields?: String[]
  previousValues?: BrandPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface FileConnection {
  pageInfo: PageInfo
  edges: FileEdge[]
  aggregate: AggregateFile
}

export interface BrandPreviousValues {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface ShopMetadataSubscriptionPayload {
  mutation: MutationType
  node?: ShopMetadata
  updatedFields?: String[]
  previousValues?: ShopMetadataPreviousValues
}

export interface AggregateProduct {
  count: Int
}

export interface CategorySubscriptionPayload {
  mutation: MutationType
  node?: Category
  updatedFields?: String[]
  previousValues?: CategoryPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface ProductConnection {
  pageInfo: PageInfo
  edges: ProductEdge[]
  aggregate: AggregateProduct
}

export interface CategoryPreviousValues {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface AttributeEdge {
  node: Attribute
  cursor: String
}

export interface OrderLineItem extends Node {
  id: ID_Output
  quantity: Int
  variant: Variant
  owner?: User
}

export interface AggregateVariant {
  count: Int
}

export interface OptionSubscriptionPayload {
  mutation: MutationType
  node?: Option
  updatedFields?: String[]
  previousValues?: OptionPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface VariantConnection {
  pageInfo: PageInfo
  edges: VariantEdge[]
  aggregate: AggregateVariant
}

export interface OptionPreviousValues {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface SelectedOptionEdge {
  node: SelectedOption
  cursor: String
}

export interface Brand extends Node {
  id: ID_Output
  name: String
  category: Category
}

export interface AggregateOptionValue {
  count: Int
}

export interface OptionValueSubscriptionPayload {
  mutation: MutationType
  node?: OptionValue
  updatedFields?: String[]
  previousValues?: OptionValuePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface OptionValueConnection {
  pageInfo: PageInfo
  edges: OptionValueEdge[]
  aggregate: AggregateOptionValue
}

export interface OptionValuePreviousValues {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface OptionEdge {
  node: Option
  cursor: String
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  firstName?: String
  lastName?: String
  role: Role
  cart?: OrderLineItem[]
  orders?: Order[]
  stripeCustomerId?: String
}

export interface AggregateCategory {
  count: Int
}

export interface SelectedOptionSubscriptionPayload {
  mutation: MutationType
  node?: SelectedOption
  updatedFields?: String[]
  previousValues?: SelectedOptionPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface CategoryConnection {
  pageInfo: PageInfo
  edges: CategoryEdge[]
  aggregate: AggregateCategory
}

export interface SelectedOptionPreviousValues {
  id: ID_Output
}

/*
 * An edge in a connection.

 */
export interface BrandEdge {
  node: Brand
  cursor: String
}

export interface Category extends Node {
  id: ID_Output
  name: String
  options?: Option[]
}

/*
 * An edge in a connection.

 */
export interface OrderableProductEdge {
  node: OrderableProduct
  cursor: String
}

export interface VariantSubscriptionPayload {
  mutation: MutationType
  node?: Variant
  updatedFields?: String[]
  previousValues?: VariantPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface ShopMetadataConnection {
  pageInfo: PageInfo
  edges: ShopMetadataEdge[]
  aggregate: AggregateShopMetadata
}

export interface VariantPreviousValues {
  id: ID_Output
  price: Float
  available: Boolean
}

export interface AggregateOrder {
  count: Int
}

export interface SelectedOption extends Node {
  id: ID_Output
  option: Option
  variant: Variant
  value: OptionValue
}

/*
 * An edge in a connection.

 */
export interface FileEdge {
  node: File
  cursor: String
}

export interface AttributeSubscriptionPayload {
  mutation: MutationType
  node?: Attribute
  updatedFields?: String[]
  previousValues?: AttributePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface AttributePreviousValues {
  id: ID_Output
  value: String
}

export interface AggregateAttribute {
  count: Int
}

export interface Option extends Node {
  id: ID_Output
  name: String
  values?: OptionValue[]
  category: Category
}

/*
 * An edge in a connection.

 */
export interface VariantEdge {
  node: Variant
  cursor: String
}

export interface ProductSubscriptionPayload {
  mutation: MutationType
  node?: Product
  updatedFields?: String[]
  previousValues?: ProductPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface SelectedOptionConnection {
  pageInfo: PageInfo
  edges: SelectedOptionEdge[]
  aggregate: AggregateSelectedOption
}

export interface ProductPreviousValues {
  id: ID_Output
  name: String
  description?: String
  SKU?: String
  displayPrice: Float
  available: Boolean
  imageUrl?: String
}

export interface AggregateOption {
  count: Int
}

export interface OptionValue extends Node {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface CategoryEdge {
  node: Category
  cursor: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  firstName?: String
  lastName?: String
  role: Role
  stripeCustomerId?: String
}

/*
 * An edge in a connection.

 */
export interface OrderLineItemEdge {
  node: OrderLineItem
  cursor: String
}

export interface Attribute extends Node {
  id: ID_Output
  value: String
  category: Category
  products?: Product[]
}

export interface AggregateUser {
  count: Int
}

export interface FileSubscriptionPayload {
  mutation: MutationType
  node?: File
  updatedFields?: String[]
  previousValues?: FilePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface AttributeConnection {
  pageInfo: PageInfo
  edges: AttributeEdge[]
  aggregate: AggregateAttribute
}

export interface FilePreviousValues {
  id: ID_Output
  name: String
  url: String
  contentType: String
  secret: String
  size: Int
}

/*
 * An edge in a connection.

 */
export interface OptionValueEdge {
  node: OptionValue
  cursor: String
}

export interface Product extends Node {
  id: ID_Output
  name: String
  description?: String
  brand: Brand
  SKU?: String
  category: Category
  options?: Option[]
  unavailableOptionsValues?: OptionValue[]
  variants?: Variant[]
  attributes?: Attribute[]
  displayPrice: Float
  available: Boolean
  imageUrl?: String
}

export interface AggregateBrand {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface OrderConnection {
  pageInfo: PageInfo
  edges: OrderEdge[]
  aggregate: AggregateOrder
}

export interface OrderLineItemSubscriptionPayload {
  mutation: MutationType
  node?: OrderLineItem
  updatedFields?: String[]
  previousValues?: OrderLineItemPreviousValues
}

export interface Variant extends Node {
  id: ID_Output
  selectedOptions?: SelectedOption[]
  price: Float
  available: Boolean
  product: Product
}

export interface OrderPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  totalPrice: Float
  totalRefunded: Float
  totalTax: Float
  orderStatus: OrderStatus
}

export interface OrderSubscriptionPayload {
  mutation: MutationType
  node?: Order
  updatedFields?: String[]
  previousValues?: OrderPreviousValues
}

/*
 * An edge in a connection.

 */
export interface ProductEdge {
  node: Product
  cursor: String
}

export interface AggregateShopMetadata {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface OptionConnection {
  pageInfo: PageInfo
  edges: OptionEdge[]
  aggregate: AggregateOption
}

export interface AggregateSelectedOption {
  count: Int
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  brands: (args: { where?: BrandWhereInput, orderBy?: BrandOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Brand[]>
  categories: (args: { where?: CategoryWhereInput, orderBy?: CategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Category[]>
  options: (args: { where?: OptionWhereInput, orderBy?: OptionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Option[]>
  optionValues: (args: { where?: OptionValueWhereInput, orderBy?: OptionValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OptionValue[]>
  selectedOptions: (args: { where?: SelectedOptionWhereInput, orderBy?: SelectedOptionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<SelectedOption[]>
  variants: (args: { where?: VariantWhereInput, orderBy?: VariantOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Variant[]>
  attributes: (args: { where?: AttributeWhereInput, orderBy?: AttributeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Attribute[]>
  products: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Product[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  files: (args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<File[]>
  orders: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Order[]>
  orderLineItems: (args: { where?: OrderLineItemWhereInput, orderBy?: OrderLineItemOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderLineItem[]>
  shopMetadatas: (args: { where?: ShopMetadataWhereInput, orderBy?: ShopMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ShopMetadata[]>
  orderableProducts: (args: { where?: OrderableProductWhereInput, orderBy?: OrderableProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderableProduct[]>
  brand: (args: { where: BrandWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Brand | null>
  category: (args: { where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Category | null>
  option: (args: { where: OptionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Option | null>
  optionValue: (args: { where: OptionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OptionValue | null>
  selectedOption: (args: { where: SelectedOptionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<SelectedOption | null>
  variant: (args: { where: VariantWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Variant | null>
  attribute: (args: { where: AttributeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Attribute | null>
  product: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  file: (args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<File | null>
  order: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  orderLineItem: (args: { where: OrderLineItemWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderLineItem | null>
  shopMetadata: (args: { where: ShopMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<ShopMetadata | null>
  orderableProduct: (args: { where: OrderableProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderableProduct | null>
  brandsConnection: (args: { where?: BrandWhereInput, orderBy?: BrandOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<BrandConnection>
  categoriesConnection: (args: { where?: CategoryWhereInput, orderBy?: CategoryOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<CategoryConnection>
  optionsConnection: (args: { where?: OptionWhereInput, orderBy?: OptionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OptionConnection>
  optionValuesConnection: (args: { where?: OptionValueWhereInput, orderBy?: OptionValueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OptionValueConnection>
  selectedOptionsConnection: (args: { where?: SelectedOptionWhereInput, orderBy?: SelectedOptionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<SelectedOptionConnection>
  variantsConnection: (args: { where?: VariantWhereInput, orderBy?: VariantOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<VariantConnection>
  attributesConnection: (args: { where?: AttributeWhereInput, orderBy?: AttributeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<AttributeConnection>
  productsConnection: (args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ProductConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  filesConnection: (args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<FileConnection>
  ordersConnection: (args: { where?: OrderWhereInput, orderBy?: OrderOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderConnection>
  orderLineItemsConnection: (args: { where?: OrderLineItemWhereInput, orderBy?: OrderLineItemOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderLineItemConnection>
  shopMetadatasConnection: (args: { where?: ShopMetadataWhereInput, orderBy?: ShopMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ShopMetadataConnection>
  orderableProductsConnection: (args: { where?: OrderableProductWhereInput, orderBy?: OrderableProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OrderableProductConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createBrand: (args: { data: BrandCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Brand>
  createCategory: (args: { data: CategoryCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Category>
  createOption: (args: { data: OptionCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Option>
  createOptionValue: (args: { data: OptionValueCreateInput }, info?: GraphQLResolveInfo | string) => Promise<OptionValue>
  createSelectedOption: (args: { data: SelectedOptionCreateInput }, info?: GraphQLResolveInfo | string) => Promise<SelectedOption>
  createVariant: (args: { data: VariantCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Variant>
  createAttribute: (args: { data: AttributeCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Attribute>
  createProduct: (args: { data: ProductCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createFile: (args: { data: FileCreateInput }, info?: GraphQLResolveInfo | string) => Promise<File>
  createOrder: (args: { data: OrderCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  createOrderLineItem: (args: { data: OrderLineItemCreateInput }, info?: GraphQLResolveInfo | string) => Promise<OrderLineItem>
  createShopMetadata: (args: { data: ShopMetadataCreateInput }, info?: GraphQLResolveInfo | string) => Promise<ShopMetadata>
  createOrderableProduct: (args: { data: OrderableProductCreateInput }, info?: GraphQLResolveInfo | string) => Promise<OrderableProduct>
  updateBrand: (args: { data: BrandUpdateInput, where: BrandWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Brand | null>
  updateCategory: (args: { data: CategoryUpdateInput, where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Category | null>
  updateOption: (args: { data: OptionUpdateInput, where: OptionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Option | null>
  updateOptionValue: (args: { data: OptionValueUpdateInput, where: OptionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OptionValue | null>
  updateSelectedOption: (args: { data: SelectedOptionUpdateInput, where: SelectedOptionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<SelectedOption | null>
  updateVariant: (args: { data: VariantUpdateInput, where: VariantWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Variant | null>
  updateAttribute: (args: { data: AttributeUpdateInput, where: AttributeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Attribute | null>
  updateProduct: (args: { data: ProductUpdateInput, where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateFile: (args: { data: FileUpdateInput, where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<File | null>
  updateOrder: (args: { data: OrderUpdateInput, where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  updateOrderLineItem: (args: { data: OrderLineItemUpdateInput, where: OrderLineItemWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderLineItem | null>
  updateShopMetadata: (args: { data: ShopMetadataUpdateInput, where: ShopMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<ShopMetadata | null>
  updateOrderableProduct: (args: { data: OrderableProductUpdateInput, where: OrderableProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderableProduct | null>
  deleteBrand: (args: { where: BrandWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Brand | null>
  deleteCategory: (args: { where: CategoryWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Category | null>
  deleteOption: (args: { where: OptionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Option | null>
  deleteOptionValue: (args: { where: OptionValueWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OptionValue | null>
  deleteSelectedOption: (args: { where: SelectedOptionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<SelectedOption | null>
  deleteVariant: (args: { where: VariantWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Variant | null>
  deleteAttribute: (args: { where: AttributeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Attribute | null>
  deleteProduct: (args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Product | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteFile: (args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<File | null>
  deleteOrder: (args: { where: OrderWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Order | null>
  deleteOrderLineItem: (args: { where: OrderLineItemWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderLineItem | null>
  deleteShopMetadata: (args: { where: ShopMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<ShopMetadata | null>
  deleteOrderableProduct: (args: { where: OrderableProductWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<OrderableProduct | null>
  upsertBrand: (args: { where: BrandWhereUniqueInput, create: BrandCreateInput, update: BrandUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Brand>
  upsertCategory: (args: { where: CategoryWhereUniqueInput, create: CategoryCreateInput, update: CategoryUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Category>
  upsertOption: (args: { where: OptionWhereUniqueInput, create: OptionCreateInput, update: OptionUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Option>
  upsertOptionValue: (args: { where: OptionValueWhereUniqueInput, create: OptionValueCreateInput, update: OptionValueUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<OptionValue>
  upsertSelectedOption: (args: { where: SelectedOptionWhereUniqueInput, create: SelectedOptionCreateInput, update: SelectedOptionUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<SelectedOption>
  upsertVariant: (args: { where: VariantWhereUniqueInput, create: VariantCreateInput, update: VariantUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Variant>
  upsertAttribute: (args: { where: AttributeWhereUniqueInput, create: AttributeCreateInput, update: AttributeUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Attribute>
  upsertProduct: (args: { where: ProductWhereUniqueInput, create: ProductCreateInput, update: ProductUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Product>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertFile: (args: { where: FileWhereUniqueInput, create: FileCreateInput, update: FileUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<File>
  upsertOrder: (args: { where: OrderWhereUniqueInput, create: OrderCreateInput, update: OrderUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Order>
  upsertOrderLineItem: (args: { where: OrderLineItemWhereUniqueInput, create: OrderLineItemCreateInput, update: OrderLineItemUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<OrderLineItem>
  upsertShopMetadata: (args: { where: ShopMetadataWhereUniqueInput, create: ShopMetadataCreateInput, update: ShopMetadataUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<ShopMetadata>
  upsertOrderableProduct: (args: { where: OrderableProductWhereUniqueInput, create: OrderableProductCreateInput, update: OrderableProductUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<OrderableProduct>
  updateManyBrands: (args: { data: BrandUpdateInput, where?: BrandWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyCategories: (args: { data: CategoryUpdateInput, where?: CategoryWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOptions: (args: { data: OptionUpdateInput, where?: OptionWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOptionValues: (args: { data: OptionValueUpdateInput, where?: OptionValueWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManySelectedOptions: (args: { data: SelectedOptionUpdateInput, where?: SelectedOptionWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyVariants: (args: { data: VariantUpdateInput, where?: VariantWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyAttributes: (args: { data: AttributeUpdateInput, where?: AttributeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyProducts: (args: { data: ProductUpdateInput, where?: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyFiles: (args: { data: FileUpdateInput, where?: FileWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOrders: (args: { data: OrderUpdateInput, where?: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOrderLineItems: (args: { data: OrderLineItemUpdateInput, where?: OrderLineItemWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyShopMetadatas: (args: { data: ShopMetadataUpdateInput, where?: ShopMetadataWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOrderableProducts: (args: { data: OrderableProductUpdateInput, where?: OrderableProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyBrands: (args: { where?: BrandWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyCategories: (args: { where?: CategoryWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOptions: (args: { where?: OptionWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOptionValues: (args: { where?: OptionValueWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManySelectedOptions: (args: { where?: SelectedOptionWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyVariants: (args: { where?: VariantWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyAttributes: (args: { where?: AttributeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyProducts: (args: { where?: ProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyFiles: (args: { where?: FileWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOrders: (args: { where?: OrderWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOrderLineItems: (args: { where?: OrderLineItemWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyShopMetadatas: (args: { where?: ShopMetadataWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOrderableProducts: (args: { where?: OrderableProductWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  brand: (args: { where?: BrandSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<BrandSubscriptionPayload>>
  category: (args: { where?: CategorySubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<CategorySubscriptionPayload>>
  option: (args: { where?: OptionSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OptionSubscriptionPayload>>
  optionValue: (args: { where?: OptionValueSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OptionValueSubscriptionPayload>>
  selectedOption: (args: { where?: SelectedOptionSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<SelectedOptionSubscriptionPayload>>
  variant: (args: { where?: VariantSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<VariantSubscriptionPayload>>
  attribute: (args: { where?: AttributeSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<AttributeSubscriptionPayload>>
  product: (args: { where?: ProductSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ProductSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  file: (args: { where?: FileSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<FileSubscriptionPayload>>
  order: (args: { where?: OrderSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OrderSubscriptionPayload>>
  orderLineItem: (args: { where?: OrderLineItemSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OrderLineItemSubscriptionPayload>>
  shopMetadata: (args: { where?: ShopMetadataSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ShopMetadataSubscriptionPayload>>
  orderableProduct: (args: { where?: OrderableProductSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OrderableProductSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Brand: (where: BrandWhereInput): Promise<boolean> => super.existsDelegate('query', 'brands', { where }, {}, '{ id }'),
    Category: (where: CategoryWhereInput): Promise<boolean> => super.existsDelegate('query', 'categories', { where }, {}, '{ id }'),
    Option: (where: OptionWhereInput): Promise<boolean> => super.existsDelegate('query', 'options', { where }, {}, '{ id }'),
    OptionValue: (where: OptionValueWhereInput): Promise<boolean> => super.existsDelegate('query', 'optionValues', { where }, {}, '{ id }'),
    SelectedOption: (where: SelectedOptionWhereInput): Promise<boolean> => super.existsDelegate('query', 'selectedOptions', { where }, {}, '{ id }'),
    Variant: (where: VariantWhereInput): Promise<boolean> => super.existsDelegate('query', 'variants', { where }, {}, '{ id }'),
    Attribute: (where: AttributeWhereInput): Promise<boolean> => super.existsDelegate('query', 'attributes', { where }, {}, '{ id }'),
    Product: (where: ProductWhereInput): Promise<boolean> => super.existsDelegate('query', 'products', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    File: (where: FileWhereInput): Promise<boolean> => super.existsDelegate('query', 'files', { where }, {}, '{ id }'),
    Order: (where: OrderWhereInput): Promise<boolean> => super.existsDelegate('query', 'orders', { where }, {}, '{ id }'),
    OrderLineItem: (where: OrderLineItemWhereInput): Promise<boolean> => super.existsDelegate('query', 'orderLineItems', { where }, {}, '{ id }'),
    ShopMetadata: (where: ShopMetadataWhereInput): Promise<boolean> => super.existsDelegate('query', 'shopMetadatas', { where }, {}, '{ id }'),
    OrderableProduct: (where: OrderableProductWhereInput): Promise<boolean> => super.existsDelegate('query', 'orderableProducts', { where }, {}, '{ id }')
  }

  query: Query = {
    brands: (args, info): Promise<Brand[]> => super.delegate('query', 'brands', args, {}, info),
    categories: (args, info): Promise<Category[]> => super.delegate('query', 'categories', args, {}, info),
    options: (args, info): Promise<Option[]> => super.delegate('query', 'options', args, {}, info),
    optionValues: (args, info): Promise<OptionValue[]> => super.delegate('query', 'optionValues', args, {}, info),
    selectedOptions: (args, info): Promise<SelectedOption[]> => super.delegate('query', 'selectedOptions', args, {}, info),
    variants: (args, info): Promise<Variant[]> => super.delegate('query', 'variants', args, {}, info),
    attributes: (args, info): Promise<Attribute[]> => super.delegate('query', 'attributes', args, {}, info),
    products: (args, info): Promise<Product[]> => super.delegate('query', 'products', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    files: (args, info): Promise<File[]> => super.delegate('query', 'files', args, {}, info),
    orders: (args, info): Promise<Order[]> => super.delegate('query', 'orders', args, {}, info),
    orderLineItems: (args, info): Promise<OrderLineItem[]> => super.delegate('query', 'orderLineItems', args, {}, info),
    shopMetadatas: (args, info): Promise<ShopMetadata[]> => super.delegate('query', 'shopMetadatas', args, {}, info),
    orderableProducts: (args, info): Promise<OrderableProduct[]> => super.delegate('query', 'orderableProducts', args, {}, info),
    brand: (args, info): Promise<Brand | null> => super.delegate('query', 'brand', args, {}, info),
    category: (args, info): Promise<Category | null> => super.delegate('query', 'category', args, {}, info),
    option: (args, info): Promise<Option | null> => super.delegate('query', 'option', args, {}, info),
    optionValue: (args, info): Promise<OptionValue | null> => super.delegate('query', 'optionValue', args, {}, info),
    selectedOption: (args, info): Promise<SelectedOption | null> => super.delegate('query', 'selectedOption', args, {}, info),
    variant: (args, info): Promise<Variant | null> => super.delegate('query', 'variant', args, {}, info),
    attribute: (args, info): Promise<Attribute | null> => super.delegate('query', 'attribute', args, {}, info),
    product: (args, info): Promise<Product | null> => super.delegate('query', 'product', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    file: (args, info): Promise<File | null> => super.delegate('query', 'file', args, {}, info),
    order: (args, info): Promise<Order | null> => super.delegate('query', 'order', args, {}, info),
    orderLineItem: (args, info): Promise<OrderLineItem | null> => super.delegate('query', 'orderLineItem', args, {}, info),
    shopMetadata: (args, info): Promise<ShopMetadata | null> => super.delegate('query', 'shopMetadata', args, {}, info),
    orderableProduct: (args, info): Promise<OrderableProduct | null> => super.delegate('query', 'orderableProduct', args, {}, info),
    brandsConnection: (args, info): Promise<BrandConnection> => super.delegate('query', 'brandsConnection', args, {}, info),
    categoriesConnection: (args, info): Promise<CategoryConnection> => super.delegate('query', 'categoriesConnection', args, {}, info),
    optionsConnection: (args, info): Promise<OptionConnection> => super.delegate('query', 'optionsConnection', args, {}, info),
    optionValuesConnection: (args, info): Promise<OptionValueConnection> => super.delegate('query', 'optionValuesConnection', args, {}, info),
    selectedOptionsConnection: (args, info): Promise<SelectedOptionConnection> => super.delegate('query', 'selectedOptionsConnection', args, {}, info),
    variantsConnection: (args, info): Promise<VariantConnection> => super.delegate('query', 'variantsConnection', args, {}, info),
    attributesConnection: (args, info): Promise<AttributeConnection> => super.delegate('query', 'attributesConnection', args, {}, info),
    productsConnection: (args, info): Promise<ProductConnection> => super.delegate('query', 'productsConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    filesConnection: (args, info): Promise<FileConnection> => super.delegate('query', 'filesConnection', args, {}, info),
    ordersConnection: (args, info): Promise<OrderConnection> => super.delegate('query', 'ordersConnection', args, {}, info),
    orderLineItemsConnection: (args, info): Promise<OrderLineItemConnection> => super.delegate('query', 'orderLineItemsConnection', args, {}, info),
    shopMetadatasConnection: (args, info): Promise<ShopMetadataConnection> => super.delegate('query', 'shopMetadatasConnection', args, {}, info),
    orderableProductsConnection: (args, info): Promise<OrderableProductConnection> => super.delegate('query', 'orderableProductsConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createBrand: (args, info): Promise<Brand> => super.delegate('mutation', 'createBrand', args, {}, info),
    createCategory: (args, info): Promise<Category> => super.delegate('mutation', 'createCategory', args, {}, info),
    createOption: (args, info): Promise<Option> => super.delegate('mutation', 'createOption', args, {}, info),
    createOptionValue: (args, info): Promise<OptionValue> => super.delegate('mutation', 'createOptionValue', args, {}, info),
    createSelectedOption: (args, info): Promise<SelectedOption> => super.delegate('mutation', 'createSelectedOption', args, {}, info),
    createVariant: (args, info): Promise<Variant> => super.delegate('mutation', 'createVariant', args, {}, info),
    createAttribute: (args, info): Promise<Attribute> => super.delegate('mutation', 'createAttribute', args, {}, info),
    createProduct: (args, info): Promise<Product> => super.delegate('mutation', 'createProduct', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createFile: (args, info): Promise<File> => super.delegate('mutation', 'createFile', args, {}, info),
    createOrder: (args, info): Promise<Order> => super.delegate('mutation', 'createOrder', args, {}, info),
    createOrderLineItem: (args, info): Promise<OrderLineItem> => super.delegate('mutation', 'createOrderLineItem', args, {}, info),
    createShopMetadata: (args, info): Promise<ShopMetadata> => super.delegate('mutation', 'createShopMetadata', args, {}, info),
    createOrderableProduct: (args, info): Promise<OrderableProduct> => super.delegate('mutation', 'createOrderableProduct', args, {}, info),
    updateBrand: (args, info): Promise<Brand | null> => super.delegate('mutation', 'updateBrand', args, {}, info),
    updateCategory: (args, info): Promise<Category | null> => super.delegate('mutation', 'updateCategory', args, {}, info),
    updateOption: (args, info): Promise<Option | null> => super.delegate('mutation', 'updateOption', args, {}, info),
    updateOptionValue: (args, info): Promise<OptionValue | null> => super.delegate('mutation', 'updateOptionValue', args, {}, info),
    updateSelectedOption: (args, info): Promise<SelectedOption | null> => super.delegate('mutation', 'updateSelectedOption', args, {}, info),
    updateVariant: (args, info): Promise<Variant | null> => super.delegate('mutation', 'updateVariant', args, {}, info),
    updateAttribute: (args, info): Promise<Attribute | null> => super.delegate('mutation', 'updateAttribute', args, {}, info),
    updateProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'updateProduct', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateFile: (args, info): Promise<File | null> => super.delegate('mutation', 'updateFile', args, {}, info),
    updateOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'updateOrder', args, {}, info),
    updateOrderLineItem: (args, info): Promise<OrderLineItem | null> => super.delegate('mutation', 'updateOrderLineItem', args, {}, info),
    updateShopMetadata: (args, info): Promise<ShopMetadata | null> => super.delegate('mutation', 'updateShopMetadata', args, {}, info),
    updateOrderableProduct: (args, info): Promise<OrderableProduct | null> => super.delegate('mutation', 'updateOrderableProduct', args, {}, info),
    deleteBrand: (args, info): Promise<Brand | null> => super.delegate('mutation', 'deleteBrand', args, {}, info),
    deleteCategory: (args, info): Promise<Category | null> => super.delegate('mutation', 'deleteCategory', args, {}, info),
    deleteOption: (args, info): Promise<Option | null> => super.delegate('mutation', 'deleteOption', args, {}, info),
    deleteOptionValue: (args, info): Promise<OptionValue | null> => super.delegate('mutation', 'deleteOptionValue', args, {}, info),
    deleteSelectedOption: (args, info): Promise<SelectedOption | null> => super.delegate('mutation', 'deleteSelectedOption', args, {}, info),
    deleteVariant: (args, info): Promise<Variant | null> => super.delegate('mutation', 'deleteVariant', args, {}, info),
    deleteAttribute: (args, info): Promise<Attribute | null> => super.delegate('mutation', 'deleteAttribute', args, {}, info),
    deleteProduct: (args, info): Promise<Product | null> => super.delegate('mutation', 'deleteProduct', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteFile: (args, info): Promise<File | null> => super.delegate('mutation', 'deleteFile', args, {}, info),
    deleteOrder: (args, info): Promise<Order | null> => super.delegate('mutation', 'deleteOrder', args, {}, info),
    deleteOrderLineItem: (args, info): Promise<OrderLineItem | null> => super.delegate('mutation', 'deleteOrderLineItem', args, {}, info),
    deleteShopMetadata: (args, info): Promise<ShopMetadata | null> => super.delegate('mutation', 'deleteShopMetadata', args, {}, info),
    deleteOrderableProduct: (args, info): Promise<OrderableProduct | null> => super.delegate('mutation', 'deleteOrderableProduct', args, {}, info),
    upsertBrand: (args, info): Promise<Brand> => super.delegate('mutation', 'upsertBrand', args, {}, info),
    upsertCategory: (args, info): Promise<Category> => super.delegate('mutation', 'upsertCategory', args, {}, info),
    upsertOption: (args, info): Promise<Option> => super.delegate('mutation', 'upsertOption', args, {}, info),
    upsertOptionValue: (args, info): Promise<OptionValue> => super.delegate('mutation', 'upsertOptionValue', args, {}, info),
    upsertSelectedOption: (args, info): Promise<SelectedOption> => super.delegate('mutation', 'upsertSelectedOption', args, {}, info),
    upsertVariant: (args, info): Promise<Variant> => super.delegate('mutation', 'upsertVariant', args, {}, info),
    upsertAttribute: (args, info): Promise<Attribute> => super.delegate('mutation', 'upsertAttribute', args, {}, info),
    upsertProduct: (args, info): Promise<Product> => super.delegate('mutation', 'upsertProduct', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertFile: (args, info): Promise<File> => super.delegate('mutation', 'upsertFile', args, {}, info),
    upsertOrder: (args, info): Promise<Order> => super.delegate('mutation', 'upsertOrder', args, {}, info),
    upsertOrderLineItem: (args, info): Promise<OrderLineItem> => super.delegate('mutation', 'upsertOrderLineItem', args, {}, info),
    upsertShopMetadata: (args, info): Promise<ShopMetadata> => super.delegate('mutation', 'upsertShopMetadata', args, {}, info),
    upsertOrderableProduct: (args, info): Promise<OrderableProduct> => super.delegate('mutation', 'upsertOrderableProduct', args, {}, info),
    updateManyBrands: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyBrands', args, {}, info),
    updateManyCategories: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyCategories', args, {}, info),
    updateManyOptions: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOptions', args, {}, info),
    updateManyOptionValues: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOptionValues', args, {}, info),
    updateManySelectedOptions: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManySelectedOptions', args, {}, info),
    updateManyVariants: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyVariants', args, {}, info),
    updateManyAttributes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyAttributes', args, {}, info),
    updateManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyProducts', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyFiles: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyFiles', args, {}, info),
    updateManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOrders', args, {}, info),
    updateManyOrderLineItems: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOrderLineItems', args, {}, info),
    updateManyShopMetadatas: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyShopMetadatas', args, {}, info),
    updateManyOrderableProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOrderableProducts', args, {}, info),
    deleteManyBrands: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyBrands', args, {}, info),
    deleteManyCategories: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyCategories', args, {}, info),
    deleteManyOptions: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOptions', args, {}, info),
    deleteManyOptionValues: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOptionValues', args, {}, info),
    deleteManySelectedOptions: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManySelectedOptions', args, {}, info),
    deleteManyVariants: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyVariants', args, {}, info),
    deleteManyAttributes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyAttributes', args, {}, info),
    deleteManyProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyProducts', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyFiles: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyFiles', args, {}, info),
    deleteManyOrders: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOrders', args, {}, info),
    deleteManyOrderLineItems: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOrderLineItems', args, {}, info),
    deleteManyShopMetadatas: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyShopMetadatas', args, {}, info),
    deleteManyOrderableProducts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOrderableProducts', args, {}, info)
  }

  subscription: Subscription = {
    brand: (args, infoOrQuery): Promise<AsyncIterator<BrandSubscriptionPayload>> => super.delegateSubscription('brand', args, {}, infoOrQuery),
    category: (args, infoOrQuery): Promise<AsyncIterator<CategorySubscriptionPayload>> => super.delegateSubscription('category', args, {}, infoOrQuery),
    option: (args, infoOrQuery): Promise<AsyncIterator<OptionSubscriptionPayload>> => super.delegateSubscription('option', args, {}, infoOrQuery),
    optionValue: (args, infoOrQuery): Promise<AsyncIterator<OptionValueSubscriptionPayload>> => super.delegateSubscription('optionValue', args, {}, infoOrQuery),
    selectedOption: (args, infoOrQuery): Promise<AsyncIterator<SelectedOptionSubscriptionPayload>> => super.delegateSubscription('selectedOption', args, {}, infoOrQuery),
    variant: (args, infoOrQuery): Promise<AsyncIterator<VariantSubscriptionPayload>> => super.delegateSubscription('variant', args, {}, infoOrQuery),
    attribute: (args, infoOrQuery): Promise<AsyncIterator<AttributeSubscriptionPayload>> => super.delegateSubscription('attribute', args, {}, infoOrQuery),
    product: (args, infoOrQuery): Promise<AsyncIterator<ProductSubscriptionPayload>> => super.delegateSubscription('product', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    file: (args, infoOrQuery): Promise<AsyncIterator<FileSubscriptionPayload>> => super.delegateSubscription('file', args, {}, infoOrQuery),
    order: (args, infoOrQuery): Promise<AsyncIterator<OrderSubscriptionPayload>> => super.delegateSubscription('order', args, {}, infoOrQuery),
    orderLineItem: (args, infoOrQuery): Promise<AsyncIterator<OrderLineItemSubscriptionPayload>> => super.delegateSubscription('orderLineItem', args, {}, infoOrQuery),
    shopMetadata: (args, infoOrQuery): Promise<AsyncIterator<ShopMetadataSubscriptionPayload>> => super.delegateSubscription('shopMetadata', args, {}, infoOrQuery),
    orderableProduct: (args, infoOrQuery): Promise<AsyncIterator<OrderableProductSubscriptionPayload>> => super.delegateSubscription('orderableProduct', args, {}, infoOrQuery)
  }
}