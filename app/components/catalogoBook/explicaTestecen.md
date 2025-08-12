## Cenário inicial do Teste

### CardCatalogo
O componente CardCatalogo, possui várias interações e possui dependências externas, precisamos de uma estratégia de testes que envolva o uso de mocks.

1. A chave aqui é mockar os custom hooks (useFavorite e useCart) e os componentes externos (next/image, next/link, react-icons) para isolar o comportamento do CardCatalogo.
2. No código para o teste, cobrindo os principais cenários necessários:
- A renderização inicial com os dados do livro.
- O comportamento dos botões de favorito e carrinho em ambos os estados (ativo e inativo).
- A verificação dos cliques e das funções de toggle.

### CatalogoBooks
O componente CatalogoBooks é um Server Component assíncrono responsável por:
- Ler dados: Ele lê o conteúdo de um arquivo JSON (bookscat.json) do sistema de arquivos usando fs.readFile.
- Processar dados: Analisa o JSON lido para convertê-lo em um array de objetos Book.
- Renderizar: Exibe um título, um subtítulo e, para cada livro nos dados, renderiza um componente CardCatalogo, passando os dados do livro como uma prop.

#### Cenário de Testes
1. O cenário de testes para CatalogoBooks se concentra em garantir que o componente se comporte corretamente, dadas as suas dependências externas. As principais preocupações são:
2. Mock de Leitura de Arquivo: Como o componente interage com o sistema de arquivos (fs), precisamos mockar a função fs.promises.readFile. Isso evita que o teste tente ler um arquivo real no disco, tornando o teste mais rápido, isolado e confiável. O mock deve retornar uma string JSON simulando o conteúdo do bookscat.json.
3. Renderização de Conteúdo Estático: Verificar se o título ("Nosso Catálogo") e o subtítulo ("Descubra mundos e explore nossa vasta coleção de livros.") são renderizados corretamente.
4. Renderização Dinâmica de Componentes Filhos: Garantir que o componente CardCatalogo é renderizado para cada livro fornecido pelos dados mockados, e que as props (book) passadas para cada CardCatalogo estão corretas. Para isso, mockaremos o CardCatalogo para que possamos verificar se ele foi chamado com os dados esperados.
5. Natureza Assíncrona: O teste precisa lidar com a natureza assíncrona do componente (async/await). A React Testing Library lida bem com componentes assíncronos.

