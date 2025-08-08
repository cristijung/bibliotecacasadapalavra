// hook personalizado

'use client'; // pois então .... necessário pois usa `useState` e `localStorage`

import { useState, useEffect } from 'react';

// hook genérico para persistir um estado no localStorage ....
const usePersistence = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    // acessa o localStorage apenas no cliente
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]); //array de dependencias - o effect é executado sempre q a key ou o value mudam - atualiza o localStorage

  return [value, setValue];
};

export const useFavorite = (bookId: number) => {
  const [favorites, setFavorites] = usePersistence<number[]>('favorites', []);
  const isFavorite = favorites.includes(bookId);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  return { isFavorite, toggleFavorite };
};

export const useCart = (bookId: number) => {
  const [cart, setCart] = usePersistence<number[]>('cart', []);
  const isInCart = cart.includes(bookId);

  const toggleCart = () => {
    if (isInCart) {
      setCart(cart.filter((id) => id !== bookId));
    } else {
      setCart([...cart, bookId]);
    }
  };

  return { isInCart, toggleCart };
};