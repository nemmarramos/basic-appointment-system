/* eslint-disable jest/no-export */
const UserAPI = require('../user');

const mockStore = {
  User: {
    findOrCreate: jest.fn(),
    findAndCountAll: jest.fn(),
    findOne: jest.fn(),
  },
  Group: {
    findOrCreate: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
  },
};

const ds = new UserAPI({ store: mockStore });

describe('UserAPI - get doctors list', () => {
  test('get all doctors', async () => {
    const args = { page: 1, pageSize: 2 };
    const mockedResult = {
      ...args,
      count: 12,
      rows: [
        {
          id: '19',
          username: 'leonora.runolfsdottir',
          email: 'leonora.runolfsdottir@email.com',
          firstName: 'Leonora',
          lastName: 'Runolfsdottir',
          avatar:
            'https://robohash.org/suntinventoresaepe.png?size=300x300&set=set1',
        },
        {
          id: '20',
          username: "vanita.o'connell",
          email: "vanita.o'connell@email.com",
          firstName: 'Vanita',
          lastName: "O'Connell",
          avatar:
            'https://robohash.org/adipiscinobisquia.png?size=300x300&set=set1',
        },
      ],
    };
    mockStore.User.findAndCountAll.mockReturnValueOnce(mockedResult);

    const res = await ds.getPaginatedDoctors(args);
    expect(res).toEqual(mockedResult);
    expect(mockStore.User.findAndCountAll).toBeCalledWith(
      expect.objectContaining({
        offset: (args.page - 1) * args.pageSize,
        limit: args.pageSize,
        where: {
          '$groups.code$': 'DOCTOR',
        },
      }),
    );
  });
});

module.exports.mockStore = mockStore;
