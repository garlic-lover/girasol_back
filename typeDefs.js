const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    connect: User
    get(objectType: String!, _id: ID): [Object]
    tagsGet(lang: String): [Tag]
    wordsGet(lang: String, tag: TagInput): [Word]
    exercicesGet: [Exercice]
    pendingStudentsGet: [Course]
    studentsGet: [Course]
    courseGet(_id: String!): Course
    holeTextGet(ex_id: String): HoleText
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
      courseName: String
      isProf: Boolean
      code: String
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
    studentCreate: String
    tagAdd(tags: [TagInput]): [Tag]
    wordAdd(word: WordInput): String
    holeTextAdd(
      title: String
      description: String
      parsedText: [[String]]
      holes: [HoleInput]
    ): String
    liveExerciceChange(course_id: String, ex_id: String, isOn: Boolean): String
    liveHoleTextRespond(course_id: String, holes: [HoleInput]): String
  }
  type Subscription {
    liveExerciceGet(course_id: String): LiveExercice
    liveHoleTextGet(course_id: String): HoleText
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
    connectedStatus: Boolean
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
    isProf: Boolean
    courses: [Course]
    students: [Student]
  }
  type Address {
    firstName: String!
    lastName: String!
    address: String!
    postalCode: String!
    city: String!
    country: String!
  }
  type Professor {
    _id: String
    courseName: String
    firstName: String
    lastName: String
  }
  type Student {
    _id: String
    firstName: String
    lastName: String
  }
  type Course {
    _id: ID
    name: String
    studentName: String
    professorName: String
    code: String
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
    _id: String
    lang: String
    name: String
  }
  type Exercice {
    _id: String
    title: String
    type: String
  }
  type LiveExercice {
    ex_id: String
    isOn: Boolean
    type: String
  }
  input HoleTextInput {
    title: String
    description: String
    parsedText: [[String]]
    holes: [HoleInput]
  }
  type HoleText {
    title: String
    description: String
    parsedText: [[String]]
    holes: [Hole]
  }
  type Hole {
    word: String
    index: String
    tip: String
    response: String
  }
  input HoleInput {
    word: String
    index: String
    tip: String
    response: String
  }
`;

module.exports = typeDefs;
