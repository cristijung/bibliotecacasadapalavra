
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// obtémo caminho do diretório raiz para que o Jest saiba onde está o projeto
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jestConfig = {
  // config do SWC como o compilador para arquivos Ts e JSX
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['@swc/jest'],
  },

  // o ambiente de teste para simular o navegador
  testEnvironment: 'jest-environment-jsdom',

  // config o arquivo de setup que injeta os matchers da RTL
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // os mocks para lidar com arquivos não js
  moduleNameMapper: {
    // mocks para CSS/SCSS
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
    // mapeia os aliases de caminho (ex: '@/components' -> './components') e assim por diante
    '^@/(.*)$': '<rootDir>/$1',
  },

  // os diretórios para ignorar nos testes
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  
  // definição o diretório raiz para o Jest
  rootDir: __dirname,

  // extensões de arquivos que o Jest deve procurar
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default jestConfig;