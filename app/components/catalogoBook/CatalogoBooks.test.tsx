import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'; //vou deixar por enquanto
import CatalogoBooks from './CatalogoBooks';
import * as fs from 'fs'; 

// mock do módulo 'fs' para simular a leitura do arquivo JSON
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(), // mocka a função readFile do promises API
  },
}));

// mock do componente CardCatalogo
// isso permite que testemos CatalogoBooks sem nos preocuparmos com os detalhes internos de CardCatalogo
const MockCardCatalogo = jest.fn(({ book }) => (
  <div data-testid={`card-catalogo-${book.id}`}>{book.title}</div>
));
jest.mock('./CardCatalogo', () => ({
  __esModule: true,
  default: MockCardCatalogo,
}));


describe('CatalogoBooks', () => {
  // dados de livros mockados que readFile irá retornar
  const mockBooksData = [
    { id: 1, title: 'Livro Teste 1', author: 'Autor A', cover: '/cover1.jpg', description: 'Descricao 1', categoria: 'Fantasia' },
    { id: 2, title: 'Livro Teste 2', author: 'Autor B', cover: '/cover2.jpg', description: 'Descricao 2', categoria: 'Ficção Científica' },
  ];

  // limpa os mocks antes de cada teste para garantir isolamento
  beforeEach(() => {
    // reseta o mock da função readFile antes de cada teste
    (fs.promises.readFile as jest.Mock).mockClear();
    // configura readFile para retornar os dados mockados como uma string JSON
    (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockBooksData));
    
    // limpa o mock do CardCatalogo
    MockCardCatalogo.mockClear();
  });

  it('should render the main title and subtitle', async () => {
    render(await CatalogoBooks());

    expect(screen.getByRole('heading', { name: 'Nosso Catálogo' })).toBeInTheDocument();
    expect(screen.getByText('Descubra mundos e explore nossa vasta coleção de livros.')).toBeInTheDocument();
  });

  it('should read book data from the JSON file', async () => {
    render(await CatalogoBooks());

    // verifica se readFile foi chamado
    expect(fs.promises.readFile).toHaveBeenCalledTimes(1);
    // opcional: verificar o caminho que readFile foi chamado
    expect(fs.promises.readFile).toHaveBeenCalledWith(expect.stringContaining('app\\data\\bookscat.json'), 'utf8');
  });

  it('should render a CardCatalogo component for each book', async () => {
    render(await CatalogoBooks());

    // verifica se o CardCatalogo foi renderizado para cada livro nos dados mockados
    expect(MockCardCatalogo).toHaveBeenCalledTimes(mockBooksData.length);

    // verifica se cada CardCatalogo recebeu as props corretas
    mockBooksData.forEach(book => {
      expect(MockCardCatalogo).toHaveBeenCalledWith(
        expect.objectContaining({ book: expect.objectContaining({ id: book.id, title: book.title }) }),
        {} // o segundo argumento é o contexto, geralmente um objeto vazio
      );
      // opcional: verificar se o título do livro dentro do mock CardCatalogo é visível
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  it('should handle empty book data gracefully', async () => {
    // configura readFile para retornar um array vazio
    (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify([]));

    render(await CatalogoBooks());

    // verifica se nenhum CardCatalogo foi renderizado
    expect(MockCardCatalogo).not.toHaveBeenCalled();
    // verifica se o título e subtítulo ainda estão presentes
    expect(screen.getByRole('heading', { name: 'Nosso Catálogo' })).toBeInTheDocument();
  });
});