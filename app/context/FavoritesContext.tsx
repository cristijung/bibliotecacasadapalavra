'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';


export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
}

// tipo do contexto
interface FavoritesContextType {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (bookId: number) => void;
  isFavorite: (bookId: number) => boolean;
}

// criação do contexto
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// props do provedor ---> provider
interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  // carrega do localStorage quando o componente é montado
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
      }
    }
  }, []);

  // salva no localStorage sempre que os favoritos mudam
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book: Book) => {
    setFavorites((prevFavorites) => {
      // verificando se o livro já existe para evitar duplicatas
      if (!prevFavorites.some(fav => fav.id === book.id)) {
        return [...prevFavorites, book];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (bookId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== bookId));
  };

  const isFavorite = (bookId: number) => {
    return favorites.some((fav) => fav.id === bookId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// hook customizado para usar o contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

