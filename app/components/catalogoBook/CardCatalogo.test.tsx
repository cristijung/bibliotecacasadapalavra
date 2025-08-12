import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardCatalogo from './CardCatalogo';

// interface para as props do mock do next/image
interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  unoptimized?: boolean;
  className?: string;
}

// mock com função nomeada e tipagem explícita para o next/image
jest.mock('next/image', () => {
  const MockImage = (props: MockImageProps) => {
    return <img src={props.src} alt={props.alt} />;
  };
  return MockImage;
});

// interface para as props do mock do next/link
interface MockLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

// mock com função nomeada e tipagem explícita para o next/link
jest.mock('next/link', () => {
  const MockLink = (props: MockLinkProps) => {
    return <a href={props.href}>{props.children}</a>;
  };
  return MockLink;
});

// mock dos ícones
jest.mock('react-icons/ai', () => ({
  AiOutlineHeart: () => <span data-testid="outline-heart-icon" />,
  AiFillHeart: () => <span data-testid="fill-heart-icon" />,
}));
jest.mock('react-icons/fi', () => ({
  FiShoppingCart: () => <span data-testid="cart-icon" />,
}));

// mock dos custom hooks. A implementação será definida em cada teste.
const useFavoriteMock = jest.fn();
const useCartMock = jest.fn();
jest.mock('../../hooks/usePersistence', () => ({
  useFavorite: () => useFavoriteMock(),
  useCart: () => useCartMock(),
}));

const mockBook = {
  id: 1,
  title: 'O Senhor dos Anéis',
  author: 'J.R.R. Tolkien',
  cover: '/covers/senhor-dos-aneis.jpg',
  description: 'Uma épica jornada pela Terra-média.',
  categoria: 'Fantasia',
};

describe('CardCatalogo', () => {

  it('should render all book information correctly', () => {
    // configura o mock dos hooks para o estado inicial
    useFavoriteMock.mockReturnValue({ isFavorite: false, toggleFavorite: jest.fn() });
    useCartMock.mockReturnValue({ isInCart: false, toggleCart: jest.fn() });

    render(<CardCatalogo book={mockBook} />);

    // verifica se os dados do livro estão na tela
    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(`por ${mockBook.author}`)).toBeInTheDocument();
    expect(screen.getByText(mockBook.categoria)).toBeInTheDocument();
    expect(screen.getByText(mockBook.description)).toBeInTheDocument();
    
    // verifica se a imagem tem o alt correto
    expect(screen.getByAltText(`Capa do livro ${mockBook.title}`)).toBeInTheDocument();
    
    // verifica se o link de detalhes existe e tem o href correto
    const detailsLink = screen.getByRole('link', { name: 'Detalhes' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/login');
  });

  it('should display the correct favorite icon and aria-label when not favorited', () => {
    // configura o mock do hook para o estado "não favorito"
    useFavoriteMock.mockReturnValue({ isFavorite: false, toggleFavorite: jest.fn() });
    useCartMock.mockReturnValue({ isInCart: false, toggleCart: jest.fn() });

    render(<CardCatalogo book={mockBook} />);
    
    // verifica se o ícone de coração vazio e o aria-label estão presentes
    expect(screen.getByTestId('outline-heart-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar aos favoritos' })).toBeInTheDocument();
    expect(screen.queryByTestId('fill-heart-icon')).not.toBeInTheDocument();
  });
  
  it('should display the correct favorite icon and aria-label when is a favorite', () => {
    // configura o mock do hook para o estado "favorito"
    useFavoriteMock.mockReturnValue({ isFavorite: true, toggleFavorite: jest.fn() });
    useCartMock.mockReturnValue({ isInCart: false, toggleCart: jest.fn() });

    render(<CardCatalogo book={mockBook} />);
    
    // verifica se o ícone de coração preenchido e o aria-label estão presentes
    expect(screen.getByTestId('fill-heart-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remover dos favoritos' })).toBeInTheDocument();
    expect(screen.queryByTestId('outline-heart-icon')).not.toBeInTheDocument();
  });

  it('should display the correct cart aria-label when not in cart', () => {
    // configura o mock do hook para o estado "não no carrinho"
    useFavoriteMock.mockReturnValue({ isFavorite: false, toggleFavorite: jest.fn() });
    useCartMock.mockReturnValue({ isInCart: false, toggleCart: jest.fn() });

    render(<CardCatalogo book={mockBook} />);

    // verifica o aria-label do botão de carrinho
    expect(screen.getByRole('button', { name: 'Adicionar ao carrinho' })).toBeInTheDocument();
  });

  it('should call toggleFavorite when favorite button is clicked', () => {
    // cria um mock para a função toggleFavorite
    const mockToggleFavorite = jest.fn();
    useFavoriteMock.mockReturnValue({ isFavorite: false, toggleFavorite: mockToggleFavorite });
    useCartMock.mockReturnValue({ isInCart: false, toggleCart: jest.fn() });

    render(<CardCatalogo book={mockBook} />);

    // clica no botão de favorito
    const favoriteButton = screen.getByRole('button', { name: 'Adicionar aos favoritos' });
    fireEvent.click(favoriteButton);

    // verifica se a função mock foi chamada
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });
  
  it('should call toggleCart when cart button is clicked', () => {
    // cria um mock para a função toggleCart
    const mockToggleCart = jest.fn();
    useFavoriteMock.mockReturnValue({ isFavorite: false, toggleFavorite: jest.fn() });
    useCartMock.mockReturnValue({ isInCart: false, toggleCart: mockToggleCart });

    render(<CardCatalogo book={mockBook} />);

    // clica no botão de carrinho
    const cartButton = screen.getByRole('button', { name: 'Adicionar ao carrinho' });
    fireEvent.click(cartButton);

    // verifica se a função mock foi chamada
    expect(mockToggleCart).toHaveBeenCalledTimes(1);
  });
});