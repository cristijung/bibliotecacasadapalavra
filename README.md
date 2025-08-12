# Biblioteca Casa Da Palavra
## Projeto Modelo - Vem Ser 16

![Logotipo da Biblioteca](./public/logo_bi.png)

### Tecnologias
- React 19
- Next.Js 15
- Tailwind
- Sass: `npm install sass --save-dev`
- ReactHookForm: `npm install react-hook-form`
- Resolvers: `npm install zod @hookform/resolvers` --> Lib para validação de forms
- React Icons: `npm install react-icons`
- Testes - Jest e Testing Library: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom`
<br/>
Ainda usei: `npm install --save-dev @swc/jest identity-obj-proxy`
<br/> Porque deu problema de dependências na transpilação do Js moderno

## Na Parte de Testes Unitários:
### O que é o SWC?

O SWC (sigla para Speedy Web Compiler) é um `compilador de JavaScript e TypeScript de alta performance`, escrito na linguagem de programação Rust.

Ele é uma alternativa moderna e extremamente rápida ao Babel, que é a ferramenta mais tradicional para a mesma função.

Neste caso específico, a principal função do SWC é pegar nosso código JavaScript/TypeScript mais moderno (que usa recursos como JSX, arrow functions, e a sintaxe import/export) e transformá-lo em um código JavaScript que os navegadores e ambientes de execução (como o Node.js e, no nosso caso, o Jest) conseguem entender e rodar.

#### Por que ele é tão importante?
O grande diferencial do SWC é a sua velocidade. Por ser escrito em Rust, ele consegue compilar o código em segundos, enquanto o Babel pode levar minutos em projetos maiores. Essa velocidade é crucial para reduzir o tempo de "build" e o tempo de "hot reload" durante o desenvolvimento.

No nosso caso, ele foi essencial para os testes unitários no React/Next para:

- Transformar o JSX: O SWC pegou a sua sintaxe JSX no componente Footer.tsx e a transformou em chamadas de função do React, algo que o ambiente de testes consegue executar.
- Resolver o erro: A configuração que adicionamos no arquivo .swcrc instruiu o SWC a usar o "New JSX Transform", o que automaticamente injetou a dependência do React nos seus componentes, resolvendo o `ReferenceError: React is not defined`.

