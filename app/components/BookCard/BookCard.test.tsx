import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from './BookCard';
import * as FavoritesContext from '../../context/FavoritesContext';

// define a interface Book localmente para garantir que o mock a utilize corretamente
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  categoria: string;
}

// mock de componentes e APIs externas
jest.mock('react-icons/fa', () => ({
  FaShareAlt: () => <span data-testid="share-icon" />,
  FaHeart: () => <span data-testid="heart-icon" />,
}));

const mockBookModal = jest.fn(({ _book, onClose }) => ( 
  <div data-testid="book-modal">
    <button onClick={onClose}>Fechar</button>
  </div>
));
jest.mock('./bookModal/BookModal', () => ({
  __esModule: true,
  default: mockBookModal,
}));

// mock do hook de contexto
const useFavoritesMock = jest.spyOn(FavoritesContext, 'useFavorites');

// mock das APIs do navegador
const mockWindowOpen = jest.fn();
Object.defineProperty(global.window, 'open', { value: mockWindowOpen });

const mockWindowAlert = jest.fn();
Object.defineProperty(global.window, 'alert', { value: mockWindowAlert });


const mockBook: Book = {
  id: 1,
  title: 'O Hobbit',
  author: 'J.R.R. Tolkien',
  cover: 'hobbit.jpg',
  description: 'Uma história sobre um hobbit que vai a uma aventura.',
  categoria: 'Fantasia',
};

describe('BookCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // teste de renderização inicial
  it('should render book details and buttons correctly', () => {
    useFavoritesMock.mockReturnValue({
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: (_id: number) => false, 
      favorites: [] as Book[], 
    });

    render(<BookCard book={mockBook} />);

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(`Por ${mockBook.author}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Favoritar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ver Detalhes' })).toBeInTheDocument();
  });

  // teste do botão de favoritar (não favoritado)
  it('should call addFavorite when favorite button is clicked and book is not a favorite', () => {
    const mockAddFavorite = jest.fn();
    useFavoritesMock.mockReturnValue({
      addFavorite: mockAddFavorite,
      removeFavorite: jest.fn(),
      isFavorite: (_id: number) => false, 
      favorites: [],
    });

    render(<BookCard book={mockBook} />);
    fireEvent.click(screen.getByRole('button', { name: 'Favoritar' }));

    expect(mockAddFavorite).toHaveBeenCalledTimes(1);
    expect(mockAddFavorite).toHaveBeenCalledWith(mockBook);
  });

  // teste do botão de favoritar (já favoritado)
  it('should call removeFavorite when favorite button is clicked and book is a favorite', () => {
    const mockRemoveFavorite = jest.fn();
    useFavoritesMock.mockReturnValue({
      addFavorite: jest.fn(),
      removeFavorite: mockRemoveFavorite,
      isFavorite: (_id: number) => true, 
      favorites: [],
    });

    render(<BookCard book={mockBook} />);
    fireEvent.click(screen.getByRole('button', { name: 'Favoritar' }));

    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockBook.id);
  });

  // teste da funcionalidade do modal
  it('should open the BookModal when "Ver Detalhes" button is clicked', () => {
    useFavoritesMock.mockReturnValue({
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: (_id: number) => false, 
      favorites: [],
    });

    render(<BookCard book={mockBook} />);

    // o modal não deve estar visível no início
    expect(screen.queryByTestId('book-modal')).not.toBeInTheDocument();

    // clica para abrir o modal
    fireEvent.click(screen.getByRole('button', { name: 'Ver Detalhes' }));

    // o modal deve ser renderizado
    expect(screen.getByTestId('book-modal')).toBeInTheDocument();
  });

  // teste do botão de compartilhamento (Facebook)
  it('should open a new window for Facebook sharing', () => {
    useFavoritesMock.mockReturnValue({
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: (_id: number) => false, 
      favorites: [],
    });

    render(<BookCard book={mockBook} />);
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar no Facebook' }));

    // verifica se window.open foi chamado com a URL correta
    expect(mockWindowOpen).toHaveBeenCalledTimes(1);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://www.facebook.com/sharer/sharer.php'),
      '_blank'
    );
  });
  
  // teste do botão de compartilhamento (Insta)
  it('should show an alert for Instagram sharing', () => {
    useFavoritesMock.mockReturnValue({
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: (_id: number) => false, 
      favorites: [],
    });

    render(<BookCard book={mockBook} />);
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar no Instagram' }));

    // verifica se window.alert foi chamado com a mensagem correta
    expect(mockWindowAlert).toHaveBeenCalledTimes(1);
    expect(mockWindowAlert).toHaveBeenCalledWith(expect.stringContaining('Salve a imagem da capa e use a hashtag'));
  });
});