const webix = {
  message: jest.fn((msg) => console.log("Mocked Webix Message:", msg)),
  $$: jest.fn((id) => ({
    getValue: jest.fn(() => 1), // Default value for switches
    setValue: jest.fn(),
    attachEvent: jest.fn(),
  })),
};

module.exports = webix;
