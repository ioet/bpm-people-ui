module.exports = {


  setupFiles: ['./src/__test__/jest.setup.js'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  transform: {

    '.*': '<rootDir>/node_modules/babel-jest',

  },

};
