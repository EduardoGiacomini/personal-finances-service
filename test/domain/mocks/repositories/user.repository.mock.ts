const user = {
  _id: "507f191e810c19729de860ea",
  name: "John",
  email: "john@gmail.com",
  phone: "99999999999",
  password: "encrypted",
  active: true,
  createdAt: new Date(2022, 1, 1),
  updatedAt: new Date(2022, 11, 1),
};

export const UserRepositoryMock = {
  user,
  createUser: jest.fn().mockReturnValue(Promise.resolve(user)),
  getByEmail: jest.fn().mockReturnValue(Promise.resolve(user)),
  getById: jest.fn().mockReturnValue(Promise.resolve(user)),
};
