const AppointmentAPI = require('../appointment');

const mockStore = {
  Appointment: {
    create: jest.fn(),
    findAll: jest.fn(),
    findAndCountAll: jest.fn(),
    destroy: jest.fn(),
  },
};

module.exports.mockStore = mockStore;

const api = new AppointmentAPI({ store: mockStore });
api.initialize({ context: { user: { id: 1, email: 'a@a.a' } } });

describe('AppointmentAPI - create()', () => {
  test('user should successfully create an appointment', async () => {
    const mockedResult = {
      id: '9',
      refCode: 'mjzeej',
      concern: 'concern123',
      medicalHistory: 'medhistory1234',
      scheduleDate: '05-16-2022',
      scheduleTime: '08:00',
      createdAt: '05-16-2022 23:00',
    };
    mockStore.Appointment.create.mockReturnValueOnce({
      dataValues: mockedResult,
    });
    const res = await api.create({
      concern: 'concern123',
      medicalHistory: 'medhistory1234',
      scheduleDate: '05-16-2022',
      scheduleTime: '08:00',
      requestedUserId: 1,
    });

    expect(res).toEqual(mockedResult);
  });
});

describe('AppointmentAPI - myAppointments()', () => {
  test('user should fetch his appointments', async () => {
    const args = {
      page: 1,
      pageSize: 2,
    };
    const mockedResult = {
      page: 1,
      pageSize: 2,
      count: 11,
      rows: [
        {
          id: '11',
          concern: '1231',
          medicalHistory: '123123',
          scheduleDate: '2022-05-15',
          scheduleTime: '08:00:00',
          requestedUser: null,
        },
        {
          id: '10',
          concern: null,
          medicalHistory: null,
          scheduleDate: '2022-05-15',
          scheduleTime: '08:00:00',
          requestedUser: null,
        },
      ],
    };
    mockStore.Appointment.findAndCountAll.mockReturnValueOnce(mockedResult);

    const res = await api.myAppointments(args);
    expect(res).toEqual(mockedResult);
    expect(mockStore.Appointment.findAndCountAll).toBeCalledWith(
      expect.objectContaining({
        where: {
          createdBy: 1,
        },
        offset: (args.page - 1) * args.pageSize,
        limit: args.pageSize,
        include: ['requestedUser'],
      }),
    );
  });

  test('user should be able to delete an appointment', async () => {
    const args = 1;

    mockStore.Appointment.destroy.mockReturnValueOnce(1);

    const res = await api.delete(args);
    expect(res).toEqual(true);
    expect(mockStore.Appointment.destroy).toBeCalledWith(
      expect.objectContaining({
        where: {
          id: 1,
        },
      }),
    );
  });
});
