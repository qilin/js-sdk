module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    window: {
      location: { href: '/' },
      addEventListener: () => { },
      parent: {},
      fetch: () => { },
    },
  },
  // automock: false,
  // setupFiles: [
  //   './setupJest.ts',
  // ],
};
