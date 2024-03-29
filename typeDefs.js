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
    linkedPropsGet(ex_id: String): LinkedProps
    randomedLinkedPropsGet(course_id: String): LinkedPropsRandomized
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
    studentDelete(_id: String): String
    exDelete(_id: String): String
    tagAdd(tags: [TagInput]): [Tag]
    wordAdd(word: WordInput): String
    holeTextAdd(
      title: String
      description: String
      parsedText: [[String]]
      holes: [HoleInput]
    ): String
    linkedPropsAdd(
      title: String
      description: String
      words: [LinkedPropInput]
    ): String
    liveExerciceChange(
      course_id: String
      ex_id: String
      isOn: Boolean
      type: String
      mathLive: Boolean
    ): String
    liveHoleTextRespond(course_id: String, holes: [HoleInput]): String
    liveLinkedPropsRespond(
      course_id: String
      theWordsLeft: [RandomedLinkedPropInput]
      theWordsRight: [RandomedLinkedPropInput]
      links: [LinkInput]
    ): String
    liveMathChange(course_id: String, string: String): String
  }
  type Subscription {
    liveExerciceGet(course_id: String): LiveExercice
    liveHoleTextGet(course_id: String): HoleText
    liveLinkedPropsGet(course_id: String): LinkedPropsRandomized
    liveMathGet(course_id: String): String
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
    liveMath: String
    liveExercice: LiveExercice
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
    mathLive: Boolean
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
  type LinkedProps {
    _id: String
    title: String
    description: String
    words: [LinkedProp]
  }
  input LinkedPropsInput {
    title: String
    description: String
    words: [LinkedPropsInput]
  }
  type LinkedProp {
    _id: String
    proposition: String
    solution: String
  }
  input LinkedPropInput {
    proposition: String
    solution: String
  }
  type LinkedPropsRandomized {
    title: String
    description: String
    theWordsLeft: [RandomedLinkedProp]
    theWordsRight: [RandomedLinkedProp]
    links: [Link]
  }
  input LinkedPropsRandomizedInput {
    title: String
    description: String
    theWords: [RandomedLinkedPropInput]
    links: [LinkInput]
  }
  type RandomedLinkedProp {
    value: String
    position: Int
    try: String
    match: Int
  }
  input RandomedLinkedPropInput {
    value: String
    position: Int
    try: String
    match: Int
  }
  type Link {
    left: RandomedLinkedProp
    leftIndex: Int
    right: RandomedLinkedProp
    rightIndex: Int
  }
  input LinkInput {
    left: RandomedLinkedPropInput
    leftIndex: Int
    right: RandomedLinkedPropInput
    rightIndex: Int
  }
`;

module.exports = typeDefs;
