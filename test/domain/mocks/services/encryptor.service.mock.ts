export const EncryptorServiceMock = {
  encrypt: jest.fn().mockReturnValue(Promise.resolve("encrypted")),
  compare: jest.fn().mockReturnValue(Promise.resolve(true)),
};
