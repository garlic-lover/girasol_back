const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    tokenConnect(token: String): User
    get(objectType: String!, _id: ID): [Object]
    tagsGet(lang: String): [Tag]
    wordsGet(lang: String, tag: String): [Word]
  }
  type Mutation {
    signin(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      dateOfBirth: String
      myLanguage: String
      learnedLanguage: String
    ): AuthReturn
    login(email: String!, password: String!): AuthReturn
    profileUpdate(
      email: String
      currentPassword: String
      password: String
      firstName: String
      lastName: String
      dateOfBirth: String
    ): AuthReturn
    tagAdd(tags: [TagInput]): [Tag]
    wordAdd(word: WordInput): String
  }
  type AuthReturn {
    status: String
    token: String
    user: User
  }
  input UserInput {
    _id: ID
    firstName: String
    lastName: String
    dateOfBirth: String
    email: String
    address: AddressInput
    billingAddress: AddressInput
    token: String
    myLanguage: String
    learnedLanguage: String
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    dateOfBirth: String
    email: String
    address: Address
    billingAddress: Address
    token: String
    cardData: CreditCard
    myLanguage: String
    learnedLanguage: String
  }
  type Address {
    firstName: String!
    lastName: String!
    address: String!
    postalCode: String!
    city: String!
    country: String!
  }
  input AddressInput {
    firstName: String!
    lastName: String!
    address: String!
    postalCode: String!
    city: String!
    country: String!
  }
  interface Object {
    _id: ID
    name: String
    description: [String]
  }
  type CreditCard {
    brand: String
    last4: String
  }
  type Word {
    lang: String
    gender: String
    type: String
    value: String
    trads: Trad
    tags: [Tag]
    firstLetter: String
  }
  input WordInput {
    lang: String
    gender: String
    type: String
    value: String
    trads: TradInput
    tags: [String]
    firstLetter: String
  }
  type Trad {
    lang: String
    es: [String]
    fr: [String]
    en: [String]
  }
  input TradInput {
    lang: String
    value: [String]
  }
  type Tag {
    _id: ID
    lang: String
    name: String
  }
  input TagInput {
    lang: String
    name: String
  }
`;

module.exports = typeDefs;
