global.fetch = jest.fn();
global.localStorage = {
  getItem: jest.fn(() => "dummy-token"),
};