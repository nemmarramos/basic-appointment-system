/* eslint-disable no-undef */
// testing library
// our first file that exports the function that creates a new apollo server
const argon2 = require('argon2');
const createServer = require('../graphql/server');

const { mockStore: authMockStore } = require('../datasources/__tests__/user');
const {
  mockStore: appointmentMockStore,
} = require('../datasources/__tests__/appoinment');

describe('GraphQL Mutations', () => {
  const LOGIN = `
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        success
        message
        data {
          token
          user {
            id
            username
            email
            firstName
            lastName
            avatar
          }
        }
      }
    }
  `;

  test('login() - user login should log in successfully', async () => {
    const { server, authAPI } = createServer();

    authAPI.store = authMockStore;

    authAPI.store.User.findOne.mockReturnValueOnce({
      id: 1,
      username: 'u123',
      password: await argon2.hash('password'),
    });

    const response = await server.executeOperation({
      query: LOGIN,
      variables: {
        username: 'u123',
        password: 'password',
      },
    });

    expect(response.data.login.success).toEqual(true);
    expect(response.data.login.data.token).not.toBeNull();
  });

  test('login() - user login should fail when using wrong credentials', async () => {
    // create a new instance of our server (not listening on any port)
    const { server, authAPI } = createServer();

    authAPI.store = authMockStore;
    authAPI.store.User.findOne.mockReturnValueOnce({
      id: 1,
      username: 'u123',
      password: await argon2.hash('password'),
    });

    const response = await server.executeOperation({
      query: LOGIN,
      variables: {
        username: 'u123',
        password: 'password123',
      },
    });

    expect(response.data.login.success).toEqual(false);
    expect(response.data.login.data).toBeNull();
    expect(response.data.login.message).toEqual('Invalid username or password');
  });

  test('bookAppointment() - user should successfully book an appointment', async () => {
    const { server, appointmentAPI } = createServer({
      context: () => ({ user: { id: 1, email: 'a@a.a' } }),
    });

    // graphl query
    const BOOK_APPOINTMENT = `
      mutation BookAppointment($input: AppointmentInput!) {
        bookAppointment(input: $input) {
          id
          refCode
          concern
          medicalHistory
          scheduleDate
          scheduleTime
          createdAt
        }
      }
  `;

    const mockAppointmentResponse = {
      id: 1,
      medicalHistory: 'medicalHistory',
      scheduleDate: '05-16-2022',
      scheduleTime: '08:00',
      requestedUserId: 2,
      concern: 'tesadas',
      createdBy: 1,
    };

    appointmentAPI.store = appointmentMockStore;
    appointmentAPI.store.Appointment.create.mockReturnValueOnce({
      dataValues: mockAppointmentResponse,
    });

    const response = await server.executeOperation({
      query: BOOK_APPOINTMENT,
      variables: {
        input: {
          medicalHistory: 'medicalHistory',
          scheduleDate: '05-16-2022',
          scheduleTime: '08:00',
          requestedUserId: 1,
          concern: 'tesadas',
        },
      },
    });

    expect(response).toMatchSnapshot();
  });
});
