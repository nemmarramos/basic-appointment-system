const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: ID
    username: String
    email: String
    firstName: String
    lastName: String
    avatar: String
  }

  type AuthUser {
    token: String
    user: User
  }

  type LoginResult {
    success: Boolean!
    message: String
    data: AuthUser
  }

  type DoctorListResult {
    page: Int
    pageSize: Int
    count: Int
    rows: [User]
  }

  type Appointment {
    id: ID!
    refCode: String
    concern: String
    medicalHistory: String
    scheduleDate: String
    scheduleTime: String
    requestedUser: User
    createdAt: String
  }

  input AppointmentInput {
    concern: String
    medicalHistory: String
    scheduleDate: String
    scheduleTime: String
    requestedUserId: ID!
  }

  type AppointmentListResult {
    page: Int
    pageSize: Int
    count: Int
    rows: [Appointment]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    doctors(page: Int!, pageSize: Int): DoctorListResult
    myAppointments(page: Int!, pageSize: Int): AppointmentListResult
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult
    bookAppointment(input: AppointmentInput!): Appointment
    deleteAppointment(id: ID): Boolean
  }
`;

module.exports = {
  typeDefs,
};
