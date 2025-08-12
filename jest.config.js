// O arquivo jest.config.mjs 
import nextJest from 'next/jest';

// caminho para o componente pai do Next.Js
const createJestConfig = nextJest({
  dir: './',
});

// add qualquer configuração customizada que precisamos passar para o Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig é exportado para que o next/jest possa carregar a config do Next.js
export default createJestConfig(customJestConfig);